import express from 'express';
import { configDotenv } from 'dotenv';
import dbConfig from './config/dbconfig.js';
import cors from 'cors';
import authRouter from './routes/authRoute.js';
import contentRouter from './routes/contentRoute.js';
import financialPostRoute from './routes/financialPostRoute.js';

configDotenv();
const app=express();

//middlewares - dependency injections
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))

//routes
app.use('/api/auth',authRouter)
app.use('/api/content',contentRouter)
app.use('/api/financialPost',financialPostRoute)



const port =process.env.PORT || 5000
app.listen(port, ()=>{
    dbConfig();
    console.log(`server running on ${port}`)
})