import express from "express";
import cookieParser from "cookie-parser";
import { randomUUID } from "crypto";
import todoRoute from "../src/routes/todoRoutes";
import cors from "cors";

const app = express();

// Enhanced middleware setup
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// Enhanced CORS configuration
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.FRONTEND_URL || "http://localhost:5173"
    : "http://localhost:5173", 
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie']
}));

// Request logging middleware
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.path} - IP: ${req.ip}`);
  next();
});

// Enhanced session management middleware
app.use((req, res, next) => {
  if (!req.cookies.sessionId) {
    const sessionId = randomUUID();
    res.cookie("sessionId", sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
    });
    req.cookies.sessionId = sessionId;
  }
  next();
});

// API routes
app.use("/api/todo", todoRoute);

// Enhanced root endpoint
app.get("/", (req, res) => {
  res.json({
    message: "🚀 Todo API Server",
    version: "2.0.0",
    status: "running",
    timestamp: new Date().toISOString(),
    endpoints: {
      todos: "/api/todo",
      health: "/health",
      docs: "/api/docs"
    }
  });
});

// Enhanced health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// API documentation endpoint
app.get("/api/docs", (req, res) => {
  res.json({
    title: "Todo API Documentation",
    version: "2.0.0",
    endpoints: [
      {
        method: "GET",
        path: "/api/todo",
        description: "Get all todos for the current session",
        response: "Array of todo objects with metadata"
      },
      {
        method: "POST",
        path: "/api/todo",
        description: "Create a new todo",
        body: { task: "string (required, max 500 chars)" },
        response: "Created todo object"
      },
      {
        method: "PATCH",
        path: "/api/todo/:id",
        description: "Toggle todo completion status",
        response: "Updated todo object"
      },
      {
        method: "DELETE",
        path: "/api/todo/:id",
        description: "Delete a specific todo",
        response: "Success message with deleted ID"
      },
      {
        method: "DELETE",
        path: "/api/todo/clear/completed",
        description: "Clear all completed todos",
        response: "Success message with count of deleted todos"
      }
    ]
  });
});

// 404 handler for undefined routes
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    path: req.originalUrl,
    method: req.method,
    timestamp: new Date().toISOString()
  });
});

// Global error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error("Global error handler:", err);
  
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal server error",
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    timestamp: new Date().toISOString()
  });
});

export default app;