const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/cafe');
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

const orderSchema = mongoose.Schema({
  userId: String,
  itemId: Number,
  status: String
});

const cafeMenu = mongoose.model('menus', menuSchema);
const Orders = mongoose.model('orders', orderSchema);

// GET
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

// POST
exports.addOrder = (req, res) => {
  const newOrder = new Orders({
    userId: req.body.userId,
    itemId: req.body.itemId,
    status: 'Ordered'
  });
  newOrder.save((err, result) => {
    if (err) throw err;
    res.send(result);
});
};

exports.getClientOrders = (req, res) => {
  Orders.find({userId: req.params.clientId}, (err, orders) => {
    if (err) throw err;
    res.send(orders);
  })
};

exports.getAllOrders = (req, res) => {
  Orders.find({}, (err, orders) => {
    if (err) throw err;
    res.send(orders);
  })
};