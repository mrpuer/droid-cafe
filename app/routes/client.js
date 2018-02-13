const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/cafe');
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'DB connection error!'));
db.once('open', function() {
  console.log('DB connection open...');
});

const clientsSchema = mongoose.Schema({
    name: String,
    email: String,
    balance: Number,
    orders: Array
});

const Clients = mongoose.model('clients', clientsSchema);

// GET existing
exports.getClient = (req, res) => {
    console.log(req.params);
    Clients.find({ email: req.params.email}, (err, user) => {
        if (err) throw err;
        res.send(user);
    });
};

// POST add
exports.addClient = (req, res) => {
    const newClient = new Clients({ 
        name: req.body.name,
        email: req.body.email,
        balance: 100,
        orders: []
    });
    newClient.save((err, newClient) => {
        if (err) {
            throw err;
        } else {
            res.send(newClient);
        }
    });
};

exports.editClient = (req, res) => {
      
};