(function () {
"use strict";

angular.module('public')
.controller('MyInfoController', MyInfoController);

MyInfoController.$inject = ['SignUpDataService', 'ApiPath'];

function MyInfoController(SignUpDataService, ApiPath) {
  let $ctrl = this;
  $ctrl.userPref = SignUpDataService.getUserPref();
  $ctrl.basePath = ApiPath;
}

})();