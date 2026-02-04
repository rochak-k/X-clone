import express from 'express';
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js'
import postRoutes from './routes/post.routes.js'
import notificationRoutes from './routes/notification.routes.js'
import dotenv from "dotenv";
import connectMongoDB from './db/db.js';
import cookieParser from 'cookie-parser';
import { v2 as cloudinary } from 'cloudinary';
dotenv.config();
cloudinary.config({
    api_name : process.env.Cloudinary_Cloud_Name,
    api_key : process.env.Cloudinary_API_Key,
    api_secret : process.env.Cloudinary_API_Secret,
});
const app = express();
const PORT = process.env.PORT 
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/post', postRoutes)
app.use('/api/notification',notificationRoutes)
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
    connectMongoDB();
})