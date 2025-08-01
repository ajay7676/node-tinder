const express = require("express");
const { userAuth } = require("../middleware/auth");
const ConnectRequestModel = require("../model/connnectionRequest");
const UserModel = require("../model/user");
const USER_SAFE_DATA = "firstName lastName photoUrl age gender about skills";


const userRouter = express.Router();

userRouter.get("/user/requests/recived", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequest = await ConnectRequestModel.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", ["firstName", "lastName", "about", "skills"]);
    if (!connectionRequest) {
      return res.status(401).json({ message: "User is not found" });
    }
    res.json({ message: "Check All Requests", data: connectionRequest });
  } catch (error) {
    res.status(400).send(`ERROR :: ${error.message}`);
  }
});
userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequests = await ConnectRequestModel.find({
      $or: [
        {
          toUserId: loggedInUser._id,
          status: "accepted",
        },
        {
          fromUserId: loggedInUser._id,
          status: "accepted",
        },
      ],
    })
      .populate("fromUserId", [
        "firstName",
        "lastName",
        "about",
        "photoUrl",
        "skills",
        "age",
        "gender",
      ])
      .populate("toUserId", ["firstName", "lastName", "about","photoUrl", "skills"]);
    const data = connectionRequests.map((user) => {
      if (user.fromUserId._id.toString() === loggedInUser._id.toString()) {
        return user.toUserId;
      }
      return user.fromUserId;
    });
    res.json({ data: data });
  } catch (error) {
    res.status(400).send(`ERROR :: ${error.message}`);
  }
});
userRouter.get("/feed", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

     const page = parseInt(req.query.page) || 1;
     let limit = parseInt(req.query.limit) || 10;
        limit > 50? 50: limit;
     const skip = (page - 1) *limit;
    const connectionRequests = await ConnectRequestModel.find({
      $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
    }).select("fromUserId  toUserId");
    const hideUsersFromFeed = new Set();
    connectionRequests.forEach((req) => {
      hideUsersFromFeed.add(req.fromUserId.toString());
      hideUsersFromFeed.add(req.toUserId.toString());
    });
     const users = await UserModel.find({
      $and: [
        { _id: { $nin: Array.from(hideUsersFromFeed) } },
        { _id: { $ne: loggedInUser._id } },
      ],
    }) .select(USER_SAFE_DATA)
    .skip(skip)
    .limit(limit)
    res.json({data : users})

  } catch (error) {
    res.status(400).json("Error" + error.message);
  }
});

module.exports = userRouter;
