(function() {
  
  'use strict';

  angular.module('MenuApp')
    .component('items', {
      templateUrl: 'menuapp/templates/items.component.template.html',
      bindings: {
        items: '<'
      }
    });

})();
