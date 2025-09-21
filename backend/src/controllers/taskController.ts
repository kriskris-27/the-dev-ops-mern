import { Request, Response, NextFunction } from 'express';
import Task, { ITask } from '../models/Task';
import { AppError } from '../middleware/errorHandler';

// @desc    Get all tasks
// @route   GET /api/tasks
// @access  Public
export const getTasks = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const tasks = await Task.find().populate('user', 'name email');
    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single task
// @route   GET /api/tasks/:id
// @access  Public
export const getTaskById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const task = await Task.findById(req.params.id).populate('user', 'name email');
    
    if (!task) {
      const error: AppError = new Error('Task not found');
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new task
// @route   POST /api/tasks
// @access  Public
export const createTask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const task = await Task.create(req.body);
    
    res.status(201).json({
      success: true,
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update task
// @route   PUT /api/tasks/:id
// @access  Public
export const updateTask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate('user', 'name email');

    if (!task) {
      const error: AppError = new Error('Task not found');
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete task
// @route   DELETE /api/tasks/:id
// @access  Public
export const deleteTask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      const error: AppError = new Error('Task not found');
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      message: 'Task deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get tasks by user
// @route   GET /api/tasks/user/:userId
// @access  Public
export const getTasksByUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const tasks = await Task.find({ user: req.params.userId }).populate('user', 'name email');
    
    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks,
    });
  } catch (error) {
    next(error);
  }
};
