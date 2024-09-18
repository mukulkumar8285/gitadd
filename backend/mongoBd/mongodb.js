const mongoose = require("mongoose");
//sXXCXdeb5le04Zh2

const MongoBd = async() => {
    try{
       await  mongoose.connect("mongodb+srv://mukulved07:sXXCXdeb5le04Zh2@cluster0.qxkhg.mongodb.net/Mean")
        
        console.log("Connected to MongoDB");

    }catch(error){
        console.log(error)
    }
}

module.exports = MongoBd;



