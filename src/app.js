const express = require('express');

 const app = express();
   
 const port = 7777;
  app.get("/" , (req , res) => {
      res.send('This is main page')
  })
  app.get("/home" , (req , res) => {
      res.send('This is home page')
  })
  app.get("/profile" , (req , res) => {
      res.send('This is profile page')
  })
 app.listen(port, () => {
      console.log(`Serveris running port ${port}`)
 })