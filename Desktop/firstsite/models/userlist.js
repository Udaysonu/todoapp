const mongoose=require('mongoose');
const schema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    age:{
        type:String,
        required:true,
    }
},function(err){
    if(err){
        console.log('error in creating scheema')
    }
})
const list=mongoose.model('contact',schema);
module.exports=list;