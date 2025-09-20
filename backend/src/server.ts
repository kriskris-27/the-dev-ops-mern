import app from "./app";
import { config } from "./config/env";
import { connectDB } from "./config/db";

const startServer = async () => {
  try {
    console.log("🚀 Starting Todo API Server...");
    console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
    
    // Connect to database
    console.log("🔌 Connecting to MongoDB...");
    await connectDB();
    
    // Start server
    const server = app.listen(config.PORT, () => {
      console.log("✅ Server started successfully!");
      console.log(`🌐 Server running on: http://localhost:${config.PORT}`);
      console.log(`📚 API Documentation: http://localhost:${config.PORT}/api/docs`);
      console.log(`❤️  Health Check: http://localhost:${config.PORT}/health`);
      console.log("📝 Available endpoints:");
      console.log("   GET    /api/todo - Get all todos");
      console.log("   POST   /api/todo - Create new todo");
      console.log("   PATCH  /api/todo/:id - Toggle todo status");
      console.log("   DELETE /api/todo/:id - Delete todo");
      console.log("   DELETE /api/todo/clear/completed - Clear completed todos");
    });

    // Graceful shutdown handling
    const gracefulShutdown = (signal: string) => {
      console.log(`\n🛑 Received ${signal}. Starting graceful shutdown...`);
      
      server.close((err) => {
        if (err) {
          console.error("❌ Error during server shutdown:", err);
          process.exit(1);
        }
        
        console.log("✅ Server closed successfully");
        console.log("👋 Goodbye!");
        process.exit(0);
      });
    };

    // Handle shutdown signals
    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));

    // Handle uncaught exceptions
    process.on('uncaughtException', (error) => {
      console.error("💥 Uncaught Exception:", error);
      process.exit(1);
    });

    // Handle unhandled promise rejections
    process.on('unhandledRejection', (reason, promise) => {
      console.error("💥 Unhandled Rejection at:", promise, "reason:", reason);
      process.exit(1);
    });

  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

startServer();