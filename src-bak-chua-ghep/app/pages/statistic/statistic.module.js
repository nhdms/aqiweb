(function () {
  'use strict';
  angular.module('BlurAdmin.pages.statistics', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('statistic', {
        url: '/statistic',
        template: '<div ui-view  autoscroll="true" autoscroll-body-top></div>',
        title: 'Thống kê',
        controller: 'StatisticCtrl',
        sidebarMeta: {
          icon: 'ion-stats-bars',
          order: 150,
        }
      })
      .state('statistic.hour', {
          url: '/hour',
          templateUrl: 'app/pages/statistic/views/hour.html',
          title: 'Thống kê theo giờ',
          sidebarMeta: {
            order: 0,
          },
        })
        .state('statistic.date', {
          url: '/daily',
          templateUrl: 'app/pages/statistic/views/daily.html',
          title: 'Thống kê theo ngày',
          sidebarMeta: {
            order: 0,
          },
        })
        .state('statistic.table', {
          url: '/table',
          templateUrl: 'app/pages/statistic/views/table.html',
          title: 'Thống kê dạng bảng',
          sidebarMeta: {
            order: 0,
          },
        })
        .state('statistic.harmful', {
          url: '/harmful',
          templateUrl: 'app/pages/statistic/views/harmful.html',
          title: 'Dữ liệu xấu',
          sidebarMeta: {
            order: 0,
          },
        })
  }
})();