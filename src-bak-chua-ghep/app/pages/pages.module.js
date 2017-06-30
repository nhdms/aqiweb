/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages', [
    'ui.router',
    'BlurAdmin.pages.dashboard',
    'BlurAdmin.pages.statistics',
    'BlurAdmin.pages.report',
    'BlurAdmin.pages.hardware',
    'BlurAdmin.pages.location',
    'BlurAdmin.pages.users',
  ])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($urlRouterProvider) {
    // $urlRouterProvider.w
    $urlRouterProvider.otherwise('/dashboard');
  }

})();
