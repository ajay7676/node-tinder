const express = require("express");
const { userAuth } = require("../middleware/auth");
const { validateEditProfileData } = require("../utils/validation");
const bcrypt = require('bcrypt');


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
profileRouter.patch("/profile/password" , userAuth , async(req,res) => {
   try {
      const { password ,newpassword } = req.body;
       const LoggedInUser = req.user;
      //  Compare old password with hashed password
       const isMatch = await bcrypt.compare(password , LoggedInUser.password);
       if (!isMatch) return res.status(400).send("Old password is incorrect");

      //Hash new password
       const hashedassword = await  bcrypt.hash(newpassword , 10);
       LoggedInUser.password = hashedassword;

        // Save User in Database
        await LoggedInUser.save();
        res.send("Profile password is updated")

   } catch (error) {
       res.status(400).send(`Error :: ${error.message}`)
   }
})
 
module.exports = profileRouter;
