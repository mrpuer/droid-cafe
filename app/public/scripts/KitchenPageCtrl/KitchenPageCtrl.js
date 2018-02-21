'use strict';

angular
    .module('cafeApp')
    .controller('KitchenPageCtrl', function(OrdersService, mySocket) {
      var vm = this;
      vm.orders = {};

      mySocket.on('connect', function(socket){
        vm.getAllOrders();
      });
      vm.getAllOrders = function() {
        OrdersService.getAllOrders().then(function(orders) {
          vm.orders = orders.data;
          vm.orders.map(function(order) {
            OrdersService.getMenuItem(order.itemId).then(function(dishData) {
              order.fullInfo = dishData.data[0];
              return order;
            }, function(err) { throw err });
          })
        }, function(err) { throw err });
      };

      vm.addToCooking = function(order) {
        const newData = { 
          _id: order._id,
          change: {
            status: 'Cooking'
          }
        };
        OrdersService.editOrder(newData).then(function(orderNewData) {
          
        }, function(err) { throw err });
      };

      // vm.$onInit = function() {
      //   vm.getAllOrders();
      // };
    });