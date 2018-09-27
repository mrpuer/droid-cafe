# Drone Cafe AngularJS application

Graduation project for the Netology.ru course _"Node, AngularJS and MongoDB: development of full-fledged web applications"_.

**Demo:**
* [User](https://dron-cafe.herokuapp.com)
* [Kitchen](https://dron-cafe.herokuapp.com/kitchen)

**Server Side:**
* `app/app.js` - server side to run on Node.js  
* `app/routes/` - API requests handlers  

**Client Side:**
* `app/public/scripts/app.js` - angular module main file  
* `app/public/scripts/deps/` - dependent modules  
* `app/public/scripts/ClientPageCtrl/` - Main client page controller  
* `app/public/scripts/KitchenPageCtrl/` - Main kitchen page controller  

**Using:**
+ Add new MongoDB database `cafe` with `clients`, `menus` and `orders` collections.
+ Run `mongod`
+ Run `npm start`
+ Go to `http://localhost:3000/`

**User Area Features:**
1. User authorization with Name and email
2. User can add balance to the account.
2. User can order dishes from menu. His balance is adjusted.
3. User can view his orders in _Orders List_ with cooking time and _Status_ to each order.
3. Orders statuses - Ordered, Cooking, Delivering, Done, Error.
3. User get notifications if order status is changed.

**Kitchen Area Features:**
1. Ordered dishes list.
1. Cooking dishes list.
1. Chef can change oerder status to _Start Cooking_ and _Dish Done_.

**Used tools:**
+ NodeJS
+ AngularJS
+ Express
+ MongoDB
+ Mongoose
+ JQuery
+ Material-UI
+ Materialize
+ Socket.io
+ Chai/Karma/Mocha/Sinon
+ Bower
