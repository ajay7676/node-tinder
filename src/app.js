const express = require("express");
const connectDB = require("./config/database");
const UserModel = require("./model/user")

const app = express();

const port = 7777;

app.use(express.json());

app.post("/signup" , async(req , res) => {
  //  console.log(req.body)
      // Creating  a new instance of the User Model
        const user = new UserModel(req.body);
         console.log(user)
        try {
           await user.save();
           res.send("User Added Successfuly")
        } catch (error) {
          res.status(404).send("Error Saving the user " , + error.message)
          
        }
       
})
 // Get user by email
  app.get("/user" , async(req,res) =>{
     const userEmail = req.body.emailId
    try{ 
        
        //  const users = await UserModel.find({ emailId : userEmail});
        //  if(users.length === 0){
        //    res.status(404).send("User is not found")
        //  }
        //  else{
        //     res.send(users        

        //     )
        //  }

        // if we neede to find one user then we will use UserModel.fineOne()
         const user = await UserModel.findOne({})
         try {
            if(!user){
              res.status(404).send("User is not found")
            }else{
              res.send(user)
            }
          
         } catch (error) {
          
         }
        } catch (error) {
          res.status(404).send("Something went wrong " , + error.message)
          
        }


  })

// Feed API GET/feed get all the users from the database
app.get("/feed" ,async(req, res) => {
  //  const usersEmail = req.body.emailId;

    try {
      const users =  await UserModel.find({})
       if(!users){
         res.status(404).send("Users are not exist");
       }else{
           res.send(users)
       }
      
    } catch (error) {
       console.log(`Something went wrong ${error.message}`)
    }



})
// Delete an User from the Database

app.delete("/user" , async(req,res) =>{
   const userId = req.body.userId
   try {
    const user = await UserModel.findOneAndDelete({ _id:  userId});
     console.log(user)
      res.send("User is Delete Successfuly")
    
   } catch (error) {
      console.log(`Something went wrong ${error.message}`)

   }


})

// Update data of User
app.patch("/user" , async(req,res) =>{

   const userEmail = req.body.emailId;
   try {
     const result = await UserModel.updateOne({emailId: userEmail},
        {$set: { firstName: "Himanshu" } }
      )
      if (result.matchedCount === 0) {
      console.log('User not found');
    } else {
      console.log('Update successful');
      res.send("Update User Data successful")
    }
    
   } catch (error) {

     console.log(`Something went wrong ${error.message}`)
    
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
