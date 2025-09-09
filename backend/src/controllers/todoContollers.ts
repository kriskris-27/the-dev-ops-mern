import { Request,Response } from "express";
import Todo from "../models/Todo";

export const getAll =async (req:Request , res:Response) =>{
    const sessionId = req.cookies.sessionId;
    const todos = await Todo.find({sessionId});
    res.json(todos)
}

export const addTodo = async (req: Request, res: Response) => {
  const { task} = req.body;
  const sessionId = req.cookies.sessionId;
  if(!task) return res.status(404).json({msg:"No task is received"})

  const todo = await Todo.create({ task, sessionId });
  res.json(todo);
};


export const toggleTodo  = async(req:Request,res:Response) =>{
    const {id} = req.params
    const todo  = await Todo.findById(id);

    if(!todo) return res.status(404).json({msg:"Todo not found"});

    todo.iscompleted = !todo.iscompleted;
    await todo.save()

    res.json(todo)
}

export const deleteTodo = async(req:Request,res:Response) =>{
    const {id} = req.params;
    await Todo.findByIdAndDelete(id);
    res.json({message:"Todo deleted"});
}