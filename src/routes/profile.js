const express = require("express");
const { userAuth } = require("../middleware/auth");


const profileRouter = express.Router();


// Get Profile Data

profileRouter.get("/profile" ,userAuth , async(req, res) => {
  try {
    const user = req.user;
    res.send(user)
  } catch (error) {

     console.log(`ERROR :: ${error.message}`)
    
  }
 

})
module.exports = profileRouter;