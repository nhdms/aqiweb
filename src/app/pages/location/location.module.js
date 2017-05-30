(function () {
  'use strict';

  angular.module('BlurAdmin.pages.location', [])
    .config(routeConfig)
    .controller('LocationController', LocationController);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('location', {
        url: '/location',
        templateUrl: 'app/pages/location/location.html',
        title: 'Quản lý khu vực',
        sidebarMeta: {
          order: 900,
        },
      })

  }

  function LocationController($scope, editableOptions, editableThemes, $timeout) {
    editableOptions.theme = 'bs3';
    editableThemes['bs3'].submitTpl = '<button type="submit" class="btn btn-primary btn-with-icon"><i class="ion-checkmark-round"></i></button>';
    editableThemes['bs3'].cancelTpl = '<button type="button" ng-click="$form.$cancel()" class="btn btn-default btn-with-icon"><i class="ion-close-round"></i></button>';

    $scope.locations = [
      {
        id: 'hnptit',
        name: 'PTIT',
        address: 'Trần Phú, Hà Đông',
        coordinate: {
          longtitude: 21.0309,
          latitude: 105.784
        }
      },
      {
        id: 'hnbk',
        name: 'BK',
        address: 'Giải Phóng, Hai Bà Trưng',
        coordinate: {
          longtitude: 21.0309,
          latitude: 105.784
        }
      },
      {
        id: 'hntl',
        name: 'TLU',
        address: 'Tây Sơn, Đống Đa',
        coordinate: {
          longtitude: 21.0309,
          latitude: 105.784
        }
      }
    ];



    $timeout(function () {
      initialize(20.980652, 105.787573, "PTIT");
    }, 100);
  }

  function initialize(long, la, name) {
    var mapCanvas = document.getElementById('google-maps');
    var mapOptions = {
      center: new google.maps.LatLng(long, la),
      zoom: 12,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(mapCanvas, mapOptions);
    var marker = new google.maps.Marker({
      position: mapOptions.center,
      title: name
    });

    // To add the marker to the map, call setMap();
    marker.setMap(map);
  }
})();