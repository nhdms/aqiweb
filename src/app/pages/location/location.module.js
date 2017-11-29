(function () {
  'use strict';

  angular.module('BlurAdmin.pages.location', [])
    .config(routeConfig)

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('location', {
        url: '/location',
        templateUrl: 'app/pages/location/location.html',
        controller: 'LocationController',
        title: 'Quản lý khu vực',
        sidebarMeta: {
          order: 900,
          icon: 'ion-ios-location-outline'
        },
        role: 'zC'        
      })

  }
})();