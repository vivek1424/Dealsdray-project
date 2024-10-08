import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cloudinary from 'cloudinary'
import authRoutes from './routes/authRoutes.js'
import adminRoutes from './routes/adminRoutes.js'
import connectToMongoDB from './db/connectToMongoDB.js'
import cookieParser from 'cookie-parser'


dotenv.config();
const app = express(); 

connectToMongoDB(); 

app.use(express.json()) 
app.use(express.urlencoded({ extended: true }))

app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:5173',
	credentials: true
  
}))

app.get("/api/test", async(req, res) => {
	res.json( { message: "Hello, this is the index.js file"})
});

app.use("/api", authRoutes);
app.use("/api", adminRoutes);

app.listen(7000, ()=>{
	console.log("server running on port 7000");

})