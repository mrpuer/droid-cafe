angular.module('cafeApp', [
    'ui.router'
])
.config(($stateProvider, $locationProvider, $urlRouterProvider) => {
    $stateProvider
        .state({
            name: 'clientPage',
            url: '/',
            templateUrl: 'scripts/ClientPageCtrl/ClientPageCtrl.html',
            controller: 'ClientPageCtrl as vm'
        })

    $locationProvider.html5Mode({enabled:true,requireBase:false})
    $urlRouterProvider.otherwise('/');
});

