/* const express=require("express");
const router=express.Router(); */
const Joi=require("joi");
const mongoose=require("mongoose");
/* ------------------------- create mongoose schema ------------------------- */
const genreSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:5,
        maxlength:50
    }
})
const Genre= mongoose.model("Genre",genreSchema)

/* ----------------------------- validation Joi ----------------------------- */
function validateGenre(genre){
    const shema=Joi.object({
        name:Joi.string().min(4).max(50).required()
    });
    const result=shema.validate(genre);
    return result;
}

/* ----------------------------------- -- ----------------------------------- */
module.exports.Genre=Genre;
module.exports.validateGenre=validateGenre;
module.exports.genreSchema=genreSchema;