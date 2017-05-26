/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.statistic')
        .controller('StatisticCtrl', StatisticCtrl);

    /** @ngInject */
    function StatisticCtrl($scope, $filter, editableOptions, editableThemes) {
        $scope.items = [
            {
                status: 'app/status/bad.png',
                timeExec: '2017-03-03 17:30:10.0',
                timeUpload: '2017-03-03 17:30:10.0',
                value: 28,
                unit: '°C',
                sensor: 'Temperature DHT Sensor',
                node: {
                    id: 'n1',
                    name: 'Node RDC'
                }
            }
        ]

        $scope.pages = new Array(5);
        $scope.currentPage = 3;
        $scope.getInfo = function (page) {

        }

        // DatePicker
        $scope.dt = new Date();
        $scope.dt2 = new Date();

        $scope.open = open;
        $scope.opened = false;
        $scope.format = 'dd/MM/yyyy';
        $scope.options = {
            showWeeks: false,
        };

        function open() {
            console.log($scope.opened);
            $scope.dt = new Date();
            $scope.opened = !$scope.opened;
        }

        // Date picker 2
        $scope.open2 = open2;
        $scope.opened2 = false;

        function open2() {
            console.log($scope.opened);
            $scope.dt2 = new Date();
            $scope.opened2 = !$scope.opened2;
        }

        // Form
        $scope.nodes = [
            {
                id: 'f1',
                name: 'NODE R1',
                loc: 'hnptit'
            },
            {
                id: 'f2',
                name: 'NODE R2',
                loc: 'hnptit'
            },
            {
                id: 'f3',
                name: 'NODE R3',
                loc: 'hnptit'
            },
            {
                id: 'f4',
                name: 'NODE RdS',
                loc: 'hnbk'
            },
            {
                id: 'f5',
                name: 'NODE RXS',
                loc: 'hnbk'
            },
            {
                id: 'f8',
                name: 'NODE RTLA',
                loc: 'hntl'
            }
        ];

        $scope.sensors = [
            {
                id: 's1',
                name: 'KK1',
                node: 'f1'
            },
            {
                id: 's2',
                name: 'DA1',
                node: 'f1'
            },
            {
                id: 's3',
                name: 'ND1',
                node: 'f2'
            }
        ];
    }
})();
