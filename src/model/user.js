const mongoose = require("mongoose")
const {Schema} = mongoose;

const userSchema = new Schema({
    firstName : {
        type : String,
        required : true,
        minLength : 4

    },
    lastName : {
        type : String
    },
    emailId : {
        type : String, 
        lowercase: true,
        required : true,
        trim: true,
        unique: true
    },
    password : {
        type : String,
        required : true
    },
    age : {
        type : Number
    },
    gender : {
        type : String,
       validate(value){
          if(["male" , "female" , "others"].includes(value)){
            throw new Error("Gender data is not vaild")
          }
       }
    },
    photoUrl:{
        type: String,
        default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRm-TruksPXPI5imDL_kfzEfFiAZwg5AzHtWg&s"
    },
    about: {
        type:String,
        default: "This is default about of the user"
    },
    skills:{
        type: [String]

    }

})

// Createing Schema  Model
 const UserModel = mongoose.model("User" , userSchema);

 module.exports = UserModel