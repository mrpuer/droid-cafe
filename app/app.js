const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path')

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const client = require('./routes/client');
//const orders = require('./routes/orders');
const cafeAPIv1 = express.Router();

// client area page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });

// kitchen area page
// ordersApi.get('/kitchen', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'kitchen', 'index.html'));
//   });

// // client REST API
cafeAPIv1.post('/clients', client.addClient);
cafeAPIv1.get('/clients/:email', client.getClient);
// cafeAPIv1.put('/clients/:email', client.editUser);

// // orders REST API
// ordersApi.post('/v1/orders', orders.addNew);
// ordersApi.get('/v1/orders', orders.getAll);
// ordersApi.get('/v1/orders/:email', orders.getOne);
// ordersApi.put('/v1/orders/:email', orders.edit);

app.use('/api/v1', cafeAPIv1);
app.listen(PORT, () => console.log('Server is running...'));

