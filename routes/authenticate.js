
const express=require("express");
const router=express.Router();
//const mongoose=require("mongoose")
const {User}=require("../models/userModel.js");
//const _=require("lodash");
const bcrypt=require("bcrypt");
const Joi=require("joi");
const jwt=require("jsonwebtoken");
const config=require("config");


/* ------------------------------ post request ------------------------------ */
router.post("/",async(req,res)=>{
    const result=validateUser(req.body);
    if(result.error){
        return res.status(400).send(result.error.details[0].message);
    }; 
    let user=await User.findOne({ email:req.body.email});
    if(!user){
        return res.status(400).send("Invalid email or password")
    };
    //check password
    const validPassword=await bcrypt.compare(req.body.password,user.password)
    if(!validPassword){
        return res.status(400).send("Invalid email or password");
    };
    //send a jwt to user
    const token=jwt.sign({_id:user._id},config.get("jwtprivatekey"));
    res.send(token);

});

function validateUser(user){
    const shema=Joi.object({
        email:Joi.string().min(5).max(255).required().email(),
        password:Joi.string().min(5).max(255).required()
    });
    const result=shema.validate(user);
    return result;
}


module.exports=router;


