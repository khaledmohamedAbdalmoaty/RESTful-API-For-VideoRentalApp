
const request=require("supertest");
const{Genre}=require("../../models/genresModel.js");
const{User}=require("../../models/userModel.js")
describe("describe:/api/genres",()=>{
    let server;
    beforeEach(()=>{server=require("../../index.js")});
    afterEach(async()=>{
        
        await server.close()
        await Genre.deleteMany({});
    });

     describe("describe:GET/",()=>{
        it("it:should return all genres",async ()=>{
            await Genre.collection.insertMany(
                [{name:"khaled1"},
                {name:"khaled2"}]       
            );
            const res=await request(server).get("/api/genres");
            expect(res.status).toBe(200);
            expect(res.body.length).toBe(2);
            expect(res.body.some(g=>g.name==="khaled1")).toBeTruthy();
            expect(res.body.some(g=>g.name==="khaled2")).toBeTruthy(); 

        });
        describe("describe:GET/id",()=>{
            it("it:should return genera  if valied id is passed",async ()=>{
                const genre=new  Genre({name:"kahled 3"});
                await genre.save();
                console.log(genre); 
                const res=await request(server).get("/api/genres/"+genre._id);
                expect(res.status).toBe(200);
                expect(res.body).toHaveProperty("name",genre.name);
            });
            it("it:should return 404 if id is not valid",async ()=>{
                const res=await request(server).get("/api/genres/1");
                expect(res.status).toBe(404);
            });
        })
    }); 
    
/* ---------------------------- post genrees test --------------------------- */
    describe("describe:Post/",()=>{
        let token;  
        let name;
        beforeEach(async()=>{
           token=new User().generateAuthToken();
           name=new Array(52).join("a")
        })
        const exec=async()=>{
            return await request(server)
                .post("/api/genres")
                .set("x-auth-token",token)//deal with header
                .send({name:name});
            
        }

        it("it:should retunr 401 if the user is not logged",async ()=>{
                token=""
                name="khaled4444";
                const res=await exec();
                expect(res.status).toBe(401);  
                console.log(res.text)       

        });
        it("it:should retunr 400 if the user name is less than 5 characters",async ()=>{
            name="kh";
            const res=await exec();
            expect(res.status).toBe(400);  
            console.log(res.text);       

        });
        it("it:should retunr 400 if the user name is more than 50 characters",async ()=>{           
            const res=await exec()
            expect(res.status).toBe(400);  
            console.log(res.text)       
        });
        
    });
    
})