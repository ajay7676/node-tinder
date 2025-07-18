const express = require("express");
const connectDB = require("./config/database");
const UserModel = require("./model/user");
const { vilidateSignupData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieparser = require("cookie-parser")

const app = express();

const port = 7777;

app.use(express.json());
app.use(cookieparser())

app.post("/signup", async (req, res) => {
  // await UserModel.init();
  try {
    // validation of data
    vilidateSignupData(req);
    // Encrypt the password
    const { firstName, lastName, emailId, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);
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
      res.cookie('token', 'as@121SDsdf123&*EQ&*WRY)*EH&#A()_W(I(EWuee8 w3')
      res.send("Login is Successful");
    } else {
      throw new Error("Invalid Credentail");
    }
  } catch (error) {
     res.status(400).send(`Error :: ${error.message}`)
  }
});


// Get Profile Data

app.get("/profile" , async(req, res) => {
   
  const cookies = req.cookies;
   console.log(cookies);
   res.send("Reading Cookie")

})
// Get user by email
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    //  const users = await UserModel.find({ emailId : userEmail});
    //  if(users.length === 0){
    //    res.status(404).send("User is not found")
    //  }
    //  else{
    //     res.send(users

    //     )
    //  }

    // if we neede to find one user then we will use UserModel.fineOne()
    const user = await UserModel.findOne({});
    try {
      if (!user) {
        res.status(404).send("User is not found");
      } else {
        res.send(user);
      }
    } catch (error) {}
  } catch (error) {
    res.status(404).send("Something went wrong ", +error.message);
  }
});

// Feed API GET/feed get all the users from the database
app.get("/feed", async (req, res) => {
  //  const usersEmail = req.body.emailId;

  try {
    const users = await UserModel.find({});
    if (!users) {
      res.status(404).send("Users are not exist");
    } else {
      res.send(users);
    }
  } catch (error) {
    console.log(`Something went wrong ${error.message}`);
  }
});
// Delete an User from the Database

app.delete("/user", async (req, res) => {
  const userId = req.body.userId;

  try {
    const user = await UserModel.findOneAndDelete({ _id: userId });
    console.log(user);
    res.send("User is Delete Successfuly");
  } catch (error) {
    console.log(`Something went wrong ${error.message}`);
  }
});

// Update data of User
app.patch("/user", async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;
  const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age", "skills"];
  const isUpdateAllowed = Object.keys(data).every((k) =>
    ALLOWED_UPDATES.includes(k)
  );

  try {
    if (!isUpdateAllowed) {
      throw new Error("Update is not allowed");
    }
    if (data?.skills.length > 10) {
      throw new Error("Skills cannot be more then 10");
    }
    const result = await UserModel.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "after",
      runValidators: true,
    });
    console.log(result);
    res.send("User updated sucessfully");
  } catch (error) {
    console.log(`Something went wrong ${error.message}`);
    res.status(404).send(`Update failed : ${error.message}`);
  }
});

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
