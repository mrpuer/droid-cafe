'use strict';

angular
    .module('cafeApp')
    .controller('ClientPageCtrl', function(ClientService) {
        this.isLogged = ClientService.getClientStatus();
        this.clientInfo = ClientService.getClientInfo();
    });