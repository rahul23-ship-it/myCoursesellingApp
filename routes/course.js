const express = require("express");
const Router = express.Router ;
const courseRouter = Router() ;  //Router is not a class its a function
const {PurchaseModel, CourseModel} = require("../db");
const {authUser} = require("../middleware/userMid") ;


courseRouter.post("/purchase",authUser,async function(req,res){
    const userId = req.userId ;
    const courseId = req.body.courseId ;

    const course = await PurchaseModel.create({
        userId,
        courseId
    })

    if (!course){
        res.status(403).json({
            message : "course not found "
        });
    }else{
        res.json({
            message: "course purchased "
        });
    }

    
})

courseRouter.get("/preview",async function(req,res){

    const courses = await CourseModel.find({});
    res.json({
        courses
    })

    
})

module.exports = {
    courseRouter: courseRouter
}