import express from "express";

// const app = express()

const router= express.Router()

router.get('/hello',(req,res)=>{
    res.json("hello")
})
export default router;