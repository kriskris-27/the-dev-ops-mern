import mongoose,{Document,Schema} from "mongoose";

export interface ITodo extends Document {
    id:string,
    task:string,
    iscompleted:boolean
    sessionId:string
} 

export const TodoSchema : Schema = new Schema({
    id:{type:String,required:true},
    task:{type:String,required:true},
    iscompleted:{type:Boolean,required:true},
    sessionId:{type:String,required:true}
})

export default mongoose.model<ITodo>("TOdo",TodoSchema);