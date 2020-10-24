const express=require("express");
const app=express();
const mongoose=require("mongoose");
const winston=require("winston");

/* ------------------- calling joi object id configuration ------------------ */
require("./startUp/validation.js")();
/* ---------------------------- start updatabase ---------------------------- */
require("./startUp/dBstartup.js")(mongoose,winston);

/* --------------------------------- app.use -------------------------------- */
require("./startUp/appUse.js")(app);

/* ---------------- dealing wiht uncaughtErrors and Rejection --------------- */

require("./startUp/logging_winston.js")(winston)

/* ---------------------------- jwt exist or not ---------------------------- */
require("./startUp/config.js")();//notice the () mean calling the function

/* ----------------------- get the productin function ----------------------- */
require("./startUp/production.js")(app);
/* ------------------- set a portNumber and turn on server ------------------ */
const portNumber=process.env.PORT || 3000;
const server=app.listen(portNumber,()=>{
    winston.info(" listening to port Number"+portNumber)
});
module.exports=server;




















   























 