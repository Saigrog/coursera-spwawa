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
          .then(function(result) {
            searchCtrl.found = result;
          });
      }

    }

    searchCtrl.removeItem = function(itemIndex) {
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

    foundCtrl.nothingFound = () => {
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

      foundItems.splice(0, foundItems.length);

      if (searchTerm === "") {
        return foundItems;
      }
      return $http({
        method: "GET",
        url: (ApiBasePath + "/menu_items.json")
      }).then(function(result) {

        let allItems = result.data.menu_items;

        foundItems.splice(0, foundItems.length);

        for (let index = 0; index < allItems.length; ++index) {
          if (allItems[index].description.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) {
            foundItems.push(allItems[index]);
          }
        }
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
