const mongoose = require("mongoose");

const LaborSchema = new mongoose.Schema({
    name: {
        type: String,
        
    },
    email: {
        type: String,
        unique: true,
       
    },
    password: {
        type: String,
        
    },
    phone: {
        type: String,
        unique: false, 
         
    },
    role:{
        type:String,
    },
    contractor: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Contractor",
       
    }],
    
} , {timestamps : true});

const LaborData = mongoose.model("Labor", LaborSchema);
module.exports = LaborData;
