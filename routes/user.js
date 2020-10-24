const express=require("express");
const router=express.Router();
//const mongoose=require("mongoose")
const {User,validateUser}=require("../models/userModel.js")
const _=require("lodash");
const bcrypt=require("bcrypt");
const auth=require("../middleWare/middle_auth.js");

/* ------------------------------- get request ------------------------------ */
router.get("/me",auth.auth,async(req,res)=>{
    const user=await User.findById(req.user._id).select("-password");
    res.send(user);
});
/* ------------------------------ post request ------------------------------ */
router.post("/",async(req,res)=>{
    const result=validateUser(req.body);
    if(result.error){
        return res.status(400).send(result.error.details[0].message);
    }; 
    let user=await User.findOne({ email:req.body.email});
    if(user){
        return res.status(400).send("user Already registered.")
    };
    user=new User(_.pick(req.body,["name","email","password","isAdmin"]));
    const salt=await bcrypt.genSalt(10);
    user.password=await bcrypt.hash(user.password,salt)
    await user.save();
    const token=user.generateAuthToken();
    res.header("x-auth-token",token).send(_.pick(user,["_id","name","email"]));

});


module.exports=router;


