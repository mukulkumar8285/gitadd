const express = require("express");
const UserContractor = require("../controller/Company")

const router = express.Router();

router.post("/create" , UserContractor.CreateContractor);
router.get("/read" , UserContractor.ReadContractor);
router.put("/update/:id" , UserContractor.UpdateContractor);
router.delete("/delete/:id" , UserContractor.DeleteContractor);


module.exports = router;