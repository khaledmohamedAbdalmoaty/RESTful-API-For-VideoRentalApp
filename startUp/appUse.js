const express=require("express");
const genres=require("../routes/genres.js");
const customer=require("../routes/customers.js")
const movies=require("../routes/movie.js");
const rental=require("../routes/rental.js");
const user=require("../routes/user.js");
const auth=require("../routes/authenticate.js");
const returns=require("../routes/returns.js");
const errorMiddleFunction=require("../middleWare/errorMiddle.js");
module.exports=function(app){
    app.use(express.json());
    app.use("/api/genres",genres);
    app.use("/api/customers",customer);
    app.use("/api/movies",movies);
    app.use("/api/rentals",rental);
    app.use("/api/users/",user);
    app.use("/api/auth/",auth);
    app.use("/api/returns/",returns);
    app.use(errorMiddleFunction);
}