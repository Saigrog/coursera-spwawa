(function() {

  'use strict'

  angular.module('MenuSearchApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .directive('foundItems', FoundItemsDirective)
    // .constant('ApiBasePath', `${window.location.protocol}//davids-restaurant.herokuapp.com`);
    .constant('ApiBasePath', `https://davids-restaurant.herokuapp.com`);

  NarrowItDownController.$inject = ['MenuSearchService'];

  function NarrowItDownController(MenuSearchService) {

    let searchCtrl = this;

    searchCtrl.found = MenuSearchService.getItems();

    searchCtrl.searchMenuItems = () => {

      if (!searchCtrl.searchTerm) {
        MenuSearchService.clear();
      } else {
        MenuSearchService.getMatchedMenuItems(searchCtrl.searchTerm)
          .then((result) => {
            console.log('API result: ', result);
            searchCtrl.found = result;
          })
          .catch((error) => {
            console.log('An error occurred: ', error);
          });
      }

    }

    searchCtrl.removeItem = (itemIndex) => {
      MenuSearchService.removeItem(itemIndex);
    };
  }

  function FoundItemsDirective() {
    let ddo = {
      templateUrl: 'foundItems.html',
      scope: {
        items: '<',
        onRemove: '&'
      },
      controller: FoundItemsDirectiveController,
      controllerAs: 'foundCtrl',
      bindToController: true
    };

    return ddo;
  }

  function FoundItemsDirectiveController() {

    let foundCtrl = this;

    foundCtrl.isNothingFound = () => {
      if (foundCtrl.items.length === 0) {
        return true;
      }
      return false;
    };
  }

  MenuSearchService.$inject = ['$http', 'ApiBasePath'];

  function MenuSearchService($http, ApiBasePath) {

    let service = this,
      foundItems = [];

    service.getMatchedMenuItems = (searchTerm) => {

      service.clear();

      if (searchTerm === "") {
        return foundItems;
      }

      return $http({
        method: "GET",
        url: (ApiBasePath + "/menu_items.json")
      }).then((result) => {

        let menuItemResults = result.data.menu_items;

        menuItemResults.forEach((item) => {
          if (item.description.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) {
            foundItems.push(item);
          }
        });

        return foundItems;

      });
    };

    service.clear = () => {
      foundItems.splice(0, foundItems.length);
    }

    service.removeItem = (itemIndex) => {
      foundItems.splice(itemIndex, 1);
    };

    service.getItems = () => {
      return foundItems;
    };
  }

})();
