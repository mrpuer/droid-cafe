const mongoose = require('mongoose');
const db = require('./db');

db.connection();

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