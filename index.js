require("dotenv").config(); //CALLING THE .ENV FILE AUTOMATICALLY 
const express = require("express");
const app = express();
app.use(express.json());
const mongoose =  require ("mongoose");
const MONGO_URL = process.env.MONGO_URL;// CALLING THE VARIABLE 
const PORT = process.env.PORT ;


const {userRouter} = require("./routes/user");
const {courseRouter} = require("./routes/course");
const {adminRouter} =require("./routes/admin");

app.use("/api/v1/user",userRouter);
app.use("/api/v1/admin",adminRouter);
app.use("/api/v1/course",courseRouter);

async function main(){ //use dotenv to put ur envoirment variables in a seperate file 
    await mongoose.connect(MONGO_URL);
    app.listen(PORT);
    console.log("listening on port 3000")
}

main();


