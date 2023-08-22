import express from "express";
import Task from '../Models/Task.js'
import cerroe from '../Utils/error.js'
// const app = express()

const router= express.Router()

router.get('/',async(req,res,next)=>{
   try {
    const newTask = new Task({
        title:req.body.title,
        user:req.user.id,
        completed:req.body.completed
    });
    const saveTask =await newTask.save();
    return res.status(201).json(saveTask)
   } catch (error) {
   return next(error)
   }
})
router.get('/all',async(req,res,next)=>{
    try {
     const task = await Task.find({});
     return res.status(200).json(task);
    }
    catch(err){
return next(err)
    }
 })
 router.get('/mytask',async(req,res,next)=>{
    try {
     const task = await Task.find({user:req.user.id});
     return res.status(200).json(task);
    }
    catch(err){
return next(err)
    }
 })

 router.put('/:taskid',async(req,res,next)=>{
    try {
        const task= await Task.findById(req.params.taskid).exec();
        if(!task){
            return next(cerroe({status:404,message:'No task founded'}));
        }
        const updatetask = await Task.findByIdAndUpdate(req.params.taskid,{
            title:req.body.title,
            completed:req.body.completed,
        },{new:true})
        return res.status(200).json(updatetask)
        
    } catch (error) {
        return next(error);
        
    }
 })
 router.delete('/:taskid',async(req,res,next)=>{
    try {
        const task= await Task.findById(req.params.taskid).exec();
        if(!task){
            return next(cerroe({status:404,message:'No task found'}));
        }
        await Task.findByIdAndDelete(req.params.taskid);
        return res.status(200).json('task delete succesfully')
        
    } catch (error) {
        return next(error)
    }
 })
export default router;