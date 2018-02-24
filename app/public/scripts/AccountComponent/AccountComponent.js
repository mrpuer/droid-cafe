angular.module("cafeApp").component("accountComponent", {
  templateUrl: "scripts/AccountComponent/AccountComponent.html",
  bindings: {
    clientInfo: "<",
    isLogged: "<",
    clientName: '<',
    addBalance: '&'
  },
  controller: function() {
    var $ctrl = this;

    $ctrl.balance = function() {
      $ctrl.addBalance();
    };
  }
});