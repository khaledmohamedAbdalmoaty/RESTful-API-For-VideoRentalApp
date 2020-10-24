const config=require("config");
const jwt=require("jsonwebtoken");

function auth(req,res,next){   
    const token= req.header("x-auth-token");
    if(!token){
        return res.status(401).send("Access denied .No token provide ")
    }
    try{
        const payload=jwt.verify(token,config.get("jwtprivatekey"));//made an error so program go to the catch section
        //req.body=payload;
        req.user=payload;
        next();
    }
    catch(err){
        res.status(400).send("Invalid token")
    }
}
module.exports.auth=auth;