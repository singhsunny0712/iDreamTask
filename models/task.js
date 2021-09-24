const mongoose=require('mongoose');
const {ObjectId}=mongoose.Schema.Types;


const taskSchema=new mongoose.Schema({
    userid:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    discription:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    }
})

mongoose.model("Task",taskSchema);