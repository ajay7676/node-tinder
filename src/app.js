const express = require('express');

 const app = express();
   
 const port  = 7777;

   
   app.use("/" , (err ,req,res , next ) =>{
           console.log("Error routing is working")
     if(err){
          res.status(500).send("something went wrong")
     }

   })

 app.get("/getUserData" , (req,res) => {
      try {
          throw new Error("sdsdsdsd");
      res.send("User Data sent")
      } catch (error) {
            res.status(500).send("Some Error contact support team")
      }
       

   });

 app.listen(port, () => {
      console.log(`Serveris running port ${port}`)
 })