const passport=require('passport'); 
const LocalStrategy=require('passport-local').Strategy;
const User=require('../models/userlist');
passport.use(new LocalStrategy({

usernameField:'email'

},
function(email,password,done){
    User.findOne({email:email},function(err,user){
        if(err){
            console.log('Error in finding user--> Passport');
            return done('err');
        }
        if(!user||user.password!=password){
            console.log('INvalid Username/password');
            return done(null,false);
        }
        console.log("passport is working ")
        return done(null,user);
    });
}
));
passport.serializeUser(function(user,done){
    done(null,user.id);
});
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
           return console.log('error in finding the user--->Passport');
        }
        
            return done(null,user)
        
    })
})
passport.checkAuthentication=function(req,res,next){
   //if the user is signed in pass the request to the next funciton
    if(req.isAuthenticated()){
        return next();
    }
    //if the user is not signe in
    return res.redirect('/user/signin');
}
passport.setAuthenticatedUser=function(req,res,next){
    if(req.isAuthenticated()){
        //req.user contains the current signed in user from the session cookie 
        // and we are sending it to the views through locals
        res.local.user=req.user;
    }
    next();
}


module.exports=passport
//serialisze user field function