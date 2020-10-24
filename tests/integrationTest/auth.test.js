const { iteratee } = require("lodash");
const request=require("supertest");
const{Genre}=require("../../models/genresModel.js");
const{User}=require("../../models/userModel.js")
describe("describe:auth middleware",()=>{
    let server;
    let token;
    beforeEach(()=>{
        server=require("../../index.js")
        token=new User().generateAuthToken();
    });
    afterEach(async()=>{
       await  server.close();
        await Genre.remove({});
    });
    const exe=async()=>{
        return request(server)
        .post("/api/genres")
        .set("x-auth-token",token)//deal with header
        .send({name:"khaled abdalmoaty"});
    }
    it("it:should return 401 if no token is provided",async()=>{
            token="";
            const res=await exe();
            console.log(res.text);
            expect(res.status).toBe(401);
    });
    it("it:should return 400  for In valid token",async()=>{
        token=null;
        const res=await exe();
        console.log(res.text);
        expect(res.status).toBe(400);
    });
    it("it:should return 200 ",async()=>{
        const res=await exe();
        console.log(res.text);
        expect(res.status).toBe(200);
    });



})
 