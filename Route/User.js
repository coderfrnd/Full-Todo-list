import express from "express";

// const app = express()

const router= express.Router()

router.get('/user',(req,res)=>{
    res.json("hllo")
})
export default router;