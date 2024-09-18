const express = require("express");

const LaborController = require("../controller/laborController");

const routerLabor = express.Router();

routerLabor.post("/create" , LaborController.CreateLabor);
routerLabor.get("/read" , LaborController.ReadLabor);
routerLabor.put("/update/:id" , LaborController.UpdateLabor);
routerLabor.delete("/delete/:id" , LaborController.DeleteLabor);


module.exports = routerLabor;