module.exports=function(winston){
/* ------------------------------- use winston ------------------------------ */
winston.add(winston.transports.File, {filename: "logfile.log"});
//winston.add(new winston.transports.File({ filename: 'logfile.log' }));
/* ------------------------------ uncatughtError ------------------------------ */
process.on("unhandledRejection",(ex)=>{
    winston.info("Error:"+ex.message);  
    process.exit(1) 
    
});
process.on("uncaughtException",(ex)=>{
    //console.log("we got uncaught exception");
    winston.info("Error:"+ex.message);  
    process.exit(1) 
});
//const p=Promise.reject(new Error("something failed miserably"));
//throw new Error("something happend during startup ");
}