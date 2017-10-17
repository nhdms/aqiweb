(function () {
  'use strict';

  angular.module('BlurAdmin.pages.hardware', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('hardware', {
        url: '/hardware',
        template: '<div ui-view  autoscroll="true" autoscroll-body-top></div>',
        title: 'Phần cứng',
        controller: 'HardwareCtrl',
        sidebarMeta: {
          icon: 'ion-ios-gear-outline',
          order: 800,
        },
        role: 'admin'
      })
      .state('hardware.root', {
          url: '/root',
          templateUrl: 'app/pages/hardware/views/root.html',
          title: 'Root',
          sidebarMeta: {
            order: 0,
          },
        })
        .state('hardware.node', {
          url: '/node',
          templateUrl: 'app/pages/hardware/views/node.html',
          title: 'Node',
          sidebarMeta: {
            order: 0,
          },
        })
        .state('hardware.sensor', {
          url: '/sensor',
          templateUrl: 'app/pages/hardware/views/sensor.html',
          title: 'Sensor',
          sidebarMeta: {
            order: 0,
          },
        })
        
  }
})();