angular
  .module('cafeApp')
  .component('ordersComponent', {
    templateUrl: 'scripts/OrdersComponent/OrdersComponent.html',
    bindings: {
      clientInfo: '<',
      isLogged: '<',
      addOrder: '&',
      clientOrders: '<'
    },
    controller: function(OrdersService) {
      var $ctrl = this;
      $ctrl.cafeMenu = {};

      $ctrl.getMenu = function() {
        OrdersService.getMenu().then(function(success) {
          $ctrl.cafeMenu = success.data;
        }, function(err) {
          throw err;
        });
      };

      $ctrl.addOrderAll = function(dish) {
        var orderData = {};
        orderData.itemId = dish.id;
        orderData.userId = $ctrl.clientInfo._id;
        OrdersService.addOrder(orderData).then(function(success) {
          var userData = {};
          userData.newOrderId = success.data._id;
          userData.newOrderPrice = dish.price;
          $ctrl.addOrder({orderId: userData});
        }, function(err) {
          throw err;
        });
      };
    }
  })