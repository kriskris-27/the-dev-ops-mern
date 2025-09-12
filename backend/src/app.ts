    import express from "express";
    import cookieParser from "cookie-parser";
    import { randomUUID } from "crypto";
    import todoRoute from "../src/routes/todoRoutes";
    import cors from "cors"

    const app = express();
    app.use(express.json())
    app.use(cookieParser())

    app.use(cors({
      origin: "http://localhost:5173", 
      credentials: true,               
    }));

    app.use((req,res,next)=>{
        if(!req.cookies.sessionId){
            const sessionId = randomUUID();
            res.cookie("sessionId", sessionId, {
                httpOnly:true,
                maxAge:1000*60*60*7
            })
            req.cookies.sessionId=sessionId;
        }
        next();
    })

    app.use("/api/todo",todoRoute);

    app.get("/",(req,res)=>{
        // res.json({message:"Hello world"})
        res.send("hi all!!!")
    })

    export default app;