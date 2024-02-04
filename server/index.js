import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import usersRouter from "./routes/users.js";
import questionsRouter from "./routes/Questions.js";
import answerRouter from './routes/Answers.js'

const app =express()
app.use(express.json({limit:"30mb",extended:true}))
app.use(express.urlencoded({limit:'30mb',extended:true}))
app.use(cors());

app.get('/',(req,res)=>{
    res.send(" hiii ");
    
})

app.use('/users',usersRouter)
app.use('/questions',questionsRouter)
app.use('/answer',answerRouter)

const PORT  = process.env.PORT || 5000
const CNNECTION_URL ="mongodb+srv://1234:1234@stack-overflow-clone.btqtgoe.mongodb.net/"
mongoose.connect(CNNECTION_URL)
.then(()=>app.listen(PORT, ()=>{console.log(`server running on port ${PORT}`)}))
.catch((err) => console.log(err.message))