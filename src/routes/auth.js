const express = require("express");
const UserModel = require("../model/user");
const { vilidateSignupData } = require("../utils/validation");
const bcrypt = require("bcrypt");




const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  // await UserModel.init();
  try {
    // validation of data
    vilidateSignupData(req);
    // Encrypt the password
    const { firstName, lastName, emailId, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    const data = req.body;
    // Creating  a new instance of the User Model
    const user = new UserModel({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });
    await user.save();
    res.send("User Added Successfuly");
  } catch (error) {
    res.status(404).send(`Error :: ${error.message}`);
  }
});

//  User login through email & password
authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await UserModel.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid Credentail");
    }
    const isPasswordValid = await user.validatePassword(password);
    if (isPasswordValid) {

      // Creating JWT Token
       const token = await user.getJWT();
      // Add the token to cookie & send response back to the user
      res.cookie('token', token ,{expires: new Date(Date.now() + 2 * 3600000)}
       // cookie will be removed after 8 hours
      )
      res.send("Login is Successful");
    } else {
      throw new Error("Invalid Credentail");
    }
  } catch (error) {
     res.status(400).send(`Error :: ${error.message}`)
  }
});

// User Logout 

authRouter.post("/logout" , async(req,res) =>{
     res.cookie("token" , null , {
      expires: new Date(Date.now())
     });
     res.send("Logout SuccessFully")
})
module.exports = authRouter; 