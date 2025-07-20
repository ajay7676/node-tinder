const validator = require("validator")

const vilidateSignupData = (req) => {
       const{firstName , lastName , emailId , password} = req.body;
       if(!firstName || !lastName){
         throw new Error("Plase enter your name")
       }else if(firstName.length < 4  || firstName.length > 25 ){
         throw new Error("FirstName should be 4-50 charaters ");
       }
        else if(lastName.length < 4  || lastName.length > 25 ){
         throw new Error("LastName should be 4-50 charaters ");
       }
        else if(!validator.isEmail(emailId)){
             throw new Error("Email format is not valid")
        }
        else if(!validator.isStrongPassword(password)){
             throw new Error("Plase enter strong password")
        }
}
const validateEditProfileData = (req) => {

      const data = req.body;
      const allowEditFiled = ["firstName" , "lastName" , "emailId" , "age" , "gender" , "about" ,"photoUrl" , "skills"];
      const isEditAllowed = Object.keys(data).every((filed) => allowEditFiled.includes(filed));

      return isEditAllowed; // return bookean vakue
}
// const validateStorngPassword = (req) => {
//     const data = req.body;
//      const allowEditFiled = ["passowrd"];
//      const isEditAllowed = Object.keys()
// }

module.exports = {
    vilidateSignupData,
    validateEditProfileData
}