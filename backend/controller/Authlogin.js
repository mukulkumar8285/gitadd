const ContractorModule = require("../module/Contractors");
const bcrypt = require("bcrypt");

const login = async(req , res)=>{
    const {email , password} = req.body;
    const user = await ContractorModule.findOne({email});
    if(!user){
        return res.status(400).json({message : "User not found"});
        }
        const isMatch = await bcrypt.compare(password , user.password);
        if(!isMatch){
        return res.status(400).json({message : "Invalid password"});
    }
    res.json({
        message : "Login Successfull",
        user : user
    })
}
const AuthController = {
    login
}

module.exports = AuthController;