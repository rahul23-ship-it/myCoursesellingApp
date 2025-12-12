const express = require("express");
const Router = express.Router;
const adminRouter = Router();
const { AdminModel } = require("../db");//importing the schema 
const {CourseModel} = require("../db");
const bcrypt = require("bcrypt");
const JWT_SECRET_ADMIN = process.env.JWT_SECRET_ADMIN ;
const jwt = require("jsonwebtoken");
const { authAdmin } = require("../middleware/adminMid");



adminRouter.post("/signup",async function(req,res){
    const {email, password , firstname , lastname} = req.body ;
       
    
        const hashedpassword = await bcrypt.hash(password,5);
        try{
            await AdminModel.create({
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

adminRouter.post("/signin", async function(req,res){
        const {email , password} = req.body ;
        try{
            const admin = await AdminModel.findOne({
                email: email
            })
            
            if (admin){
                const verifyPassword = await bcrypt.compare(password ,admin.password);
                if (verifyPassword){
                    const token = jwt.sign({
                        id : admin._id
                    },JWT_SECRET_ADMIN);
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
    

adminRouter.post("/course",authAdmin,async function(req,res){
    const adminId = req.userId;
    const {title , description , imageUrl , price} = req.body ;

    //watch harkirat creating a web3 SAAS in 6 hours youtube video to understand how to directly receive the image and not the url of the image 
    const course = await CourseModel.create({title, description, imageUrl, price, creatorId : adminId});
    
    res.json({
        message: "Course created ",
        courseId : course._id
    })

    
})

adminRouter.put("/course",authAdmin,async function(req,res){
    const adminId = req.userId;
    const {title , description , imageUrl , price ,courseId} = req.body ;

    const course = await CourseModel.findOneAndUpdate(
        {_id : courseId, creatorId : adminId},
        {title, description, imageUrl, price},
        {new : true } //confirming is it a new updated data 
    )

    if (!course){
        res.status(403).json({
            message:"course not found"
        })
    }else{
        res.json({
            message: "course updated",
            course
        })
    }
    
})

adminRouter.get("/course/bulk",authAdmin,async function(req,res){
    const adminId = req.userId ;
    const admin = await CourseModel.find({
        creatorId : adminId
    })
    if (!admin){
        res.status(403).json({
            message: "No course found"
        })
    }else{
        res.json({
            admin
        })
    } 
})

module.exports ={
    adminRouter:adminRouter
}