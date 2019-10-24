const mongoose=require('mongoose');
const user=require('../models/userlist');

module.exports.profile=function(req,res){
    console.log(req.user,'+++++++++++++++++++++++++++++++++++++')
    return res.render('pofile',{
        user:req.user
    })
}
module.exports.signup=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/')
    }
    return res.render('signup',{
        title:'Sign up'
    });
}
module.exports.createId=function(req,res){
    console.log(req.body);
    user.findOne({email:req.body.email},function(err,use){
        if(err){
            console.log('error in creating the user id');
            return res.redirec('back');
        }
        if(!use){
            console.log('checking the exsting user')
            
            if(req.body.password==req.body.retype_password){
                console.log('password and retype password are not equal')
                user.create({
                email:req.body.email,
                name:req.body.name,
                password:req.body.password,
                age:req.body.age,
            },function(err){
                if(err){
                    return console.log('error in creating the userid 2',err);
                }
                console.log('userid created');
            })
            }
        }
    })
}

module.exports.identify=function(req,res){
    // user.findOne({email:req.body.email},function(err,user){
    //     if(err){
    //     return console.log('error in signing in');
    //     }
    //     if(user){
    //         if(user.password!=req.body.password){
    //             return res.redirect('back')
    //         }
    //         res.cookie('user_id',user.id);
    //         return res.redirect('/users/profile');}
    //     else{
    //         return res.redirect('back');
    //     }
        
    // });
    // return res.send('incorrect password or email');
    console.log('entered')
    return res.redirect('/')
}
module.exports.signin=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/')
    }
    // return res.render('signin',{title:'signin'})
    return res.render('signin',{
        title:'hello'
    });
}
module.exports.destroy=function(req,res){
    req.logout();
    return res.redirect('/')
}
