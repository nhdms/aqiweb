/**
 * @author v.lugovksy
 * created on 15.12.2015
 */
(function() {
    'use strict';

    angular.module('BlurAdmin.theme')
        .run(themeRun);

    /** @ngInject */
    function themeRun($timeout, $rootScope, layoutPaths, preloader, $q, baSidebarService, themeLayoutSettings, $location, toastr, $http, SocketURL, Socket) {
        var publicPages = ['/dashboard', '/users', '/news'];
        var restrict = function(start) {
            return publicPages.filter(function(i) {
                return i.startsWith(start)
            }).length > 0
        }    
        $rootScope.$on('$locationChangeStart', function(event, next, current) {
            // console.log(window.location)
            // if (Socket.socket.connect)
            var path = $location.path()
            // if (path.startsWith('/')) path = path.substr(1)
            console.log(path === '', path)
            
            // if (Socket.socket && Socket.socket.connected) Socket.disconnect();)
            var restrictedPage = path === '' || restrict(path);
            if (!restrictedPage && !localStorage.currentUser) {
                $location.path('/dashboard');
                toastr.warning('Bạn cần phải đăng nhập để xem các mục khác, đang chuyển hướng về trang chủ', 'Warning');
            }
        });
        if (localStorage.currentUser) {
            $http.defaults.headers.common.Authorization = localStorage.getItem('aqi_token');
            $rootScope.isLogged = true;        
        }
        var whatToWait = [
            preloader.loadAmCharts(),
            $timeout(3000)
        ];
        $q.all(whatToWait).then(function() {
            $rootScope.$pageFinishedLoading = true;
        });

        $timeout(function() {
            if (!$rootScope.$pageFinishedLoading) {
                $rootScope.$pageFinishedLoading = true;
            }
        }, 3000);

        $rootScope.$baSidebarService = baSidebarService;
    }

})();