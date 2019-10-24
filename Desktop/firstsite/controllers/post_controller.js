const createpost=require('../models/post')

module.exports.createPost=function(req,res){
    
        createpost.create({
            content:req.body.content,
            users:req.user._id
        },function(err,post){
            if(err){
                console.log('Error in creating the post');
               
            }
             console.log('Post created succesfully');
             return res.redirect('back');
        })
    
}