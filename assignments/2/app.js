(function() {

  'use strict';

  angular.module('ShoppingListCheckOff', [])
         .controller('ToBuyController', ToBuyController)
         .controller('AlreadyBoughtController', AlreadyBoughtController)
         .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

  ToBuyController.$inject = ['ShoppingListCheckOffService'];

  function ToBuyController(ShoppingListCheckOffService) {

    let toBuy = this;

    toBuy.items = ShoppingListCheckOffService.getToBuyItems();
    toBuy.itemBought = (index) => {
      ShoppingListCheckOffService.itemBought(index);
    }

  }

  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];

  function AlreadyBoughtController(ShoppingListCheckOffService) {

    let bought = this;

    bought.items = ShoppingListCheckOffService.getBoughtItems();

  }

  function ShoppingListCheckOffService() {

    let service = this,
        toBuyItems = [{
            name: "Cookies",
            quantity: 10
          },
          {
            name: "Chocolate bars",
            quantity: 5
          },
          {
            name: "Loaf of bread",
            quantity: 1
          },
          {
            name: "Crisps",
            quantity: 15
          },
          {
            name: "Coffee",
            quantity: 3
          }
        ],
        boughtItems = [];

    service.itemBought = (index) => {
      boughtItems.push(toBuyItems[index]);
      toBuyItems.splice(index, 1);
    };

    service.getBoughtItems = () => {
      return boughtItems;
    }

    service.getToBuyItems = () => {
      return toBuyItems;
    }

  }

})();
