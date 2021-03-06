const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cafeAPIv1 = express.Router();
const path = require('path');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const drone = require('netology-fake-drone-api');

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const client = require('./routes/client');
const orders = require('./routes/orders');
const menu = require('./routes/menu');
const delivery = require('./routes/delivery');

// socket server
io.on('connection', (socket) => {
  console.log('user connected');
  socket.on('orderUptated', function() {
    console.log('Server receive update order event!');
    io.emit('orderUptated');
  });
  socket.on('newOrder', function(price) {
    io.emit('newOrder', price);
  });
});

// client area page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// kitchen area page
app.get('/kitchen', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// // client REST API
cafeAPIv1.post('/clients', client.addClient);
cafeAPIv1.get('/clients/:email', client.getClient);
cafeAPIv1.put('/clients/:email', client.editClient);

// orders REST API
cafeAPIv1.post('/orders', orders.addOrder);
cafeAPIv1.get('/orders/:status', orders.getAllOrders);
cafeAPIv1.get('/orders/users/:clientId', orders.getClientOrders);
cafeAPIv1.put('/orders/:id', orders.editOrder);
cafeAPIv1.delete('/orders/:id', orders.removeOrder);

// menu REST API
cafeAPIv1.get('/menu', menu.getMenu);
cafeAPIv1.get('/menu/:dish', menu.getMenuItem);

// delivery API
cafeAPIv1.get('/delivery', delivery.addNew);


app.use('/api/v1', cafeAPIv1);
http.listen(PORT, () => console.log('Server is running...'));

