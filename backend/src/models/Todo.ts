import mongoose, { Document,Schema } from "mongoose";

export interface ITodo extends Document {
    todo_id : string,
    task : string,
    iscompleted : boolean
}

const TodoSchema : Schema = new Schema({
    todo_id : {type:String , required:true},
    task:{type:String , required:true},
    iscompleted:{type:Boolean , required:true}
})

export default mongoose.model<ITodo>('Todo',TodoSchema)