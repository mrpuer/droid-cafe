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
      getUserOrders: function(pageConf, id) {
        const offset = pageConf.page === 1 ? 0 : ((pageConf.page - 1) * pageConf.perPage);
        return $http.get(`/api/v1/orders/users/${id}?offset=${offset}&limit=${pageConf.perPage}`);
      },
      getAllOrders: function(pageConf, status) {
        const offset = pageConf.page === 1 ? 0 : ((pageConf.page - 1) * pageConf.perPage);
        return $http.get(`/api/v1/orders/${status}?offset=${offset}&limit=${pageConf.perPage}`);
      },
      removeOrder: function(id) {
        return $http.delete(`/api/v1/orders/${id}`);
      }
    };
  });