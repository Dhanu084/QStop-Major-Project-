const passport = require('passport');
const User = require('../models/users');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

//authentication using passport
passport.use(new LocalStrategy({
    usernameField:'email',
    passReqToCallback:true
    },
    function(req,email,password,done){
        //find user and establish identity

        User.findOne({email:email},function(err,user){

            if(err){
                req.flash('error',email+'not found');
                return done(err);
            }
            
            if(!bcrypt.compareSync(password,user.password)){
                //req.flash('error','Invalid user/password');
                return done(null,false);
            }

            return done(null,user);
        })
    }
));


//serializing  the user to be kept in the cookies
passport.serializeUser(function(user,done){
    done(null,user.id);
});

//deserialize the user from the cookie
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log('User not found');
            return done(err);
        }
        //console.log("After deserializing",user);
        return done(null,user);
    });
});

//check if the user is authenticated
passport.checkAuthetication = function(req,res,next){
    //console.log(req.isAuthenticated());
    if(req.isAuthenticated()){
        return next();
    }
    else
    return res.redirect('/user/signin');
}

passport.setAuthenticatedUser = function(req,res,next){
    
    if(req.isAuthenticated()){
        //req.user contains the current signed in user
        //console.log("check user",req.user);
        res.locals.user = req.user;//sending it to locals to display in views
    }
    next();
}

module.exports = passport;