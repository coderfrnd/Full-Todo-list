import  jwt  from "jsonwebtoken";

export default (req,res,next) =>{
    const token = req.cookies.access_token;
    // res.json(token);
    console.log(token)
    if(!token){
        return res.json("sorry bro");
        // next()
    }
    return jwt.verify(token,process.env.JWT_SCERET,(err,decoded)=>{
        if(err){
            return res.json('invalid token');
        }
        req.user=decoded;
        return next();
    });
    

}