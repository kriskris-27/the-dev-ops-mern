import { Request,Response } from "express";
import Todo from "../models/Todo";

export const getAll =async (req:Request , res:Response) =>{
    const sessionId =req.cookies;
    const todos = await Todo.find({sessionId});
    res.json(todos)
}

export const addTodo = async(req:Request,res:Response) =>{
    const {title} = req.body;
    const {sessionId} = req.cookies;

    const todo = Todo.create({title,iscompletedcompleted:false,sessionId})
    res.json(todo)
}

