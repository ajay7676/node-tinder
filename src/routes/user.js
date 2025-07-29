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


module.exports = userRouter;
