(function() {

  'use strict';

  angular.module('MenuApp')
    .controller('CategoryListController', CategoryListController);

  CategoryListController.$inject = ['items'];

  function CategoryListController(items) {
    let catLastCtrl = this;
    catLastCtrl.items = items;
  }

})();
