const express = require("express");
const { userAuth } = require("../middleware/auth");
const  ConnnectionRequest  = require("../model/connnectionRequest");
const UserModel = require("../model/user");

const requestRouter = express.Router();




requestRouter.post("/request/send/:status/:toUserId" ,userAuth ,async (req,res) => {
   try {
     const  fromUserId = req.user._id;
     const toUserId = req.params.toUserId;
     const status = req.params.status;
        const connectionRequest = new ConnnectionRequest({
        fromUserId,
        toUserId,
        status

      })
       const allowedStatus = ["interested" , "ignored"]
       if(!allowedStatus.includes(status)){
          return res.status(400).json({message : "Invalid Status Type"})
       }
       // If there is an existing Connection Request
       const existingConnectionRequest= await ConnnectionRequest.findOne({
        $or:[
          {fromUserId , toUserId},
          {fromUserId : toUserId , toUserId: fromUserId}
        ]
       })
       const toUser = await UserModel.findById(toUserId);
        if(!toUser){
          return res.status(400).json({message: "User was not Found"})
        }
       if(existingConnectionRequest){
           return res.status(400).json({message : "Connection Request Already Exists!!"})
       }
      const data = await connectionRequest.save();

      res.json({
        message: "Connection Request Sent Successfully",
        data 
      })
    
   } catch (error) {
     res.status(400).send("ERROR: " +error.message);
   }
}) ;

requestRouter.post("/request/review/:status/:requestedId" ,userAuth , async(req,res) => {
    try {
       const loggedInUser = req.user;
       const{status,requestedId}= req.params
       const allowledStatus =["accepted" ,"rejected"];

       if(!allowledStatus.includes(status)){
        return res.status(400).json({message: "Status not allowed"});

       }
        const connectionRequest = await ConnnectionRequest.findOne({
          _id:requestedId,
          toUserId: loggedInUser._id,
          status: "interested"
        });
        if(!connectionRequest) {
           return res.status(400).json({message: "Connection request not found !!!"})
        }
        connectionRequest.status = status;
       const data = await connectionRequest.save();
         res.json({message : `Connection requested is ${status} ` , data})


      
    } catch (error) {
      res.status(400).send(`ERROR ${error.message}`)
      
    }
})
module.exports = requestRouter;
