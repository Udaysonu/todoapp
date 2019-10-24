const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/practice_db');
const db=mongoose.connection;
db.once('open',function(){
    console.log('succesfully connected to the database');
});
module.exports=db