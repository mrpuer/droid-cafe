const mongoose = require('mongoose');
const db = require('./db');

db.connection();


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

exports.removeOrder = (req, res) => {
  Orders.deleteOne({ _id: req.params.id },  (err, newData) => {
    if (err) throw err;
    res.send(newData);
  });
};