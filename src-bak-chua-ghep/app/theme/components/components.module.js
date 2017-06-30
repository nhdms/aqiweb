(function () {
  'use strict';

  angular.module('BlurAdmin.theme.components', [])
    .controller('PageTopController', function ($scope, $uibModal) {
      // console.log($scope)
      $scope.showLoginModal = function () {
        $uibModal.open({
          animation: false,
          controller: 'UserLoginModalCtrl',
          templateUrl: 'app/pages/users/views/login.view.html'
        }).result.then(function (link) {
          item.href = link;
        });
      }
    })
})();
