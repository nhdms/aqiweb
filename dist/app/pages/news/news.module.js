'use strict';

(function () {
  'use strict';

  angular.module('BlurAdmin.pages.news', []).config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider.state('news', {
      url: '/news',
      templateUrl: 'app/pages/news/news.html',
      title: 'Tin tức',
      controller: 'NewsCtrl',
      sidebarMeta: {
        icon: 'ion-ios-book-outline',
        order: 140
      }
    });
    // .state('hardware.root', {
    //     url: '/root',
    //     templateUrl: 'app/pages/hardware/views/root.html',
    //     title: 'Root',
    //     sidebarMeta: {
    //       order: 0,
    //     },
    //   })
    //   .state('hardware.node', {
    //     url: '/node',
    //     templateUrl: 'app/pages/hardware/views/node.html',
    //     title: 'Node',
    //     sidebarMeta: {
    //       order: 0,
    //     },
    //   })
    //   .state('hardware.sensor', {
    //     url: '/sensor',
    //     templateUrl: 'app/pages/hardware/views/sensor.html',
    //     title: 'Sensor',
    //     sidebarMeta: {
    //       order: 0,
    //     },
    //   })
  }
})();