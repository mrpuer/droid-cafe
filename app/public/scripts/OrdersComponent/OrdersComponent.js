angular
  .module('cafeApp')
  .component('ordersComponent', {
    templateUrl: 'scripts/OrdersComponent/OrdersComponent.html',
    bindings: {
      clientInfo: '<',
      isLogged: '<'
    },
    controller: function(OrdersService, MenuService, mySocket) {
      var $ctrl = this;
      $ctrl.clientOrders = {};

      $ctrl.$onInit = function() {
        $ctrl.getUserOrders();
      };

      mySocket.on('newOrder', function(){
        $ctrl.getUserOrders();
      });
      mySocket.on('orderUptated', function(){
        $ctrl.getUserOrders();
      });

      $ctrl.getUserOrders = function() {
        OrdersService.getUserOrders($ctrl.clientInfo._id).then(function(success) {
          // записали
          $ctrl.clientOrders = success.data;
          // добавляем каждому полное инфо блюда из меню
          $ctrl.clientOrders.map((order) => {
            MenuService.getMenuItem(order.itemId).then(function(success) {
              order.dishInfo = success.data[0];
              return order;
            }, function(err) {throw err})
          })
        }, function(err) {
          throw err;
        })
      }
    }
  })