angular.module("cafeApp").factory("ClientService", function($http) {
  return {
    // берем client data по емейлу
    getClient: function(email) {
      return $http.get(`/api/v1/clients/${email}`);
    },
    addClient: function(data) {
      return $http.post("/api/v1/clients/", data);
    },
    editClient: function(data) {
      return $http.put(`/api/v1/clients/${data.email}`, data);
    }
  };
});
