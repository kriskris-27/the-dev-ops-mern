import express from "express";

const app = express();

app.use(express.json())

app.get("/",(req,res)=>{
    // res.json({message:"Hello world"})
    res.send("hi all!!!")
})

export default app;