'use strict';

angular
    .module('cafeApp')
    .component('clientComponent', {
        templateUrl: 'scripts/ClientPageComponent/ClientPageComponent.html',
        controller: function(ClientService, $timeout) {
            this.isLogged = ClientService.getClientStatus();
            this.clientInfo = ClientService.getClientInfo();
            
            // нажимаем кнопку входа в аккаунт
            this.login = function(data){
                ClientService.getClient(data);
                $timeout(() => {
                    this.clientInfo = ClientService.getClientInfo();
                    this.isLogged = ClientService.getClientStatus();
                }, 100);
                
            };
        }
    });