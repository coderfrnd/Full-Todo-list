import express from "express";
import 'dotenv/config';
import mongoose from "mongoose";
import cors from 'cors'
import morgan from "morgan";
import cookieParser from 'cookie-parser';
// const cookieParser = require('cookie-parser');

import tasky from './Route/index.js'
import User from "./Models/User.js";
// const cookieParser = require("cookie-parser");
const app = express()
const PORT = 4000
//middleware
app.use(cors())
app.use(morgan('tiny'))
app.use(express.json())
app.use(cookieParser())


app.use('/api',tasky)
// app.use('/api',auth)
// app.use('/api',User)

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_CONNECTION_STRING);
        console.log("Connected to MongoDB");
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
        process.exit(1);
    }
}

app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
})
