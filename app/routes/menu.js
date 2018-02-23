const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://heroku_5sn59lz3:ek32fopuq199gp113qf24glkt1@ds145438.mlab.com:45438/heroku_5sn59lz3');
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'DB connection error!'));
db.once('open', function() {
  console.log('DB connection open...');
});

const menuSchema = mongoose.Schema({
    title: String,
    image: String,
    id: Number,
    rating: Number,
    ingredients: Array,
    price: Number
});

const cafeMenu = mongoose.model('menus', menuSchema);

exports.getMenu = (req, res) => {
  cafeMenu.find({}, (err, allMenu) => {
    if (err) throw err;
    res.send(allMenu);
});
};

exports.getMenuItem = (req, res) => {
  cafeMenu.find({id: req.params.dish}, (err, dish) => {
    if (err) throw err;
    res.send(dish);
  });
};