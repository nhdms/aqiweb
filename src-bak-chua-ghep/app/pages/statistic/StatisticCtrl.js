/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    var app = angular.module('BlurAdmin.pages.statistics')
        .controller('StatisticCtrl', StatisticCtrl);

    /** @ngInject */
    function StatisticCtrl($scope, $filter, editableOptions, editableThemes, baConfig, layoutPaths, Utils, $timeout) {
        $scope.getInfo = function (page) {

        }

        // DatePicker
        $scope.datePicker = {
            dt: new Date(),
            dt2 : new Date(),
            open: open,
            open2 : open2,
            opened : false,
            opened2 : false,
            format: 'dd/MM/yyyy',
            options : {
                showWeeks : false
            },

        }

        function open() {
            $scope.datePicker.dt = new Date();
            $scope.datePicker.opened = !$scope.datePicker.opened;
        }

        function open2() {
            $scope.datePicker.dt2 = new Date();
            $scope.datePicker.opened2 = !$scope.datePicker.opened2;
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

        // Temperature chart
        // console.log();


    }

    app.directive('hourDirective', function (API, $timeout, baConfig, Utils) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                $timeout(function () {
                    var layoutColors = baConfig.colors;
                    var temp = {
                        dataDateFormat: "JJ:NN:SS",
                        axis: [
                            { title: 'Nhiệt độ', position: "left" }
                        ],
                        graphs: [{
                            valueAxis: 'v1',
                            title: 'Nhiệt độ cao nhất',
                            valueField: 'max',
                            lineColor: layoutColors.danger
                        },
                        {
                            valueAxis: 'v1',
                            title: 'Nhiệt độ trung bình',
                            valueField: 'avg',
                            lineColor: layoutColors.warning
                        },
                        {
                            valueAxis: 'v1',
                            title: 'Nhiệt độ thấp nhất',
                            valueField: 'min',
                            lineColor: layoutColors.info
                        },
                        {
                            valueAxis: 'v1',
                            title: 'Ngưỡng an toàn thấp nhất',
                            valueField: 'ok1',
                            lineColor: layoutColors.primaryLight
                        },
                        {
                            valueAxis: 'v1',
                            title: 'Ngưỡng an toàn cao nhất',
                            valueField: 'ok2',
                            lineColor: layoutColors.primary
                        },
                        ],
                        categoryField: "date",
                        minPeriod: "hh",
                        dataProvider: Utils.generateChartData(26, 35)
                    }

                    var hum = {
                        dataDateFormat: "JJ:NN:SS",
                        axis: [
                            { title: 'Độ ẩm', position: "left" }
                        ],
                        graphs: [{
                            valueAxis: 'v1',
                            title: 'Độ ẩm cao nhất',
                            valueField: 'max',
                            lineColor: layoutColors.danger
                        },
                        {
                            valueAxis: 'v1',
                            title: 'Độ ẩm trung bình',
                            valueField: 'avg',
                            lineColor: layoutColors.warning
                        },
                        {
                            valueAxis: 'v1',
                            title: 'Độ ẩm thấp nhất',
                            valueField: 'min',
                            lineColor: layoutColors.info
                        },
                        {
                            valueAxis: 'v1',
                            title: 'Ngưỡng an toàn thấp nhất',
                            valueField: 'ok1',
                            lineColor: layoutColors.primaryLight
                        },
                        {
                            valueAxis: 'v1',
                            title: 'Ngưỡng an toàn cao nhất',
                            valueField: 'ok2',
                            lineColor: layoutColors.primary
                        },
                        ],
                        categoryField: "date",
                        minPeriod: "hh",
                        dataProvider: Utils.generateChartData(65, 90)
                    }

                    var aqi = {
                        dataDateFormat: "JJ:NN:SS",
                        axis: [
                            { title: 'Chỉ số chất lượng không khí aqi', position: "left" }
                        ],
                        graphs: [{
                            valueAxis: 'v1',
                            title: 'AQI cao nhất',
                            valueField: 'max',
                            lineColor: layoutColors.danger
                        },
                        {
                            valueAxis: 'v1',
                            title: 'AQI trung bình',
                            valueField: 'avg',
                            lineColor: layoutColors.warning
                        },
                        {
                            valueAxis: 'v1',
                            title: 'AQI thấp nhất',
                            valueField: 'min',
                            lineColor: layoutColors.info
                        },
                        {
                            valueAxis: 'v1',
                            title: 'Ngưỡng an toàn thấp nhất',
                            valueField: 'ok1',
                            lineColor: layoutColors.primaryLight
                        },
                        {
                            valueAxis: 'v1',
                            title: 'Ngưỡng an toàn cao nhất',
                            valueField: 'ok2',
                            lineColor: layoutColors.primary
                        },
                        ],
                        categoryField: "date",
                        minPeriod: "hh",
                        dataProvider: Utils.generateChartData(1, 6)
                    }
                    var chart = AmCharts.makeChart('temp-chart', Utils.buildChartOptions(temp));
                    var chart = AmCharts.makeChart('hum-chart', Utils.buildChartOptions(hum));
                    var chart = AmCharts.makeChart('aqi-chart', Utils.buildChartOptions(aqi));
                }, 0);
            }
        };
    });

    app.directive('dateDirective', function (API, $timeout, baConfig, Utils) {
        return {
            restrict: 'A',
            link: function ($scope, element, attrs) {
                $scope.opened = false;
                $scope.opened2 = false;
                var layoutColors = baConfig.colors;
                $timeout(function () {
                    var temp = {
                        dataDateFormat: "JJ:NN:SS",
                        axis: [
                            { title: 'Nhiệt độ', position: "left" }
                        ],
                        graphs: [{
                            valueAxis: 'v1',
                            title: 'Nhiệt độ cao nhất',
                            valueField: 'max',
                            lineColor: layoutColors.danger
                        },
                        {
                            valueAxis: 'v1',
                            title: 'Nhiệt độ trung bình',
                            valueField: 'avg',
                            lineColor: layoutColors.warning
                        },
                        {
                            valueAxis: 'v1',
                            title: 'Nhiệt độ thấp nhất',
                            valueField: 'min',
                            lineColor: layoutColors.info
                        },
                        {
                            valueAxis: 'v1',
                            title: 'Ngưỡng an toàn thấp nhất',
                            valueField: 'ok1',
                            lineColor: layoutColors.primaryLight
                        },
                        {
                            valueAxis: 'v1',
                            title: 'Ngưỡng an toàn cao nhất',
                            valueField: 'ok2',
                            lineColor: layoutColors.primary
                        },
                        ],
                        categoryField: "date",
                        minPeriod: "hh",
                        dataProvider: Utils.generateChartData(26, 35)
                    }

                    var chart = AmCharts.makeChart('div-chart', Utils.buildChartOptions(temp));
                }, 0);
            }
        };
    });

    app.directive('tableDirective', function (API, $timeout, baConfig, Utils) {
        return {
            restrict: 'A',
            link: function ($scope, element, attrs) {
                $timeout(function () {
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
                        },
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
                    $scope.currentPage = 0;
                }, 0);
            }
        };
    });

     app.directive('harmDirective', function (API, $timeout, baConfig, Utils) {
        return {
            restrict: 'A',
            link: function ($scope, element, attrs) {
                $timeout(function () {
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
                        },
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
                    $scope.currentPage = 0;
                }, 0);
            }
        };
    });
})();
