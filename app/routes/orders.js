const mongoose = require('mongoose');
const db = require('./db');

db.connection();


const orderSchema = mongoose.Schema({
  userId: String,
  itemId: Number,
  status: String,
  timeOrdered: Number,
  timeCooking: Number
});

const Orders = mongoose.model('orders', orderSchema);

// POST
exports.addOrder = (req, res) => {
  const newOrder = new Orders({
    userId: req.body.userId,
    itemId: req.body.itemId,
    status: 'Ordered',
    timeOrdered: req.body.timeOrdered,
    timeCooking: 0
  });
  newOrder.save((err, result) => {
    if (err) throw err;
    res.send(result);
});
};

exports.getClientOrders = (req, res) => {
  const limit = parseInt(req.query.limit);
  const skip = parseInt(req.query.offset);
  Orders.aggregate([
    { $match: { userId: req.params.clientId } },
    { $group: { _id: null, count: { $sum: 1 }, orders: { $push: "$$ROOT" } } },
    { $project: { _id: 0, count: 1, orders: { $slice: [ '$orders' , skip, limit ] } } }
  ], function(err, docs) {
    res.send(docs);
  });
};

exports.getAllOrders = (req, res) => {
  const limit = parseInt(req.query.limit);
  const skip = parseInt(req.query.offset);
  Orders.aggregate([
    { $match: { status: req.params.status } },
    { $group: { _id: null, count: { $sum: 1 }, orders: { $push: "$$ROOT" } } },
    { $project: { _id: 0, count: 1, orders: { $slice: [ '$orders' , skip, limit ] } } }
  ], function(err, docs) {
    res.send(docs);
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