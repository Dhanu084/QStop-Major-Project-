const bcrypt = require('bcrypt');
const User = require('../models/users');
const fs = require('fs');
const path = require('path');

module.exports.signin = (req,res) =>{
    if(req.isAuthenticated()){
        res.redirect('/');
    }   
    res.render('signin.ejs',{
        title:"Signin"
    });
}

module.exports.signup = (req,res) =>{
    res.render('signup.ejs',{
        title:"Signup"
    });
}

module.exports.createUser = async function(req,res){
    if(req.isAuthenticated()){
        res.redirect('/');
    }
    //console.log(req.body.password == req.body.confirm_password);
    try{
        
        req.body.password = bcrypt.hashSync(req.body.password,10);
        await User.create({
            Username:req.body.name,
            email:req.body.email,
            password:req.body.password
        });
        //req.flash('success',req.body.email+'signed up successfully');
        res.redirect('/user/signin');
    }
    catch(err){
        //req.flash('error','user already exist');
        console.log(err);
        return res.redirect('back');
    }
    
    
}

module.exports.createSession = function(req,res){
    //req.flash('success','logged in successfully');
    res.redirect('/');
}

module.exports.signout = function(req,res){
    req.logout();
    res.redirect('/')
}

module.exports.updateUser = async function(req,res){
    console.log(req.params);
    console.log(req.user.id,req.user.id)
    if(req.user.id!=req.params.id) res.redirect('back');
    try{
        //console.log(await User.findById(req.user.id));
        let user = await User.findById(req.params.id);
        //console.log("user:",user);
        User.uploadedAvatar(req,res,function(err){
            if(err){
                console.log("Multer error",err);
                return;
            }
            user.Username = req.body.Username;
            user.password = req.body.password;
            user.email = req.body.email;
            user.designation = req.body.designation;
            if(req.file){

                if(user.avatar){
                    fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                }
                user.avatar = User.avatarPath+'/'+req.file.filename;
            }
            user.save();
            return res.redirect('back');
        });

    }
    catch(err){
        console.log(err);
        res.redirect('back');
    }
}

module.exports.profile = function(req,res){
    res.render('profile_update.ejs',{
        title:"profile"
    })
}