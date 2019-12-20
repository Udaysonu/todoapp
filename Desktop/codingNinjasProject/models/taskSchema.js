const mongoose=require('mongoose')
var taskSchema = new mongoose.Schema({
    description:{
    type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true
    }}
    ,{
        timestamps:true
    }
);


var tasks = mongoose.model('Tasks', taskSchema);
module.exports=tasks