const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const http = require('http').Server(app);
const io = require('socket.io')(http);

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const client = require('./routes/client');
const orders = require('./routes/orders');
const cafeAPIv1 = express.Router();

// io.on('connection', (socket) => {
//   console.log('user connected');
//   socket.on('disconnect', () => {
//     console.log('user dsconnected');
//   });
// });

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
cafeAPIv1.get('/menu', orders.getMenu);
cafeAPIv1.get('/menu/:dish', orders.getMenuItem);
cafeAPIv1.post('/orders', orders.addOrder);
cafeAPIv1.get('/orders/', orders.getAllOrders);
cafeAPIv1.get('/orders/:clientId', orders.getClientOrders);

app.use('/api/v1', cafeAPIv1);
http.listen(PORT, () => console.log('Server is running...'));

