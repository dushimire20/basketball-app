import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors'
import cookieParser from 'cookie-parser';
dotenv.config();
import { UserRouter } from './routes/user.js';



const app = express()
app.use(express.json())
app.use(cors({
    origin: ['http://localhost:5173'],
    credentials: true
}))
app.use(cookieParser())
app.use('/auth', UserRouter)

mongoose.connect('mongodb+srv://dushimireoscar:tNHV17W6A1KJCJ4G@cluster0.ug6r8.mongodb.net/authentication')

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})