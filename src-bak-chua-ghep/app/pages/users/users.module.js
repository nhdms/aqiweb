(function () {
    'use strict';

    angular.module('BlurAdmin.pages.users', [])
        .controller('UserLoginModalCtrl', UserLoginModalCtrl);


    function UserLoginModalCtrl($scope, $rootScope, toastr){
        // console.log('dg');
        $scope.showLoginFrm = 1;
        $scope.user = {
            name : 'edsf',
            email : 'ets@gmail.com',
            password : '1234',
            repassword : '1234',
            remember : true
        }

        $scope.signIn = function() {
            $rootScope.isLogged = true;
            toastr.success('Đăng nhập thành công!');
            $scope.$dismiss();
        }

        $scope.showLoginForm = function(ok) {
            $scope.showLoginFrm = ok;
        }
    }
})();