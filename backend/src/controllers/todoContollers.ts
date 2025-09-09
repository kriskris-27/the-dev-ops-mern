import { Request,Response } from "express";
import Todo from "../models/Todo";

export const getAll =async (req:Request , res:Response) =>{
    const sessionId =req.cookies;
    const todos = await Todo.find({sessionId});
    res.json(todos)
}
