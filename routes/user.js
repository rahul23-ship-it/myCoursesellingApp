const express = require("express");
const Router = express.Router ;
const userRouter = Router();
const { UserModel } = require("../db");
const bcrypt = require("bcrypt");
const JWT_SECRET_USER = process.env.JWT_SECRET_USER ;
const jwt = require("jsonwebtoken");
const { zodcheck } = require("../zod");
const { authUser } = require("../middleware/userMid")




userRouter.post("/signup",zodcheck,async function(req,res){
    const {email, password , firstname , lastname} = req.body ;
   

    const hashedpassword = await bcrypt.hash(password,5);
    try{
        await UserModel.create({
            email : email ,
            password : hashedpassword,
            firstname : firstname ,
            lastname : lastname
        });
        return res.json({
            message: "you have signed up"
        });

    }catch(err){
        return res.status(403).json({
            message: "error occured try again later"
        })
    }
})

userRouter.post("/signin",async function(req,res){
    const {email , password} = req.body ;
    try{
        const user = await UserModel.findOne({
            email: email
        })
        
        if (user){
            const verifyPassword = await bcrypt.compare(password ,user.password);
            if (verifyPassword){
                const token = jwt.sign({
                    id : user._id
                },JWT_SECRET_USER);
                return res.json({
                    token : token,
                    message: "You have signed in "
                });
            }else{
                return res.status(403).json({
                    message: "error in signing in"
                });
            }

        }else{
            return res.status(403).json({
                message: "wrong password"
            });
        }
        
    }catch(err){
        return res.status(500).json({
            message: "Internal server error"
        });
    }
})

userRouter.get("/purchases",function(req,res){
    res.json({
        message: "You have signed up"
    })

    
})

module.exports = {
    userRouter: userRouter
}