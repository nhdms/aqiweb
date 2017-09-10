(function () {
  'use strict';

  angular.module('BlurAdmin.pages.report', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('report', {
        url: '/report',
        template: '<div ui-view  autoscroll="true" autoscroll-body-top></div>',
        title: 'Báo cáo',
        controller: 'ReportCtrl',
        sidebarMeta: {
          icon: 'ion-ios-paper-outline',
          order: 150,
        }
      })
        .state('report.date', {
          url: '/daily',
          templateUrl: 'app/pages/report/views/daily.html',
          title: 'Báo cáo theo ngày',
          sidebarMeta: {
            order: 0,
          },
        })
        .state('report.week', {
          url: '/hour',
          templateUrl: 'app/pages/report/views/week.html',
          title: 'Báo cáo theo tuần',
          sidebarMeta: {
            order: 0,
          },
        })
  }
})();