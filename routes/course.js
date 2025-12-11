const express = require("express");
const Router = express.Router ;
const {CourseModel} = require("../db");
const courseRouter = Router() ;  //Router is not a class its a function 

courseRouter.get("/purchase",function(req,res){
    
    res.json({
        message: "You have signed up"
    })

    
})

courseRouter.get("/preview",function(req,res){
    res.json({
        message: "You have signed up"
    })

    
})

module.exports = {
    courseRouter: courseRouter
}