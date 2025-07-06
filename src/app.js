const express = require('express');
const { adminAuth , userAuth } = require('./middleware/auth');

 const app = express();
   
 const port  = 7777;

  app.use("/admin" , adminAuth);

//   app.use("/user" , userAuth);
   app.post("/user/login" , (req,res) => {
      res.send("User Logged is successful")
   })
  app.get("/user" ,userAuth , (req,res) => {
      console.log("User Controller is  running...")
      res.send("User Data sent !!!!")

  })
 app.get("/admin/getAllData" , (req,res) => {
        res.send("All Data Sent");
 })
 app.get("/admin/deleteUser" , (req,res) => {
      res.send("Deleated User");
 })

 app.listen(port, () => {
      console.log(`Serveris running port ${port}`)
 })