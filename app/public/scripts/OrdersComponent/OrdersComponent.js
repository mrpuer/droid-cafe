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

      // mySocket.on('connect', function(){
      //   console.log('im connect emit!');
      //   $ctrl.getUserOrders();
      // });
      mySocket.on('newOrder', function(){
        console.log('ordersComponent receive newOrder Emit');
        $ctrl.getUserOrders();
      });
      // mySocket.on('UserOrders', function(){
      //   console.log('I got userOrders emit!');
      //   $ctrl.getUserOrders();
      // });

      $ctrl.$onInit = function() {
        $ctrl.getUserOrders();
      };

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

      $ctrl.addOrder = function(dish) {
        var orderData = {};
        orderData.itemId = dish.id;
        orderData.userId = $ctrl.clientInfo._id;
        OrdersService.addOrder(orderData).then(function(success) {
          mySocket.emit('newOrder', dish.price);
        }, function(err) {
          throw err;
        });
      };



      $ctrl.cafeMenu = {};

      $ctrl.getMenu = function() {
        OrdersService.getMenu().then(function(success) {
          $ctrl.cafeMenu = success.data;
        }, function(err) {
          throw err;
        });
      };
    }
  })