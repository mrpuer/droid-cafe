angular
  .module('cafeApp')
  .factory('OrdersService', function($http) {
    return {
      addOrder: function(data) {
        return $http.post('/api/v1/orders/', data);
      },
      editOrder: function(data) {
        return $http.put(`/api/v1/orders/${data._id}`, data);
      },
      getUserOrders: function(id) {
        return $http.get(`/api/v1/orders/${id}`);
      },
      getAllOrders: function() {
        return $http.get('/api/v1/orders/');
      },
      removeOrder: function(id) {
        return $http.delete(`/api/v1/orders/${id}`);
      }
    };
  });