angular
    .module('cafeApp')
    .controller('KitchenPageCtrl', function(OrdersService, MenuService, mySocket, DeliveryService) {
      var vm = this;
      vm.orders = {};

      vm.$onInit = function() {
        vm.getAllOrders();
      };

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

      vm.changeOrderStatus = function(order, status) {
        const newData = { 
          _id: order._id,
          change: {
            status
          }
        };
        OrdersService.editOrder(newData).then(function(orderNewData) {
          mySocket.emit('orderUptated');
        }, function(err) { throw err });
      };

      vm.sendToDelivery = function(order) {
        vm.changeOrderStatus(order, 'Delivering');
        DeliveryService.addNew().then(function(success) {
          console.log(success.data);
          success.data()
            .then(() => {
              console.log('Доставлено');
              vm.changeOrderStatus(order, 'Done');
            })
            .catch(() => {
              console.log('Возникли сложности');
              vm.changeOrderStatus(order, 'Problems');
            });
        }, function (err) { throw err })
      };
    });