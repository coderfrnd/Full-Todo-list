import bcryptjs from 'bcryptjs'
import user from '../Models/User.js'


const register = async(req,res)=>{
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
            return res.json('server error' );
        }
         
    }

export default register;

