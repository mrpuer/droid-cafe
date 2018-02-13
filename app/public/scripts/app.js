angular.module('cafeApp', [
    'ui.router'
])
.config(($stateProvider, $locationProvider, $urlRouterProvider) => {
    $stateProvider
        .state({
            name: 'clientHome',
            url: '/',
            template: '<client-component></client-component>',
        })

    $locationProvider.html5Mode({enabled:true,requireBase:false})
    $urlRouterProvider.otherwise('/');
});

