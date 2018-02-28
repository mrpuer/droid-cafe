angular
  .module('cafeApp')
  .component('menuComponent', {
    templateUrl: 'scripts/MenuComponent/MenuComponent.html',
    bindings: {
      clientInfo: '<'
    },
    controller: function(MenuService, OrdersService) {
      var $ctrl = this;
      $ctrl.cafeMenu = {};

      $ctrl.getMenu = function() {
        MenuService.getMenu().then(function(success) {
          $ctrl.cafeMenu = success.data;
        }, function(err) {
          throw err;
        });
      };

      $ctrl.addOrder = function(dish) {
        var orderData = {};
        orderData.itemId = dish.id;
        orderData.userId = $ctrl.clientInfo._id;
        orderData.timeOrdered = Date.now();
        OrdersService.addOrder(orderData).then(function(success) {
          mySocket.emit('newOrder', dish.price);
          Materialize.toast(`<span class='blue-text'>${dish.title}</span>&nbsp; has been added to your orders`, 5000, 'rounded');
        }, function(err) {
          throw err;
        });
      };
    }
  })