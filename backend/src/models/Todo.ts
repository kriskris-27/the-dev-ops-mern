import mongoose,{Document,Schema} from "mongoose";

export interface ITodo extends Document {
    task:string,
    iscompleted:boolean
    sessionId:string
} 

export const TodoSchema : Schema = new Schema({
  task: { type: String, required: true },
  iscompleted: { type: Boolean, default: false },  // ✅ default instead of required
  sessionId: { type: String, required: true },
})

export default mongoose.model<ITodo>("Todo",TodoSchema);
