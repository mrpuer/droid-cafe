angular
  .module('cafeApp')
  .component('ordersComponent', {
    templateUrl: 'scripts/OrdersComponent/OrdersComponent.html',
    bindings: {
      clientInfo: '<',
      isLogged: '<'
    },
    controller: function(OrdersService, MenuService, mySocket, $interval) {
      var $ctrl = this;
      $ctrl.clientOrders = {};
      $ctrl.ordersLoader = true;

      $ctrl.pagination = {
        page: 1,
        perPage: 5
      };

      $ctrl.$onInit = function() {
        $ctrl.getUserOrders($ctrl.pagination);
      };

      $ctrl.tests = function(item) {
        console.log(typeof item);
      };

      $ctrl.isOrderDone = function(status) {
        return (status === 'Done' || status === 'Problems');
      };

      $ctrl.millisecondsFormat = function(millis) {
        var minutes = Math.floor(millis / 60000);
        var seconds = ((millis % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
      }

      mySocket.on('newOrder', function(){
        $ctrl.getUserOrders($ctrl.pagination);
      });
      mySocket.on('orderUptated', function(){
        $ctrl.getUserOrders($ctrl.pagination);
        Materialize.toast(`Your order status is chaged`, 5000, 'rounded');
      });

      $ctrl.getUserOrders = function(pageConf) {
        OrdersService.getUserOrders(pageConf, $ctrl.clientInfo._id).then(function(success) {
          $ctrl.ordersLoader = false;
          if (success.data.length) {
            $ctrl.clientOrders = success.data[0];
            $ctrl.clientOrders.orders.map((order) => {
              MenuService.getMenuItem(order.itemId).then(function(success) {
                order.dishInfo = success.data[0];
                return order;
              }, function(err) {throw err})
            });
          } else {
            $ctrl.clientOrders = {};
          }
        }, function(err) {
          throw err;
        })
      }
    }
  })