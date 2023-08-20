import express from "express";
import bcryptjs from 'bcryptjs'
import user from '../Models/User.js'
import  jwt  from "jsonwebtoken";
import cerror from "../Utils/error.js";
// import register from '../Controller/auth.js'
// import {register} from '../Controller/auth.js'
// const app = express()

const router= express.Router()

router.get('/register',async(req,res,next)=>{
        if(!req.body.name || !req.body.email || !req.body.password ){
            return  next(cerror({status:400,message:"name password email is required "}));
        }
        try{
               const salt = await bcryptjs.genSalt(10);
               const hashpassword = await bcryptjs.hash(req.body.password,salt);
    
               const newuser = new user({
                name:req.body.name,
                email:req.body.email,
                password:hashpassword,
    
    
               });
               await newuser.save();
               return res.status(201).json('New user created');
    
        }
        catch(err){
            console.log(err)
            return next(err)
        }
         
    }

) 
router.get('/login',async(req,res,next)=>{
   if(!req.body.email || !req.body.password){
    return  next(cerror({status:400,message:" password email is required "}));
   }
   try{
           const usery = await user.findOne({email:req.body.email}).select(
          'name email password'       
           )
           if(!usery){
            return  next(cerror({status:404,message:"no user found"}));
           }
           const ispassword = await bcryptjs.compare(req.body.password,usery.password)

               if(!ispassword){
                return  next(cerror({status:400,message:"password is wrong"}));
               }
               const payload = { // check krnee ke liyee aage 
               id:usery._id,
               name:usery.name
               }
               const token = jwt.sign(payload,process.env.JWT_SCERET,{
                expiresIn:'10d'
               })
                    return res.cookie('access_token',token,{
                        httpOnly:true
                    }).status(200).json({message:"login complete"})

   }
   catch(err){
    // console.log(err) 
    return next(err)
   }
})


router.get('/hhp',(req,res)=>{
    return res.json("hhp")
})
export default router; 