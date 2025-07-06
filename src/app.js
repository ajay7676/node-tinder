const express = require('express');

 const app = express();
   
 const port = 7777;

  app.use("/" , (req, res ,next) =>{
     // Route Handler
      console.log(`Handling the route`);
      next();
  });
   app.get("/user" , (req , res , next) => {
      console.log(`Handling the route user 2`);
      next();
   },
   (req,res , next) => {
     //  res.send("1st Route Handler");
      next();
   },
    (req,res , next) => {
      res.send("2nd Route Handler");
   }
)
 app.listen(port, () => {
      console.log(`Serveris running port ${port}`)
 })