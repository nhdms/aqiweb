/**
 * @author v.lugovksy
 * created on 15.12.2015
 */
(function() {
    'use strict';

    angular.module('BlurAdmin.theme')
        .run(themeRun);

    /** @ngInject */
    function themeRun($timeout, $rootScope, layoutPaths, preloader, $q, baSidebarService, themeLayoutSettings, $location, toastr) {
        $rootScope.$on('$locationChangeStart', function(event, next, current) {
            var publicPages = ['/dashboard'];
            // console.log(window.location)


            var restrictedPage = publicPages.indexOf($location.path()) === -1;
            if (restrictedPage && !localStorage.currentUser) {
                $location.path('/dashboard');
                toastr.warning('Bạn cần phải đăng nhập để xem các mục khác', 'Warning');
            }
        });
        $rootScope.isLogged = false;
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