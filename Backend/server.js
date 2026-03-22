import express from 'express';
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js'
import postRoutes from './routes/post.routes.js'
import notificationRoutes from './routes/notification.routes.js'
import dotenv from "dotenv";
import connectMongoDB from './db/db.js';
import cookieParser from 'cookie-parser';
import { v2 as cloudinary } from 'cloudinary';
import path from 'path';
dotenv.config();
cloudinary.config({
    api_name : process.env.Cloudinary_Cloud_Name,
    api_key : process.env.Cloudinary_API_Key,
    api_secret : process.env.Cloudinary_API_Secret,
});
const app = express();
const PORT = process.env.PORT 
const __dirname = path.resolve()
app.use(express.json({limit :"5mb"}));
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/post', postRoutes)
app.use('/api/notification',notificationRoutes)
if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "Frontend/dist"))) 
   app.get(/.*/, (req,res) => {
    res.sendFile(path.join(__dirname, "Frontend" , "dist" , "index.html"))
})
}
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
    connectMongoDB();
})