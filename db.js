require("dotenv").config(); //CALLING THE .ENV FILE AUTOMATICALLY 
const mongoose = require("mongoose");
const Schema = mongoose.Schema ;
const obejectId = Schema.ObjectId ;
const MONGO_URL = process.env.MONGO_URL// CALLING THE VARIABLE 
mongoose.connect(MONGO_URL);

const User = new Schema({
    email : { type : String ,unique : true },
    password : String ,
    firstname : String ,
    lastname : String  

})

const Admin = new Schema({
    email : String ,
    password : String ,
    firstname : String ,
    lastname : String  
    
})

const Course = new Schema({
    title : String ,
    description : String ,
    price: Number,
    imageUrl : String,
    creatorId : obejectId

})

const Purchase = new Schema({
    courseId : obejectId, //id from course data 
    userId : obejectId //id form user data
    
})

const UserModel = mongoose.model("Users",User);
const AdminModel = mongoose.model("Admins",Admin);
const CourseModel = mongoose.model("Courses",Course);
const PurchaseModel = mongoose.model("Purchases",Purchase);

module.exports = {
    UserModel: UserModel,
    AdminModel: AdminModel,
    CourseModel:CourseModel,
    PurchaseModel:PurchaseModel
}