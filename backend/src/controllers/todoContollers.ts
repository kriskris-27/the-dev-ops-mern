import { Request, Response } from "express";
import Todo from "../models/Todo";

// Enhanced response helper
const sendResponse = (res: Response, statusCode: number, data: any, message?: string) => {
  return res.status(statusCode).json({
    success: statusCode < 400,
    message: message || (statusCode < 400 ? "Success" : "Error"),
    data: data,
    timestamp: new Date().toISOString()
  });
};

export const getAll = async (req: Request, res: Response) => {
  try {
    const sessionId = req.cookies.sessionId;
    
    if (!sessionId) {
      return sendResponse(res, 400, null, "Session ID is required");
    }

    const todos = await Todo.find({ sessionId }).sort({ createdAt: -1 });
    
    sendResponse(res, 200, {
      todos,
      count: todos.length,
      completed: todos.filter(t => t.iscompleted).length,
      pending: todos.filter(t => !t.iscompleted).length
    }, "Todos retrieved successfully");
  } catch (error) {
    console.error("Error fetching todos:", error);
    sendResponse(res, 500, null, "Internal server error while fetching todos");
  }
};

export const addTodo = async (req: Request, res: Response) => {
  try {
    const { task } = req.body;
    const sessionId = req.cookies.sessionId;

    // Enhanced validation
    if (!sessionId) {
      return sendResponse(res, 400, null, "Session ID is required");
    }

    if (!task || typeof task !== 'string') {
      return sendResponse(res, 400, null, "Task is required and must be a string");
    }

    if (task.trim().length === 0) {
      return sendResponse(res, 400, null, "Task cannot be empty");
    }

    if (task.trim().length > 500) {
      return sendResponse(res, 400, null, "Task cannot exceed 500 characters");
    }

    const todo = await Todo.create({ 
      task: task.trim(), 
      sessionId,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    sendResponse(res, 201, todo, "Todo created successfully");
  } catch (error) {
    console.error("Error creating todo:", error);
    sendResponse(res, 500, null, "Internal server error while creating todo");
  }
};

export const toggleTodo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const sessionId = req.cookies.sessionId;

    if (!sessionId) {
      return sendResponse(res, 400, null, "Session ID is required");
    }

    if (!id || id.length !== 24) {
      return sendResponse(res, 400, null, "Invalid todo ID format");
    }

    const todo = await Todo.findOne({ _id: id, sessionId });

    if (!todo) {
      return sendResponse(res, 404, null, "Todo not found or access denied");
    }

    todo.iscompleted = !todo.iscompleted;
    todo.updatedAt = new Date();
    await todo.save();

    sendResponse(res, 200, todo, `Todo marked as ${todo.iscompleted ? 'completed' : 'pending'}`);
  } catch (error) {
    console.error("Error toggling todo:", error);
    sendResponse(res, 500, null, "Internal server error while updating todo");
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const sessionId = req.cookies.sessionId;

    if (!sessionId) {
      return sendResponse(res, 400, null, "Session ID is required");
    }

    if (!id || id.length !== 24) {
      return sendResponse(res, 400, null, "Invalid todo ID format");
    }

    const todo = await Todo.findOneAndDelete({ _id: id, sessionId });

    if (!todo) {
      return sendResponse(res, 404, null, "Todo not found or access denied");
    }

    sendResponse(res, 200, { deletedId: id }, "Todo deleted successfully");
  } catch (error) {
    console.error("Error deleting todo:", error);
    sendResponse(res, 500, null, "Internal server error while deleting todo");
  }
};

// New endpoint for bulk operations
export const clearCompleted = async (req: Request, res: Response) => {
  try {
    const sessionId = req.cookies.sessionId;

    if (!sessionId) {
      return sendResponse(res, 400, null, "Session ID is required");
    }

    const result = await Todo.deleteMany({ sessionId, iscompleted: true });
    
    sendResponse(res, 200, { deletedCount: result.deletedCount }, "Completed todos cleared successfully");
  } catch (error) {
    console.error("Error clearing completed todos:", error);
    sendResponse(res, 500, null, "Internal server error while clearing completed todos");
  }
};