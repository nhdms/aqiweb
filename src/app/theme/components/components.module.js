(function () {
  'use strict';

 angular.module('BlurAdmin.theme.components', [])
   .controller('PageTopController', function ($scope, $uibModal, $http, $state, $rootScope, Socket){
    // console.log($scope)
    $scope.showLoginModal = function() {
      $uibModal.open({
        animation: false,
        controller: 'UserLoginModalCtrl',
        templateUrl: 'app/pages/users/views/login.view.html'
      }).result.then(function (link) {
        item.href = link;
      });
    }
    $scope.logout = function() {
      $http.defaults.headers.common.Authorization = '';
      $state.reload();
      $rootScope.isLogged = false;
      localStorage.removeItem('currentUser');
      localStorage.removeItem('aqi_token');
      // Socket.disconnect();
      $scope.$emit('reload')
      // $rootScope.reload()      
    }
  })
})();
