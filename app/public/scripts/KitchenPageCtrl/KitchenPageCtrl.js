angular
    .module('cafeApp')
    .controller('KitchenPageCtrl', function(OrdersService, MenuService, mySocket, DeliveryService, $timeout) {
      var vm = this;
      vm.ordered = {};
      vm.cooking = {};
      vm.orderedLoader = true;
      vm.cookingLoader = true;
      vm.pagination = {
        page: 1,
        perPage: 5
      }

      vm.$onInit = function() {
        vm.getOrdered(vm.pagination);
        vm.getCooking(vm.pagination);
      };

      mySocket.on('orderUptated', function(){
        vm.getOrdered(vm.pagination);
        vm.getCooking(vm.pagination);
      });
      mySocket.on('newOrder', function(){
        vm.getOrdered(vm.pagination);
        vm.getCooking(vm.pagination);
        Materialize.toast(`New order is added!`, 10000, 'rounded');
      });

      vm.getOrdered = function(pageConf) {
        OrdersService.getAllOrders(pageConf, 'Ordered').then(function(success) {
          vm.orderedLoader = false;
          if (success.data.length) {
            vm.ordered = success.data[0];
            vm.ordered.orders.map(function(order) {
              MenuService.getMenuItem(order.itemId).then(function(dishData) {
                order.fullInfo = dishData.data[0];
                return order;
              }, function(err) { throw err });
            })
          };
        }, function(err) { throw err });
      };

      vm.getCooking = function(pageConf) {
        OrdersService.getAllOrders(pageConf, 'Cooking').then(function(success) {
          vm.cookingLoader = false;
          if (success.data.length) {
            vm.cooking = success.data[0];
            vm.cooking.orders.map(function(order) {
              MenuService.getMenuItem(order.itemId).then(function(dishData) {
                order.fullInfo = dishData.data[0];
                return order;
              }, function(err) { throw err });
            });
          };
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
          success.data ? vm.changeOrderStatus(order, 'Done') : vm.changeOrderStatus(order, 'Problems');
          $timeout(function() {
            OrdersService.removeOrder(order._id).then(function(success) {
              mySocket.emit('orderUptated');
            }, function(err) { throw err });
          }, 120000);
        }, function (err) { throw err })
      };
    });