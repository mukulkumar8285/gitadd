const mongoose = require("mongoose");

const admin = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
})
const AdminModule = mongoose.model("Admin", admin);
module.exports = AdminModule;