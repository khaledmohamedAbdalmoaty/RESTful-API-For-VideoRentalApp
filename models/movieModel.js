const Joi=require("joi");
const mongoose=require("mongoose");
const {genreSchema}=require("./genresModel.js")

/* ------------------------- movie model in database ------------------------ */
const Movie=mongoose.model("Movies",new mongoose.Schema({
    title:{
      type:String,
      minlength:5,
      maxlength:50,
      required:true,
      trim:true
    },
    genre:{
        type:genreSchema,
        required:true
    },
    numberInStock:{
        type:Number,
        required:true,
        min:0,
        max:255
    },
    dailyRentalRate:{
        type:Number,
        required:true,
        min:0,
        max:255
    }
    
}));
function validateMovie(movie){
    const shema=Joi.object({
        title:Joi.string().min(5).max(50).required(),
        genreId:Joi.objectId().required(),
        numberInStock:Joi.number().min(0).required(),
        dailyRentalRate:Joi.number().min(0).required(),   
    });
    const result=shema.validate(movie);
    return result;
};
module.exports.validateMovie= validateMovie;
module.exports.Movie= Movie;

