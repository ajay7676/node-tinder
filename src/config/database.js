const mongoose = require('mongoose');
const { url } = require('../constants');

 const connectDB = async () =>{
      try{
         await  mongoose.connect(`${url}`);

      } catch(error){

      }
 }


 module.exports = connectDB;