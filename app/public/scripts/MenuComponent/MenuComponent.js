angular
  .module('cafeApp')
  .component('menuComponent', {
    templateUrl: 'scripts/MenuComponent/MenuComponent.html',
    bindings: {
    },
    controller: function(MenuService, mySocket) {
      var $ctrl = this;
      $ctrl.cafeMenu = {};

      $ctrl.getMenu = function() {
        MenuService.getMenu().then(function(success) {
          $ctrl.cafeMenu = success.data;
        }, function(err) {
          throw err;
        });
      };
    }
  })