const {User}=require("../../../models/userModel.js");
/* const Joi=require("joi"); */
const mongoose=require("mongoose");
const config=require("config");
const jwt=require("jsonwebtoken");
describe("UserModelTest:",()=>{
    it("jwt:",()=>{
        //
        const payload={_id:new mongoose.Types.ObjectId().toHexString(),
            isAdmin:true
        };
        const user=new User(payload);
        const token=user.generateAuthToken();
        const returnPayload=jwt.verify(token,config.get("jwtprivatekey"));
        expect(returnPayload).toMatchObject(payload);
    });
})