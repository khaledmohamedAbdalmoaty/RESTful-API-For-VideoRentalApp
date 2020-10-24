const {validateRental,Rental}=require("../models/rentalModel.js");
const express=require("express");
const router=express.Router();
const Fawn=require("fawn");
const mongoose=require("mongoose");
const {Customer}=require("../models/customersModel.js");
const {Movie}=require("../models/movieModel.js");

/* --------------- initialize fawn which perform 2 face commit -------------- */
Fawn.init(mongoose);
/* ------------------------------- get request ------------------------------ */
router.get("/",async(req,res)=>{
    const rentals=await Rental.find().sort("-dateOut");
    res.send(rentals);
});

/* ------------------------------ post request ------------------------------ */
router.post("/",async(req,res)=>{
    const result=validateRental(req.body);
    if(result.error){
        return res.status(400).send(result.error.details[0].message)
    };
    const customer=await Customer.findById(req.body.customerId);
    if(!customer){
        return res.status(400).send("Invalide customer")
    };
    const movie=await Movie.findById(req.body.movieId);
    if(!movie){
        return res.status(400).send("Invalide movie")
    };
    if(movie.numberInStock===0){
        return res.status(400).send("Movie not in Stock")
    };
    let rental=new Rental({
        customer:{
            _id:customer._id,
            name:customer.name,
            phone:customer.phone
        },
        movie:{
            _id:movie._id,
            title:movie.title,
            dailyRentalRate:movie.dailyRentalRate
        },
    });
    try{
        new Fawn.Task()
        .save("rentals",rental)
        .update("movies",{_id:movie._id},{$inc:{numberInStock:-1}})
        .run();
        res.send(rental)
    }
    catch(err){
        res.status(500).send("Something Failed")
    }
    rental=await rental.save();//the problem may happen in this line error occure and movie.save() takeAction we can solve this proble by transaction
    movie.numberInStock--;
    movie.save();
    res.send(rental);


});
module.exports=router;