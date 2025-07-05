const express = require('express');

 const app = express();
   
 const port = 7777;

  app.get("/user" , (req , res) => {
      res.send({firstName : "Ajay" , lastName: "Chauhan"})
  })
  app.post("/user" , (req , res) => {
    //   console.log(`Save Data into a Database`)
    // Saving data into database
      res.send(`Data successfully saved to the database`)
  })
  app.delete("/user" , (req , res) => {
    
      res.send(`Data successfully Deleted form database`)
  })
  app.use("/test" , (req , res) => {
      res.send('This is Test page');
  })

 app.listen(port, () => {
      console.log(`Serveris running port ${port}`)
 })