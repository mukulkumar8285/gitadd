// UserController.Create
const bcrypt = require("bcrypt");
const ContractorModule = require("../module/Contractors")


const CreateContractor = async (req, res) => {
    const { name, email, password, labor } = req.body;

    try {
     
        if (!name || !email || !password ) {
            return res.status(400).json({ message: "Please fill in all fields and provide labor IDs as an array" });
        }

      
        const existingContractor = await ContractorModule.findOne({ email });
        if (existingContractor) {
            return res.status(400).json({ message: "Email already exists" });
        }

      
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        
        const contractor = new ContractorModule({
            name,
            email,
            password: hashedPassword,
            labor 
        });

    
        const savedContractor = await contractor.save();
        res.status(201).json({ contractor: savedContractor });
    } catch (err) {
        console.error("Error creating contractor:", err); // Improved error logging
        res.status(500).json({ message: "Server error" });
    }
};


const ReadContractor = async (req , res)=>{
    try{
        const  contractor = await ContractorModule.find().populate({
           path: "labor" , 
           select:"-password"
        }).select("-password");
        res.status(200).json({contractor});
    }
    catch(err){
        console.log(err);
        res.status(400).json({
            message: "Error fetching contractors"
        })
        }
}
const UpdateContractor = async (req, res) => {
    const { id } = req.params; 
    const updateData = req.body; 

    try {
        if (!id) {
            return res.status(400).json({ message: "Please provide an ID" });
        }
        if (!updateData) {
            return res.status(400).json({ message: "No update data provided" });
        }

        
        const emailExists = await ContractorModule.findOne({
            email: updateData.email,
            _id: { $ne: id }
        });

        if (emailExists) {
            return res.status(400).json({ message: "Email already exists" });
        }


        const updatedContractor = await ContractorModule.findByIdAndUpdate(
            id,
            updateData,
               );

        if (!updatedContractor) {
            return res.status(404).json({ message: "Contractor not found" });
        }

        res.status(200).json({
            message: "Contractor updated successfully",
            updatedContractor
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
}

const DeleteContractor = async (req , res)=>{
    const { id } = req.params;
    try{
        if(!id){
            return res.status(400).json({message : "Please provide an ID"})
        }
        const deletedContractor = await ContractorModule.findByIdAndDelete(id)
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


const UserContractor = {
    CreateContractor,
    ReadContractor,
    UpdateContractor,
    DeleteContractor
}
module.exports = UserContractor;