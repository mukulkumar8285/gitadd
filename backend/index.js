const express = require("express");
const router = require("./router/CompanyRouter");
const MongoBd = require("./mongoBd/mongodb");
const routerLabor = require("./router/ContractorRouter");
const cors = require('cors');
const routerAuth = require("./router/Authrouter");


const app = express();
app.use(express.json());
const port = 3000;
app.use(cors());


app.use("/api" , routerAuth);
app.use("/api/contractor" , router );
app.use("/api/labor" , routerLabor );




MongoBd();

app.listen(port , ()=>{
    console.log(`server is running on port ${port}`);
})