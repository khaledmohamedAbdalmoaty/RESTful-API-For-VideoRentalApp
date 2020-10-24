const config=require("config");
/* -------------------------- connect with database ------------------------- */
module.exports=function(mongoose,winston){
    const db=config.set("db");
    mongoose.connect(db,{ useUnifiedTopology: true , useNewUrlParser: true })
    .then(()=>{
        winston.info("connected to database"+db)
    })
    .catch((err)=>{winston.info(err.message)});
}
