const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_SECRET_USER = process.env.JWT_SECRET_USER



function authUser(req,res,next){


    try{
    const token = req.headers.token ;
    const response  = jwt.verify(token,JWT_SECRET_USER);
    

    if (response){
        req.userId = response.id ; 
        next();
    }else{
        res.status(403).json({
            message : "Invalid Token(vr)"
        })
    }
    }catch(err){
        res.status(403).json({
            message : "Invalid token"
        })
    }

}

module.exports = {
    authUser
}