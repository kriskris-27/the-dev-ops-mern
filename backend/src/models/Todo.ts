import mongoose, { Document, Schema } from "mongoose";

export interface ITodo extends Document {
    task: string;
    iscompleted: boolean;
    sessionId: string;
    createdAt: Date;
    updatedAt: Date;
} 

export const TodoSchema: Schema = new Schema({
  task: { 
    type: String, 
    required: [true, "Task is required"],
    trim: true,
    maxlength: [500, "Task cannot exceed 500 characters"],
    minlength: [1, "Task cannot be empty"]
  },
  iscompleted: { 
    type: Boolean, 
    default: false 
  },
  sessionId: { 
    type: String, 
    required: [true, "Session ID is required"] 
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true, // This will automatically manage createdAt and updatedAt
  versionKey: false // Disable __v field
});

// Index for better query performance
TodoSchema.index({ sessionId: 1, createdAt: -1 });
TodoSchema.index({ sessionId: 1, iscompleted: 1 });

export default mongoose.model<ITodo>("Todo", TodoSchema);
