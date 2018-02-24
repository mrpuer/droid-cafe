angular
  .module('cafeApp')
  .factory('DeliveryService', function($http) {
    return {
      addNew: function() {
        return $http.get('/api/v1/delivery/');
      }
    };
  });