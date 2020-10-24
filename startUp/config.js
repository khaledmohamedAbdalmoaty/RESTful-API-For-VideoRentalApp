const config=require("config");
module.exports=function(){
    if(!config.get("jwtprivatekey")){
        throw new Error("fatal error:jwt is not defined")
        /* console.error("fatal error:jwt is not defined");
        process.exit(1); */
    }
}