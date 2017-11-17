'use strict';

/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.location').controller('LocationController', LocationController);

    function LocationController($scope, editableOptions, editableThemes, $timeout) {
        editableOptions.theme = 'bs3';
        editableThemes['bs3'].submitTpl = '<button type="submit" class="btn btn-primary btn-with-icon"><i class="ion-checkmark-round"></i></button>';
        editableThemes['bs3'].cancelTpl = '<button type="button" ng-click="$form.$cancel()" class="btn btn-default btn-with-icon"><i class="ion-close-round"></i></button>';

        $scope.locations = [{
            id: 'hnptit',
            name: 'PTIT',
            address: 'Trần Phú, Hà Đông',
            coordinate: {
                latitude: 20.981579, //,
                longitude: 105.78436
            }
        }, {
            id: 'hnbk',
            name: 'BK',
            address: 'Giải Phóng, Hai Bà Trưng',
            coordinate: {
                latitude: 21.0055553, //,
                longitude: 105.8492424
            }
        }, {
            id: 'hntl',
            name: 'TLU',
            address: 'Tây Sơn, Đống Đa',
            coordinate: {
                latitude: 21.0041531,
                longitude: 105.8249094
            }
        }];

        $timeout(function () {
            initialize(20.980652, 105.787573, "PTIT");
        }, 100);

        var mymap = null;

        $scope.generateHTML = function (n) {
            return "<b> " + n.name + "</b> <br />" + "<b> " + n.address + "</b> <br />" + "<b> [" + n.coordinate.latitude + ", " + n.coordinate.longitude + "]</b>";
        };

        $scope.view = function (a, b) {
            mymap.setView([a, b], 16);
        };

        function initialize(long, la, name) {
            try {
                mymap = L.map('mapid').setView([long, la], 13);
                console.log(mymap);
                L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
                    maxZoom: 18,
                    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' + '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' + 'Imagery © <a href="http://mapbox.com">Mapbox</a>',
                    id: 'mapbox.streets'
                }).addTo(mymap);

                $scope.locations.map(function (n, i) {
                    console.log([n.coordinate.latitude, n.coordinate.longitude]);
                    var mk = L.marker([n.coordinate.latitude, n.coordinate.longitude]);
                    mk.addTo(mymap);
                    mk.bindPopup($scope.generateHTML(n));
                    mk.on('click', function (e) {
                        mk.openPopup();
                    });
                });
            } catch (e) {
                console.warn(e);
            }
        }
    }
})();