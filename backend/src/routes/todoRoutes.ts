import express from "express";
import { addTodo, deleteTodo, getAll, toggleTodo, clearCompleted } from "../controllers/todoContollers";

const router = express.Router();

// GET /api/todo - Get all todos for the session
router.get("/", getAll);

// POST /api/todo - Create a new todo
router.post("/", addTodo);

// PATCH /api/todo/:id - Toggle todo completion status
router.patch("/:id", toggleTodo);

// DELETE /api/todo/:id - Delete a specific todo
router.delete("/:id", deleteTodo);

// DELETE /api/todo/clear/completed - Clear all completed todos
router.delete("/clear/completed", clearCompleted);

export default router;