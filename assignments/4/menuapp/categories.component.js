(function() {
  
  'use strict';

  angular.module('MenuApp')
    .component('categories', {
      templateUrl: 'menuapp/templates/categories.component.template.html',
      bindings: {
        items: '<'
      }
    });

})();
