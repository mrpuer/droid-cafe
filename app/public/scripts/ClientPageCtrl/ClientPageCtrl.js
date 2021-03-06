angular
    .module('cafeApp')
    .controller('ClientPageCtrl', function(ClientService, mySocket) {
      var vm = this;
      vm.clientInfo = {};
      vm.clientName = 'Dear Client';
      vm.isLogged = false;

      vm.login = function(data) {
        vm.isLogged = true;
        if (data.name) vm.clientName = data.name;
            ClientService.getClient(data.email).then(
              function(result) {
                // если существует, берем его
                if (result.data.length) {
                  // взяли инфо юзера
                  vm.clientInfo = result.data[0];
                  // создаем события, для формирования заказов юзера
                  mySocket.emit('userOrders');
                  vm.isLogged = true;
                } else {
                  // если не существует, формируем POST на создание нового
                  ClientService.addClient(data).then(function(result) {
                    vm.clientInfo = result.data;
                    mySocket.emit('userOrders');
                    //vm.isLogged = true;
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
                  Materialize.toast('Your account has been successfully credited', 5000, 'rounded');
                }, function(err) {
                    throw err;
                }
            )
          };

          mySocket.on('newOrder', function(dishPrice) {
            vm.clientInfo.balance -= dishPrice;
            ClientService.editClient(vm.clientInfo).then(function(success) {
              vm.clientInfo = success.config.data;
            }, function(err) {
              throw err;
            });
          });
    });