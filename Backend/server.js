import express from 'express';
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js'
import dotenv from "dotenv";
import connectMongoDB from './db/db.js';
import cookieParser from 'cookie-parser';
dotenv.config()
const app = express();
const PORT = process.env.PORT 
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use('/auth', authRoutes)
app.use('/user', userRoutes)
app.get('/', (req, res) => {
res.send('Mujhko pehechano')
})
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
    connectMongoDB();
})