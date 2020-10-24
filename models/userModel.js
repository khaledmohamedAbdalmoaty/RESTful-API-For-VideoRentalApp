const Joi=require("joi");
const mongoose=require("mongoose");
const config=require("config");
const jwt=require("jsonwebtoken");
/* ------------------------- create mongoose schema ------------------------- */
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:5,
        maxlength:50
    },
    email:{
        type:String,
        required:true,
        minlength:5,
        maxlength:255,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:5,
        maxlength:1024,
    },
    isAdmin:Boolean
});
userSchema.methods.generateAuthToken=function(){
    const token=jwt.sign({_id:this._id,isAdmin:this.isAdmin},config.get("jwtprivatekey"));
    return token;
};
const User= mongoose.model("Users",userSchema)

/* ----------------------------- validation Joi ----------------------------- */
function validateUser(user){
    const shema=Joi.object({
        name:Joi.string().min(5).max(50).required(),
        email:Joi.string().min(5).max(255).required().email(),
        password:Joi.string().min(5).max(255).required(),
        isAdmin:Joi.boolean()
    });
    const result=shema.validate(user);
    return result;
};

/* ----------------------------------- -- ----------------------------------- */
module.exports.User=User;
module.exports.validateUser=validateUser;
/* module.exports.genreSchema=genreSchema; */