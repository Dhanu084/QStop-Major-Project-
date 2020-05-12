const express = require('express');
const app = express();
const port = 8000;
const mongoose = require('mongoose');
const db = require('./config/mongoose');
const bcrypt = require('bcrypt');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy'); 
const mongoStore = require('connect-mongo')(session);
const bodyParser = require('body-parser');

app.use(express.urlencoded());

app.use(express.static('./assets'));
app.use('/uploads',express.static(__dirname+'/uploads'));
app.use(expressLayouts);
//extract style and scripts from sub-pages
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);
app.set('view engine','ejs');
app.set('views','./views');

app.use(session({
    name:'authenticate',
    secret:'blahsomething',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store:new mongoStore({
            mongooseConnection : db,
            autoRemove:'disabled'
    },function(err){
        console.log(err || 'connect-mongodb setup ok');
    })
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);





app.use('/',require('./routes'));

app.listen(port,() =>{
    console.log("Server running on port",port);
})