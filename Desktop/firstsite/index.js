const express=require('express');
const port=8001;
const app=express();
const path=require('path');
const cookieParser=require('cookie-parser')
const session=require('express-session');
const db=require('./config/mongoose');
const passport=require('passport');
const passportLocal=require('./config/passport_local_strategy');
app.use(passport.setAuthenticatedUser)
const sassMiddleware=require('node-sass-middleware')
app.use(express.static('./assets'));
const MongoStore=require('connect-mongo')(session);
const expressLayouts=require('express-ejs-layouts');
app.use(expressLayouts)
app.use(express.urlencoded())
app.use(cookieParser())
app.use(sassMiddleware({
    src:'/assets/scss',
    dest:'/assets/css',
    debug:true,
    outputStyle:'extended',
    prefix:'/css'
}))
// app.use(express.urlencoded());
app.use(passport.setAuthenticatedUser)

app.use(session({
    name:'codeial',
    //TODO change the secret before deployment in production mode
    secret:'blahblahblah',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store:new MongoStore({
        mongooseConnection:db,
        autoRemove:'disabled'
    },function(err){
        console.log(err||'connect-mongodb setup ok')
    })
}));
app.use(passport.initialize());
app.use(passport.session());


app.set('view engine','ejs');
app.set('views',path.join(__dirname,'/views'));
app.use('/',require('./router/index'));
app.listen(port,function(err){
    if(err){
        console.log('Error in listinging');
        return  ;  }
        console.log('Server is listening')
});
