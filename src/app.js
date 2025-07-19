const express = require("express");
const connectDB = require("./config/database");
const UserModel = require("./model/user");
const { vilidateSignupData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser")
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middleware/auth");

const app = express();

const port = 7777;

app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
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
app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await UserModel.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid Credentail");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {

      // Creating JWT Token
       const token = await jwt.sign({_id: user._id} , "DEV@Tinder$790", {expiresIn: "1d"});
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


// Get Profile Data

app.get("/profile" ,userAuth , async(req, res) => {
  try {
    const user = req.user;
    res.send(user)
  } catch (error) {

     console.log(`ERROR :: ${error.message}`)
    
  }
 

})

app.post("/sendconnectionrequest" ,userAuth , (req,res) => {
  user = req.user;
  console.log("Sending a connection request");
   console.log(user)
   res.send(`${user.firstName}  Sent Response of connection!!`)
})
connectDB()
  .then(() => {
    console.log(`Database connection is established`);
    app.listen(port, () => {
      console.log(`Serveris running port ${port}`);
    });
  })
  .catch(() => {
    console.error(`Database can not be connected`);
  });
