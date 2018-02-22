angular
    .module('cafeApp')
    .controller('ClientPageCtrl', function(ClientService, OrdersService) {
      var vm = this;
      vm.clientInfo = {};
      vm.clientOrders = {};
      vm.clientName = 'Dear Client';
      vm.isLogged = false;

      vm.login = function(data) {
        if (data.name) vm.clientName = data.name;
            ClientService.getClient(data.email).then(
              function(result) {
                // если существует, берем его
                if (result.data.length) {
                  // взяли инфо юзера
                  vm.clientInfo = result.data[0];
                  // берем его заказы и статусы
                  vm.getUserOrders();
                  vm.isLogged = true;
                } else {
                  // если не существует, формируем POST на создание нового
                  ClientService.addClient(data).then(function(result) {
                    vm.clientInfo = result.data;
                    vm.isLogged = true;
                  });
                }
              },
              function(err) {
                throw err;
              }
            );
          };
      
          vm.addBalance = function() {
            vm.clientInfo.balance += 100;
            ClientService.editClient(vm.clientInfo).then(
                function(success) {
                  vm.clientInfo = success.config.data;
                }, function(err) {
                    throw err;
                }
            )
          };

          vm.getUserOrders = function() {
            OrdersService.getUserOrders(vm.clientInfo._id).then(function(success) {
              // записали
              vm.clientOrders = success.data;
              // добавляем каждому полное инфо блюда из меню
              vm.clientOrders.map((order) => {
                OrdersService.getMenuItem(order.itemId).then(function(success) {
                  order.dishInfo = success.data[0];
                  return order;
                }, function(err) {throw err})
              })
            }, function(err) {
              throw err;
            })
          }

          vm.addOrderToUser = function(data) {
            vm.clientInfo.orders.push(data.newOrderId);
            vm.clientInfo.balance -= data.newOrderPrice;
            ClientService.editClient(vm.clientInfo).then(function(success) {
              vm.clientInfo = success.config.data;
              vm.getUserOrders();
            }, function(err) {
              throw err;
            });
          };
    });