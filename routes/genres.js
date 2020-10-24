const express=require("express");
const router=express.Router();
const {Genre,validateGenre}=require("../models/genresModel.js");
const auth=require("../middleWare/middle_auth.js");
const isadmin=require("../middleWare/admin_middlefunc.js");
const asyncMiddleFun=require("../middleWare/asyncMiddleFunction.js");
const ValidId=require("../middleWare/validMongoId.js")

/* ------------------------------- get request ------------------------------ */
/* the main page  */
router.get("/",asyncMiddleFun(async(req,res)=>{
       // mongoose.connection.close();
        //throw new Error("could not get the ginder throug get request");
        const genres=await Genre.find().sort("name");
        res.send(genres);
        
    })
);
/* get genre with a specific id */
router.get("/:id",ValidId,async(req,res)=>{
    const genre=await Genre.findById(req.params.id);
    if(!genre){
        return res.status(404).send("the genre with the given id is not exist")
    };
    res.status(200).send(genre);

});

/* ------------------------------ post request ------------------------------ */
router.post("/",auth.auth,async(req,res)=>{
    const result=validateGenre(req.body);
    if(result.error){
        return res.status(400).send(result.error.details[0].message);
    } 
    let genre=new Genre({name:req.body.name})
    genre=await genre.save();
    res.status(200).send(genre);

});

/* ------------------------------- put request ------------------------------ */
router.put("/:id",async(req,res)=>{
    const obj={name:req.body.name}
    console.log(obj);
    const result=validateGenre(obj);
    //console.log(req.body.name)
    if(result.error){
        return res.status(400).send(result.error.details[0].message);
    } 
    const genre=await Genre.findByIdAndUpdate(req.params.id,{name:req.body.name},{new:true});
    if(!genre){
        return res.status(404).send("the genre with given Id is not exist");
    };
    res.send(genre);
})

/* ----------------------------- delete request ----------------------------- */
router.delete("/:id",[auth.auth,isadmin],async (req,res)=>{
    const genre=await Genre.deleteOne({_id:req.params.id});
    if(!genre){
        return res.status(404).send("Genres with the given id doesn't exist");
    };
    res.send(genre); 
    
})


module.exports=router;


