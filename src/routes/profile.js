const express = require("express");
const { userAuth } = require("../middleware/auth");
const { validateEditProfileData } = require("../utils/validation");

const profileRouter = express.Router();

// Get Profile Data

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (error) {
    console.log(`ERROR :: ${error.message}`);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if(!validateEditProfileData(req)){
        throw new Error ("Profile Edit is not possiable")
    }
    const LoggedInUser = req.user;
    Object.keys(req.body).forEach((key) => LoggedInUser[key] = req.body[key]);
    await LoggedInUser.save();
    //  res.send(`Hi, ${LoggedInUser.firstName} Your Profile  updated Successfully`);
     res.json({ message :`Hi, ${LoggedInUser.firstName} Your Profile  updated Successfully` ,
      data: LoggedInUser 
    });
    
  } catch (error) {
    console.log(`ERROR :: ${error.message}`);
  }
});

module.exports = profileRouter;
