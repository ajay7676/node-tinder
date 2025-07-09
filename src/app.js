const express = require("express");
const connectDB = require("./config/database");
const UserModel = require("./model/user")

const app = express();

const port = 7777;

// app.use(express.json());

app.post("/signup" , async(req , res) => {
      // Creating  a new instance of the User Model
        const user = new UserModel({
          firstName : "Rahul" , 
          lastName: "Chauhan",
          emailId: "rahul@gmail.com",
          password : "rahul@3$"
        })

        try {
           await user.save();
           res.send("User Added Successfuly")
        } catch (error) {
          res.status(404).send("Error Saving the user " , + error.message)
          
        }
       
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
