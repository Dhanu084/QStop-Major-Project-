const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/Qstop');

const db = mongoose.connection;

db.on('error',console.error.bind(console,'Error in connecting to db'));

db.once('open',()=>{
    console.log('connected to DB');
})

module.exports = db;