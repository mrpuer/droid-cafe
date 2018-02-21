angular.module('cafeApp', [
    'ui.router',
    'btford.socket-io'
])
.config(($stateProvider, $locationProvider, $urlRouterProvider) => {
    $stateProvider
        .state({
            name: 'clientPage',
            url: '/',
            templateUrl: 'scripts/ClientPageCtrl/ClientPageCtrl.html',
            controller: 'ClientPageCtrl as vm'
        })
        .state({
            name: 'kitchenPage',
            url: '/kitchen',
            templateUrl: 'scripts/KitchenPageCtrl/KitchenPageCtrl.html',
            controller: 'KitchenPageCtrl as vm'
        })

    $locationProvider.html5Mode({enabled:true,requireBase:false})
    $urlRouterProvider.otherwise('/');
})
.factory('mySocket', function (socketFactory) {
    mySocket = socketFactory();

    return mySocket;
});

