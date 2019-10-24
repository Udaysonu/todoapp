const express=require('express')
const app=express();
const port=8001;
app.listen(port,function(err){
    if(err){
        console.log('error in setting up server',err);
        return ;
    }
    console.log('Server is running succesfully ..on port ',port);
})