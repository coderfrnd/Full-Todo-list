import User from '../Models/User.js'

export default userinfo = async(req,res,next)=>{
    try{
          const data = await User.findById(req.user.id).select('name email');
          return res.status(200).json(data)
    }
    catch(err){
        return next(err)
    }

}