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
                status : 'app/status/bad.png',
                timeExec : '2017-03-03 17:30:10.0',
                timeUpload: '2017-03-03 17:30:10.0',
                value : 28,
                unit: '°C',
                sensor : 'Temperature DHT Sensor',
                node : {
                    id : 'n1',
                    name : 'Node RDC'
                }
            }
        ]

        $scope.pages = new Array(5);
        $scope.currentPage = 3;
        $scope.getInfo = function(page) {
            
        }

        // DatePicker
        $scope.open = open;
        $scope.opened = false;
        $scope.format = 'dd/MM/yyyy';
        $scope.options = {
            showWeeks: false
        };

        function open() {
            console.log($scope.opened);
            $scope.opened = !$scope.opened;
        }
        $scope.dt = new Date();                    
    }
})();
