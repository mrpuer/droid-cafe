'use strict';

angular
    .module('cafeApp')
    .controller('KitchenPageCtrl', function(OrdersService, mySocket, $scope) {
      var vm = this;
      vm.orders = {};

      $scope.$on('connection', function(socket){
        return alert('user connected');
      });
      mySocket.on('testing', function(socket){
        return alert('testing emit');
      });
      mySocket.on('connection', function(socket){
        return alert('testing emit');
      });
      vm.getAllOrders = function() {
        mySocket.emit('testing');
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

      vm.$onInit = function() {
        vm.getAllOrders();
      };
    });