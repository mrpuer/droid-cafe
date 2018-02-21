angular.module("cafeApp").component("accountComponent", {
  templateUrl: "scripts/AccountComponent/AccountComponent.html",
  bindings: {
    clientInfo: "<",
    isLogged: "<",
    clientLogin: "&",
    addBalance: "&",
    clientName: '<'
  },
  controller: function() {
    var $ctrl = this;

    $ctrl.login = function(data) {
      $ctrl.clientLogin({ client: data });
    };

    $ctrl.balance = function() {
      $ctrl.addBalance();
    };
  }
});
