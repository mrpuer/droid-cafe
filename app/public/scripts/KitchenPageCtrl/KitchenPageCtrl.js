angular
    .module('cafeApp')
    .controller('KitchenPageCtrl', function(OrdersService, MenuService, mySocket) {
      var vm = this;
      vm.orders = {};

      mySocket.on('connect', function(){
        vm.getAllOrders();
      });
      mySocket.on('orderUptated', function(){
        vm.getAllOrders();
      });
      vm.getAllOrders = function() {
        OrdersService.getAllOrders().then(function(orders) {
          vm.orders = orders.data;
          vm.orders.map(function(order) {
            MenuService.getMenuItem(order.itemId).then(function(dishData) {
              order.fullInfo = dishData.data[0];
              return order;
            }, function(err) { throw err });
          })
        }, function(err) { throw err });
      };

      vm.addToCooking = function(order, status) {
        const newData = { 
          _id: order._id,
          change: {
            status
          }
        };
        OrdersService.editOrder(newData).then(function(orderNewData) {
          vm.getAllOrders();
          mySocket.emit('orderUptated');
        }, function(err) { throw err });
      };

      // vm.$onInit = function() {
      //   vm.getAllOrders();
      // };
    });