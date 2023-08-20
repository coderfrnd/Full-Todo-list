import express from "express";
import taskrout from './task.js'
import usery from './User.js'
import autho from './auth.js'
import checkauth from "../Utils/checkauth.js";
// import {requiresignin} from "../Utils/checkauth.js";
// import User from "../Models/User.js";
import  jwt  from "jsonwebtoken";

const router= express.Router()

router.use('/task',checkauth,taskrout);
router.use('/user',checkauth,usery);
router.use('/auth',autho);

export default router