const mongoose = require('mongoose');

exports.connection = () => {
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://heroku_5sn59lz3:ek32fopuq199gp113qf24glkt1@ds145438.mlab.com:45438/heroku_5sn59lz3');
    // mongoose.connect('mongodb://localhost:27017/cafe');
    const db = mongoose.connection;

    db.on('error', console.error.bind(console, 'DB connection error!'));
    db.once('open', function() {
    console.log('DB connection open...');
    });
};