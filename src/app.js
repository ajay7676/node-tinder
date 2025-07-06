const express = require('express');

 const app = express();
   
 const port = 7777;

  app.use("/user" , (req, res ,next) =>{
     // Route Handler
      console.log(`Handling the route user`);
      next();
     //  res.send("Response !!");
  }, 
  (req, res , next) =>{
     // Route Handler
      console.log(`Handling the route user 2`)
     //  res.send("2 Response !!")
     next();
  },
   (req, res , next) =>{
     // Route Handler
      console.log(`Handling the route user 3`)
     //  res.send("3 Response !!")
     next();
  },
   (req, res , next) =>{
     // Route Handler
      console.log(`Handling the route user 4`)
      res.send("4 Response !!")
  }

)
 app.listen(port, () => {
      console.log(`Serveris running port ${port}`)
 })