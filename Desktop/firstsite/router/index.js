const express=require('express');
const router=express.Router();
const postCntroller=require('../controllers/post_controller');
const createpost=require('../models/post')

const passport=require('passport');
const userController=require('../controllers/user_controller');
router.get('/',function(req,res){
//    createpost.find({},function(err,posts){
//        console.log(posts,'*************')
//     return res.render('home',{user:req.user,
//         posts:posts
//     });
//    })
createpost.find({}).populate('contacts').exec(function(err,posts){
           console.log(posts,'*************')
        return res.render('home',{user:req.user,
            posts:posts})})
  

    
});
router.post('/users/createpost',postCntroller.createPost)
router.get('/users/profile',passport.checkAuthentication,userController.profile);
router.get('/users/signup',userController.signup);
router.post('/create-id',userController.createId);
// router.post('/identify-id', userController.identify);
router.get('/users/destroy',userController.destroy)
router.get('/users/signin',userController.signin);
router.post('/users/id',passport.authenticate('local',{failureRedirect:'/users/signin'}) ,userController.identify)
module.exports=router
