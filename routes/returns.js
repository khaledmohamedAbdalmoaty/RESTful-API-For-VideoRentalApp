const express= require("express");
const router=express.Router();
const {Rental}=require("../models/rentalModel.js");
const auth=require("../middleWare/middle_auth.js")
const moment=require("moment")
const {Movie}=require("../models/movieModel.js")
const Joi=require("joi");
const validate=require("../middleWare/validateReturn.js")

router.post("/",[auth.auth,validate(validateReturn)],async (req,res)=>{   
    const rental=await Rental.lookup(req.body.customerId,req.body.movieId);
    if(!rental){
        return res.status(404).send("rental is not found!")
    }
    if(rental.dateReturned){
        return res.status(400).send(" rental is already processed!")

    };
    rental.return();
    await rental.save();
    await Movie.update({_id:rental.movie._id},{
        $inc:{numberInStock:1}
    });
  
    //console.log(rental);
    res.status(200).send(rental);
});
function validateReturn(genre){
    const shema=Joi.object({
        customerId:Joi.objectId().required(),
        movieId:Joi.objectId().required(),
    });
    const result=shema.validate(genre);
    return result;
}


module.exports=router;












































