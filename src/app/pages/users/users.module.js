(function () {
    'use strict';

    angular.module('BlurAdmin.pages.users', [])
        .controller('UserLoginModalCtrl', UserLoginModalCtrl);


    function UserLoginModalCtrl($scope, $rootScope, toastr, API, $state, Socket){
        // console.log('dg');
        $scope.showLoginFrm = 1;
        $scope.user = {
            name : 'Tran thanh',
            email : 'admin@sya.com',
            password : '12345678',
            repassword : '12345678',
            remember : true
        }

        $scope.signIn = function() {
            $scope.user.username = $scope.user.email;
            API.doLogin($scope.user, function(response) {
                var res = response.data;
                if (res.success) {
                    $rootScope.isLogged = true;
                    localStorage.setItem('currentUser', JSON.stringify(res.info));
                    toastr.success('Đăng nhập thành công!');                    
                    API.setDefaultToken(res.token);
                    $state.reload();
                    $scope.$dismiss();                 
                } else {
                    toastr.error(res.msg, "Đăng nhập không thành công");
                }
            });
            // $rootScope.isLogged = true;
        }

        $scope.signUp = function() {
            API.doRegister($scope.user, function(response) {
                var res = response.data;
                if (res.success) {
                    toastr.success('Đăng ký thành công!');
                    $scope.showLoginFrm = 1;
                } else {
                    toastr.error(res.msg, 'Lỗi');
                }
            })
        }

        $scope.showLoginForm = function(ok) {
            $scope.showLoginFrm = ok;
        }
    }
})();