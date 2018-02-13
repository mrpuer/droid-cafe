angular
  .module('cafeApp')
  .component('ordersComponent', {
    templateUrl: 'scripts/OrdersComponent/OrdersComponent.html',
    controller: function (ClientService) {
      this.isLogged = ClientService.getClientStatus();
      this.clientInfo = ClientService.getClientInfo();
    }
  });