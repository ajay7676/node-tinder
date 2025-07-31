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
    res.status(401).json({message: "Unauthorized User" , data : error.message})
  }
});

profileRouter.put("/profile/edit", userAuth, async (req, res) => {
  try {
    if(!validateEditProfileData(req)){
        throw new Error ("Profile Edit is not possiable")
    }
    const loggedInUser = req.user;
    const userr=  Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
     await loggedInUser.save();
    //  res.send(`Hi, ${loggedInUser.firstName} Your Profile  updated Successfully`);
    res.json({ message :`Hi, ${loggedInUser.firstName} Your Profile  updated Successfully` ,
      data: loggedInUser 
    });
    
  } catch (error) {
  res.status(400).send("ERROR : " + error.message);
  }
});
profileRouter.patch("/profile/password" , userAuth , async(req,res) => {
   try {
      const { password ,newpassword } = req.body;
       const loggedInUser = req.user;
      //  Compare old password with hashed password
       const isMatch = await bcrypt.compare(password , loggedInUser.password);
       if (!isMatch) return res.status(400).send("Old password is incorrect");

      //Hash new password
       const hashedassword = await  bcrypt.hash(newpassword , 10);
       loggedInUser.password = hashedassword;

        // Save User in Database
        await loggedInUser.save();
        res.send("Profile password is updated")

   } catch (error) {
       res.status(400).send(`Error :: ${error.message}`)
   }
})
 
module.exports = profileRouter;
