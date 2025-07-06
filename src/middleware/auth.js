 const adminAuth =  (req , res ,next) => {
  console.log("Auth is getting checked");
    const token = "xyz";
      const isAuthorized = token === "xyz";
       if(!isAuthorized){
          res.status(401).send("Unauthorized Requeset")
       }else{
          next();
       }
  }
 const userAuth =  (req , res ,next) => {
  console.log("User Auth is getting checked");
    const token = "xyz";
      const isAuthorized = token === "xyz";
       if(!isAuthorized){
          res.status(401).send("Unauthorized Requeset")
       }else{
          next();
       }
  }

 module.exports = {
    adminAuth,
    userAuth
 }