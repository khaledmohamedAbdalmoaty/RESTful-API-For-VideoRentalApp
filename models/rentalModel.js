const { boolean, required } = require("joi");
const Joi=require("joi");
const mongoose=require("mongoose");
const moment=require("moment");

/* ------------------------------ rental Schema ----------------------------- */
const rentalShema=new mongoose.Schema({
    customer:{
        type:new mongoose.Schema({
            name:{
                type:String,
                required:true,
                minlength:5,
                maxlength:50
            },
            isGold:{
                type:Boolean,
                default:false
            },
            phone:{
                type:String,
                required:true,
                minlength:5,
                maxlength:50
            }
        }),
        required:true
    },
    movie:{
        type:new mongoose.Schema({
            title:{
                type:String,
                required:true,
                minlength:5,
                maxlength:50
            },
            dailyRentalRate:{
                type:Number,
                required:true,
                min:0,
                max:255
            }
        }),
        required:true,
       /*  title:{
            type:String,
            required:true,
            minlength:5,
            maxlength:50
        },
        dailyRentalRate:{
            type:Number,
            required:true,
            min:0,
            max:255
        } */
    },
    dateOut:{
        type:Date,
        require:true,
        default:Date.now
    },
    dateReturned:{
        type:Date// calc the Endday of rental and put it here
    },
    rentalFee:{
        type:Number,//the cost of rental per day ,month,etc....
        min:0
    }

});

/* -------------------- add astatic method called lookup -------------------- */
rentalShema.statics.lookup=function(customerId,movieId){
   return this.findOne({
        "customer._id":customerId,
        "movie._id":movieId
    });
};

/* ------------------------- add an instance method ------------------------- */
rentalShema.methods.return=function() {
    this.dateReturned=new Date();
    
    const rentalDays=moment().diff(this.dateOut,"days");
    this.rentalFee=rentalDays *this.movie.dailyRentalRate
}
/* ------------------------------ rental model ------------------------------ */
const Rental=mongoose.model("Rentals",rentalShema);

/* ------------------------ rental validata function ------------------------ */
function validateRental(rental){
    const shema=Joi.object({
        customerId:Joi.objectId().required(),
        movieId:Joi.objectId().required(),
    });
    const result=shema.validate(rental);
    return result;
}

/* ----------------------------- module.exports ----------------------------- */
module.exports.validateRental=validateRental;
module.exports.Rental=Rental
