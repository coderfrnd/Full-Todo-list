import express from "express";
import User from '../Models/User.js'
// const app = express()

const router= express.Router()

router.get('/me',async(req,res,next)=>{
    try{
          const data = await User.findById(req.user.id).select('name email');
          return res.status(200).json(data)
    }
    catch(err){
        return next(err)
    }})

    router.put('/update',async(req,res)=>{
        try{
            const updateuser = await User.findByIdAndUpdate(req.user.id,{
                name:req.body.name,
                email:req.body.email
            },
            {new:true}
            ).select('name email');
            return res.status(200).json(updateuser);
        }
        catch(err){
            return next(err)
        }
    })
export default router;