import mongoose from 'mongoose';
const {Schema} = mongoose;
const userschema = new Schema({
   
    name:{
        // name:String
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
     
    password:{
        // name:String
        type:String,
        required:true,
    },
   
},{timestamps:true})
export default mongoose.model('User',userschema);