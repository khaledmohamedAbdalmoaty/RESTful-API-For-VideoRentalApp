const mongoose=require("mongoose");
const {Genre}=require("../models/genresModel.js");
const {validateMovie,Movie}=require("../models/movieModel.js");
const express=require("express");
const router=express.Router();

/* ------------------------------- get method ------------------------------- */
router.get("/",async(req,res)=>{
    const movie=await Movie.find().sort("name");
    res.send(movie);
});

/* ------------------------------ post request ------------------------------ */
router.post("/",async(req,res)=>{
    const title=req.body.title;
    const genreId=req.body.genreId;
    const numberInStock=req.body.numberInStock;
    const dailyRentalRate=req.body.dailyRentalRate ;
   /*  const obj={title:title,genreId:genreId,numberInStock:numberInStock,dailyRentalRate:dailyRentalRate}; */
    const result=validateMovie(req.body);
    if(result.error){
        return res.status(400).send(result.error.details[0].message)
    };
    const genre=await Genre.findById(genreId);
    if(!genre){
        return res.status(400).send("Invalid genre")
    }
    const movie=new Movie({
        title, genre:{
            _id:genre._id,
            name:genre.name
        },
        numberInStock,
        dailyRentalRate
    });
    await movie.save();
    res.send(movie);
})

module.exports=router;

