const Joi=require("joi");
const mongoose=require("mongoose");
/* ---------------------------- validate customer --------------------------- */
function validateCustomer(customer){
    const shema=Joi.object({
        name:Joi.string().min(5).max(50).required(),
        phone:Joi.string().min(5).max(50).required(),
        isGold:Joi.boolean()
    });
    const result=shema.validate(customer);
    return result;
}
/* ------------------------- create mongoose schema ------------------------- */
const customerSchema=new mongoose.Schema({
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
    },

});
const Customer=mongoose.model("Customer",customerSchema);
module.exports.Customer=Customer;
module.exports.validateCustomer=validateCustomer;

