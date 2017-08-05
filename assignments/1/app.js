(function() {

  'use strict';

  angular.module('LunchCheck', [])
    .controller('LunchCheckController', LunchCheckController);

  LunchCheckController.$inject = ['$scope', '$filter'];

  function LunchCheckController($scope, $filter) {

        $scope.lunchItems = null;
        $scope.message = '';
        $scope.messageStatus = '';

        $scope.checkNumberOfItems = () => {

          if (!$scope.lunchItems) {
            $scope.message = 'Please enter data first!';
            $scope.messageStatus = 'error';
          } else {
            let splitItems = $scope.lunchItems.split(','),
                filteredItems = $filter('filter')(splitItems, (value) => {
                  return (value);
                });

            $scope.message = (filteredItems.length <= 3) ? 'Enjoy!' : 'Too much!';
            $scope.messageStatus = 'success';
          }

        };

  }

})();
