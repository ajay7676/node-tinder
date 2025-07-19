  const jwt = require("jsonwebtoken");
  const  UserModel = require("../model/user");

 const userAuth =  async(req , res ,next) => {
   // Accessing Token form coolkies
    try {
      const{token} = req.cookies;
      if(!token){
         throw new Error("Token is not Valid .... !!!!");
      }
      // Verify the JSW with sceret key
      const decodeToken = await jwt.verify(token , "DEV@Tinder$790");

       const {_id} = decodeToken;
       const user = await UserModel.findById({_id});

       if(!user){
           throw new Error("User is not found");
       }
        req.user = user
       next();

      
    } catch (error) {
       res.status(400).send(`ERROR :: ${error.message}`)
      
    }
 
  }

 module.exports = {
    userAuth
 }