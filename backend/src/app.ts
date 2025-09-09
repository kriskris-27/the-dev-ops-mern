import express from "express";
import cookieParser from "cookie-parser"
import {v4 as uuid} from "uuid"
const app = express();

app.use(express.json())
app.use(cookieParser())

app.use((req,res,next)=>{
    if(!req.cookies.sessionId){
        const sessionId = uuid();
        res.cookie("session_Id", sessionId, {
            httpOnly:true,
            maxAge:1000*60*60*7
        })
        req.cookies.sessionId=sessionId;
    }
    next();
})

app

app.get("/",(req,res)=>{
    // res.json({message:"Hello world"})
    res.send("hi all!!!")
})

export default app;