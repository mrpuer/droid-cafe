angular
    .module('cafeApp')
    .factory('ClientService', function($http) {
        var state = {
            user: {},
            status: false
        };
        return {
            // берем client data по емейлу
            getClient: function(data) {
                // отпраем GET для проверки существует ли пользователь
                $http.get(`/api/v1/clients/${data.email}`).then(function(result) {
                    // если существует, берем его
                    if (result.data.length) {
                        state.user = result.data[0];
                        state.status = true;
                    } 
                    // если не существует, формируем POST на создание нового
                    else {
                        $http.post('/api/v1/clients/', data).then(function(result) {
                            state.user = result.data[0];
                            state.status = true;
                        });
                    }
                }, function(err) {
                    throw err;
                })
            },
            editClient: function(email) {

            },
            getClientInfo: function() {
                return state.user;
            },
            getClientStatus: function() {
                return state.status;
            }
        };
    });