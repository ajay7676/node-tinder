const express = require('express');

 const app = express();
   
 const port = 7777;

  app.get("/user" , (req , res) => {
     console.log(req.query)
      res.send({firstName : "Ajay" , lastName: "Chauhan"})
  })
 app.listen(port, () => {
      console.log(`Serveris running port ${port}`)
 })