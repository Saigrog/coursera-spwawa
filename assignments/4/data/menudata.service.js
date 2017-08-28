(function() {

  'use strict';

  angular.module('data')
    .service('MenuDataService', MenuDataService);

  MenuDataService.$inject = ['$http', 'ApiBasePath'];

  function MenuDataService($http, ApiBasePath) {

    let service = this;

    service.getAllCategories = () => {
      return $http({
          method: "GET",
          url: (ApiBasePath + "/categories.json")
        }).then(function(response) {
          return response.data;
        })
        .catch((error) => {
          console.log('An error occurred getting all of the menu categories: ', error);
        });
    };

    service.getItemsForCategory = (categoryShortName) => {
      return $http({
          method: "GET",
          url: (ApiBasePath + "/menu_items.json"),
          params: {
            category: categoryShortName
          }
        }).then(function(response) {
          return response.data;
        })
        .catch((error) => {
          console.log(`An error occurred getting the items for the '${categoryShortName}' menu category: `, error);
        });
    };
  }

})();
