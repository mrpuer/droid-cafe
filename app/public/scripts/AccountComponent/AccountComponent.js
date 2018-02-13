angular
  .module('cafeApp')
  .component('accountComponent', {
    templateUrl: 'scripts/AccountComponent/AccountComponent.html',
    controller: function (ClientService, $timeout) {
      this.isLogged = ClientService.getClientStatus();
      this.clientInfo = ClientService.getClientInfo();
          
      // нажимаем кнопку входа в аккаунт
      this.login = function(data){
          ClientService.getClient(data);
          $timeout(() => {
            this.clientInfo = ClientService.getClientInfo();
            this.isLogged = ClientService.getClientStatus();
          }, 500);
              
      };
      this.addBalance = function(){

      }
    }
  });