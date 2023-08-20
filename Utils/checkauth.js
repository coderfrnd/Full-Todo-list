import  jwt  from "jsonwebtoken";
import cerror from "./error.js";

export default (req,res,next) =>{
    const token = req.cookies.access_token;
    // res.json(token);
    console.log(token)
    if(!token){
        return next(cerror({status:401,message:"unauthorized"}));
        // next()
    }
    return jwt.verify(token,process.env.JWT_SCERET,(err,decoded)=>{
        if(err){
            return next(cerror({status:401,message:"invalid token "}));
        }
        req.user=decoded;
        return next();
    });
    

}