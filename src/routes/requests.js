const express = require("express");
const { userAuth } = require("../middleware/auth");

const requestRouter = express.Router();



requestRouter.post("/sendconnectionrequest" ,userAuth , (req,res) => {
  user = req.user;
  console.log("Sending a connection request");
   console.log(user)
   res.send(`${user.firstName}  Sent Response of connection!!`)
})
module.exports = requestRouter;
