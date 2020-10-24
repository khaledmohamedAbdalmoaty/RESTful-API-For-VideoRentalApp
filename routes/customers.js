const express=require("express");
const router=express.Router();
const {Customer,validateCustomer}=require("../models/customersModel.js")




/* ------------------------------- get request ------------------------------ */
router.get("/",async(req,res)=>{
    const customer=await Customer.find().sort("name");
    res.send(customer);
});
/* get customer with a specific id */
router.get("/:id",async(req,res)=>{
    const customer=await Customer.findById(req.params.id);
    if(!customer){
        return res.status(404).send("the customer with the given id is not exist")
    };
    res.send(customer);
});

/* ------------------------------ post request ------------------------------ */
router.post("/",async(req,res)=>{
    const name=req.body.name;
    const isGold=req.body.isGold;
    const phone=req.body.phone;
    const obj={
        name:name,
        isGold:isGold,
        phone:phone
    }
    const result=validateCustomer(obj);
    if(result.error){
        return res.status(400).send(result.error.details[0].message);
    } 
    let customer=new Customer({
        name:name,
        isGold:isGold,
        phone:phone
    })
    customer=await customer.save();
    res.send(customer);
});

/* ----------------------------- delete request ----------------------------- */
router.delete("/:id",async(req,res)=>{
    const customer=await Customer.deleteOne({_id:req.params.id});
    if(!customer){
        return res.status(404).send("customer with the given id is not found!!")
    };
    res.send(customer);
});
/* ------------------------------- put request ------------------------------ */
router.put("/:id",async(req,res)=>{
    const name=req.body.name;
    const isGold=req.body.isGold;
    const phone=req.body.phone;
    const obj={
        name:name,
        isGold:isGold,
        phone:phone
    }
    const result=validateCustomer(obj);
    
    if(result.error){
        return res.status(400).send(result.error.details[0].message);
    } 
    const customer=await Customer.findByIdAndUpdate(req.params.id,{name:req.body.name},{new:true});
    if(!customer){
        return res.status(404).send("the customer with given Id is not exist");
    };
    res.send(customer);
})


module.exports=router;
