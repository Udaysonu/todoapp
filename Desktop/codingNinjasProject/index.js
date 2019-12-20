const express=require('express');
const app=express();
const port=8000;
const path=require('path');
const db=require('./config/mongoose');
const task=require('./models/taskSchema');
app.use(express.static('assets'));

app.use(express.urlencoded())

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.get('/',function(req,res){
    
    task.find({},function(err,tasks){
        return res.render('home',{
            tasks:tasks
        });
    })
   
})
app.post('/create',function(req,res){
     
     task.create(req.body,function(err){
         if(err){
             console.log('Error in creatng task')
         }
     });
    return res.redirect('back')
})
app.post('/delete',function(req,res){
     console.log(req.body)
    for(let i=0; i<req.body.item.length;i++){
    console.log(req.body.item[i],'******')
        task.findByIdAndDelete(req.body.item[i],function(err){
            console.log(req.body.item[i])
            if(err){console.log("Eror in deletig the Task")}
            else{
                console.log('Deleted Task succesfully')
            }
        })
    }
    return res.redirect('back')
})
app.listen(port,function(err){
    if(err){
        console.log('**Error in starting the server**')
    }
    else{
        console.log("**Server Started Succesfully**")
    }
})

