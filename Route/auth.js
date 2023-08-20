import express from "express";
import bcryptjs from 'bcryptjs'
import user from '../Models/User.js'
import  jwt  from "jsonwebtoken";
// import register from '../Controller/auth.js'
// import {register} from '../Controller/auth.js'
// const app = express()

const router= express.Router()

router.get('/register',async(req,res)=>{
        if(!req.body.name || !req.body.email || !req.body.password ){
            return res.json('required name email and password')
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
            return res.json('server error');
        }
         
    }

) 
router.get('/login',async(req,res)=>{
   if(!req.body.email || !req.body.password){
    return res.json("form fill bro")
   }
   try{
           const usery = await user.findOne({email:req.body.email}).select(
          'name email password'       
           )
           if(!usery){
            return res.status(404).json("no user find")
           }
           const ispassword = await bcryptjs.compare(req.body.password,usery.password)

               if(!ispassword){
                return res.json('password incorrect')
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
    console.log(err)
   }
})


router.get('/hhp',(req,res)=>{
    return res.json("hhp")
})
export default router; 