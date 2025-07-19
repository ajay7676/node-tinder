const mongoose = require("mongoose")
const {Schema} = mongoose;
const validator = require("validator")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");

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
        unique: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid email address :" +value)
            }

        }
    },
    password : {
        type : String,
        required : true,
         validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Enter a strong Password:" +value)
            }

        }
    },
    age : {
        type : Number
    },
    gender : {
        type : String,
       validate(value){
          if(!["male" , "female" , "others"].includes(value)){
            throw new Error("Gender data is not vaild")
          }
       }
    },
    photoUrl:{
        type: String,
        default: "https://avatars.githubusercontent.com/u/62447178?v=4",
         validate(value){
            if(!validator.isURL(value)){
                throw new Error("Invalid photo URL:" +value)
            }

        }
    },
    about: {
        type:String,
        default: "This is default about of the user"
    },
    skills:{
        type: [String]

    }

},
 { timestamps: true }

);

userSchema.methods.getJWT = async function () {
    const user = this;
     const token = await jwt.sign({_id: user._id} , "DEV@Tinder$790", {expiresIn: "2d"})
    
     return token;
}

userSchema.methods.validatePassword = async function (passwordInputByUser) {
     const user = this;
     const passwordHash = user.password;
     const isPasswordValid = await bcrypt.compare(passwordInputByUser, passwordHash);

     return isPasswordValid;
    
}

// Createing Schema  Model
 const UserModel = mongoose.model("User" , userSchema);

 module.exports = UserModel