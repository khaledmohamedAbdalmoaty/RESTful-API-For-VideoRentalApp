const { JsonWebTokenError } = require("jsonwebtoken");
const { iteratee } = require("lodash");
const mongoose = require("mongoose");
const auth=require("../../../middleWare/middle_auth.js");
const{User}=require("../../../models/userModel.js")

describe("describ:middle_auth.js=>",()=>{
    it("should return the req.user wiht the payload of the jwt",async()=>{
        const user={_id:mongoose.Types.ObjectId().toHexString(),isAdmin:true}
        const token=new User(user).generateAuthToken();
        const req={
            header:jest.fn().mockReturnValue(token)
        };
        const res={};
        const next=jest.fn();
        auth.auth(req,res,next);
        expect(req.user).toBeDefined();
        expect(req.user).toMatchObject(user);
    })
});