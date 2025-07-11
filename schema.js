import mongoose  from "mongoose";

const todoSchema = new mongoose.Schema({
    todo:{
        type : String,
        required : true,
    },
    createdAt:{
        type: Date,
        default: Date.now,
    }
})

const TodoData = mongoose.model("todoData", todoSchema);

export default TodoData;    
