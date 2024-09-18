const express = require("express");
const AuthController = require("../controller/Authlogin");


const routerAuth =  express.Router();


routerAuth.post("/login" , AuthController.login);
// routerAuth.post("/re" , AuthController.register);


module.exports = routerAuth;