const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://heroku_5sn59lz3:ek32fopuq199gp113qf24glkt1@ds145438.mlab.com:45438/heroku_5sn59lz3');
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'DB connection error!'));
db.once('open', function() {
  console.log('DB connection open...');
});

const orderSchema = mongoose.Schema({
  userId: String,
  itemId: Number,
  status: String
});

const Orders = mongoose.model('orders', orderSchema);

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
  });
};

exports.getAllOrders = (req, res) => {
  Orders.find({}, (err, orders) => {
    if (err) throw err;
    res.send(orders);
  });
};

exports.editOrder = (req, res) => {
  Orders.updateOne({ _id: req.params.id }, { $set: req.body.change },  (err, newData) => {
    if (err) throw err;
    res.send(newData);
  });
};