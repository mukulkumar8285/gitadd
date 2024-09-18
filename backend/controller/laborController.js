const bcrypt = require("bcrypt");
const LaborData = require("../module/labors");

const CreateLabor = async(req , res)=>{
const {name , email , password , phone , role , contractor} = req.body;
console.log(name , email , password , phone , role);

    try{
        if(!name || !email  || !password || !phone ){
            return res.status(400).json({message : "Please fill all the fields" });
            }
        const laboremail =  await LaborData.findOne({email});
        if(laboremail){
            return res.status(400).json({message : "Email already exists" });
        }
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(password, salt);
        const  Contract = new LaborData({
            name ,
            email ,
            password : hashPassword ,
            phone ,
            role ,
            contractor
            });
           const  result = await Contract.save();

            res.status(201).json({result });

    }catch(error){
        console.log(error);
        res.status(400).json({
            message : "Error in creating LaborData"
        })
    }
}
const ReadLabor = async(req , res)=>{
    try{
        const  Readlabore = await LaborData.find().populate("contractor");
        res.status(200).json({Readlabore});
    }catch(error){
        console.log(error);
        res.status(400).json({
            message : "Error in reading LaborData"
        })
    }
}
const UpdateLabor = async (req, res) => {
    const { id } = req.params;
    const { name, email , phone , role , contractor } = req.body;
    console.log(id);
    console.log(name, email);

    try {
        
        

      
        const updateData = {};
        if (name) updateData.name = name;
        if (email) updateData.email = email;
        if (phone) updateData.phone = phone;
        if (role) updateData.role = role;
        if (contractor) updateData.contractor = contractor;


    
        const updatedLabor = await LaborData.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedLabor) {
            return res.status(404).json({ message: "LaborData not found" });
        }

        res.status(200).json({
            message: "LaborData updated successfully",
            updatedLabor 
        });
    } catch (error) {
        console.error(error); 
        res.status(400).json({
            message: "Error in updating LaborData",
            error: error.message 
        });
    }
};
const DeleteLabor = async(req , res)=>{
    const { id } = req.params;
    try{
        if(!id){
            return res.status(400).json({message : "Please provide an ID"})
        }
        const deletedContractor = await LaborData.findByIdAndDelete(id)
        if(!deletedContractor){
            return res.status(404).json({message : "Contractor not found"})
            }
         res.status(200).json({
            message : "Contractor deleted successfully",
         })   
    }
    catch(err){
        console.log(err);
        }
}


const LaborController = {
    CreateLabor,
    ReadLabor,
    UpdateLabor,
    DeleteLabor
}

module.exports = LaborController;