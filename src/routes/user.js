const express = require("express");
const { userAuth } = require("../middleware/auth");
const ConnectRequestModel = require("../model/connnectionRequest");

const userRouter = express.Router();

userRouter.get("/user/requests/recived", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequest = await ConnectRequestModel.find({
      toUserId: loggedInUser._id,
      status : "interested"
    }).populate("fromUserId" ,["firstName" , "lastName", "about" ,"skills"]);
    if (!connectionRequest) {
      return res.status(401).json({ message: "User is not found" });
    }
    res.json({ message: "Check All Requests" , data: connectionRequest });
  } catch (error) {
    res.status(400).send(`ERROR :: ${error.message}`);
  }
});

 userRouter.get("/user/connections" , userAuth , async(req,res) =>{
     try {
         const loggedInUser = req.user;
           const connectionRequests = await ConnectRequestModel.find({
            $or:[
                {
                  toUserId: loggedInUser._id , status : "accepted"
                },
                {
                  fromUserId: loggedInUser._id , status : "accepted"
                }
            ]
           }).populate("fromUserId" ,["firstName" , "lastName", "about" ,"skills", "age" , "gender"])
            .populate("toUserId" ,["firstName" , "lastName", "about" ,"skills"]);
           const data = connectionRequests.map((user) =>{
              if(user.fromUserId._id.toString() === loggedInUser._id.toString()){
              return user.toUserId;
            }
             return user.fromUserId;
           } 
           
        )
           res.json({data : connectionRequests})
        
     } catch (error) {
         res.status(400).send(`ERROR :: ${error.message}`);
     }

 });

module.exports = userRouter;
