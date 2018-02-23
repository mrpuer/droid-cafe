angular.module("cafeApp").component("accountComponent", {
  templateUrl: "scripts/AccountComponent/AccountComponent.html",
  bindings: {
    clientInfo: "<",
    isLogged: "<",
    clientName: '<'
  },
  controller: function() {
    var $ctrl = this;

    $ctrl.balance = function() {
      $ctrl.addBalance();
    };
  }
});
