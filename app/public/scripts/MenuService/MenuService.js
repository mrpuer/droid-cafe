angular
  .module('cafeApp')
  .factory('MenuService', function($http) {
    return {
      getMenu: function() {
        return $http.get('/api/v1/menu/');
      },
      getMenuItem: function(dish) {
        return $http.get(`/api/v1/menu/${dish}`);
      }
    };
  });