const moment=require("moment");
const {Rental}=require("../../models/rentalModel.js");
const mongoose=require("mongoose");
const { iteratee } = require("lodash");
const {User}=require("../../models/userModel.js")
const request=require("supertest");
const {Movie}=require("../../models/movieModel.js")
describe("describe:/api/rental/",()=>{
    let server;
    let customerId;
    let movieId;
    let rental;
    let token;
    let movie;
    
    const exe=()=>{
        return request(server)
        .post("/api/returns/")
        .set("x-auth-token",token)
        .send({customerId,movieId});
    };
    beforeEach(async ()=>{
        token=new User().generateAuthToken();
        customerId=mongoose.Types.ObjectId();
        movieId=mongoose.Types.ObjectId();
        server=require("../../index.js");
        movie=new Movie({
            _id:movieId,
            title:"khaledabdalmoatywhat",
            genre:{name:"kdfjsldfkj"},
            numberInStock:10,
            dailyRentalRate:10
        });
        await movie.save();
        rental=new Rental({
            customer:{
                _id:customerId,
                name:"khaledishere",
                phone:"12345"
            },
            movie:{
                _id:movieId,
                title:"movieTitle",
                dailyRentalRate:2
            }

        });
       await  rental.save();
    });
    afterEach(async()=>{
        await Rental.remove({});
        await Movie.remove({});
        await server.close()
    });

    it("it:return 401 if user doesn't logged in",async ()=>{
       token="";
        const result= await exe();
        expect(result.status).toBe(401);
    });
    it("it:return 400 if customerId is not provided",async ()=>{
        customerId="";
        const result= await exe();
        expect(result.status).toBe(400);
    });
    it("it:return 400 if movieId is not provided",async ()=>{
        movieId="";
        const result= await exe();
        expect(result.status).toBe(400);
    });
    it("it:return 404 if Rental  is not found",async ()=>{
        await Rental.remove({});
        const result= await exe();
        expect(result.status).toBe(404);
    });
    it("it:return 400 if Rental is already processed",async ()=>{
        rental.dateReturned=new Date();
        await rental.save();
        const result= await exe();
        expect(result.status).toBe(400);
    });
    it("it:return 20 if valid request",async ()=>{
        const result= await exe();
        expect(result.status).toBe(200);
    });
    it("it:should set datareturned if request is valid",async ()=>{
        const res= await exe();
        const result=await Rental.findById(rental._id);
        const diff=new Date()-result.dateReturned
        //expect().toBeDefined();
        expect(diff).toBeLessThan(10*1000)
    });
    it("it:should return rental fee  if request is valid",async ()=>{
        rental.dateOut=moment().add(-10,"days").toDate();
        await rental.save();
        const res= await exe();
        const result=await Rental.findById(rental._id);
        expect(result.rentalFee).toBe(20);
        //console.log(result.rentalFee)
    });
    it("it:should increase the movie stock  if request is valid",async ()=>{
        const res= await exe();
        const mov=await Movie.findById(movieId);
        expect(mov.numberInStock).toBe(movie.numberInStock+1);

    });
    it("it:should return the rental if request is valid",async ()=>{
        const res= await exe();
       // const ren=await Rental.findById(rental._id);
        expect(Object.keys(res.body)).toEqual(
            expect.arrayContaining(["dateOut","dateReturned","rentalFee","customer"])
        );

    });

})

