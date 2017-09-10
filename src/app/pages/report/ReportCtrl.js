/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    var app = angular.module('BlurAdmin.pages.report')
        .controller('ReportCtrl', ReportCtrl);

    /** @ngInject */
    function ReportCtrl($scope, $filter, editableOptions, editableThemes, baConfig, layoutPaths, Utils, $timeout, API, ngProgressFactory) {
        $scope.progressbar = ngProgressFactory.createInstance();
        $scope.progressbar.setColor('#209e91');
        $scope.progressbar.start();
        $scope.datePicker = {
            dt: new Date(),
            open: function ($event) {
                console.log('fh');
                $scope.datePicker.opened = true;
            },
            opened: false,
            format: 'dd/MM/yyyy',
            options: {
                showWeeks: true,
            }
        }
        $scope.onChange = function () {
            var start = new Date($scope.datePicker.dt);
            $scope.dfrom = start.toLocaleDateString();
            var nextWeek = new Date(start.getTime() + 7 * 24 * 60 * 60 * 1000);
            $scope.dto = nextWeek.toLocaleDateString();
        }
        $scope.onChange();
        $scope.dailyReport = function () {
            var ok = 0;
            API.getData(obj, 3, function (response) {
                // if (response.data.success) 
                ok++;
                var range = Utils.getSafeRange(3);
                var values = response.map(function (item) {
                    item.ok1 = range[0];
                    item.date = new Date(new Date(item.date).setHours(item._id));
                    // item.date = new Date(item.date)
                    item.ok2 = range[1];
                    return item;
                });
                if (ok === 3) $scope.progressbar.complete();
                AmCharts.makeChart('hum-chart', Utils.buildChartOptions(Utils.getHumChartOptions(values)));

            });

            API.getData(obj, 1, function (response) {
                // console.log(response)
                // if (response.data.success)
                ok++;
                var range = Utils.getSafeRange(1);
                var values = response.map(function (item) {
                    item.ok1 = range[0];
                    item.date = new Date(new Date(item.date).setHours(item._id));
                    item.ok2 = range[1];
                    return item;
                });
                // console.log(values[0], Utils.generateChartData(20,30)[0])
                // var opts = 
                if (ok === 3) $scope.progressbar.complete();

                AmCharts.makeChart('temp-chart', Utils.buildChartOptions(Utils.getTempChartOptions(values)));

            });

            API.getData(obj, 2, function (response) {
                // console.log(response)
                // if (response.data.success)
                ok++;
                var range = Utils.getSafeRange(2);
                var values = response.map(function (item) {
                    item.ok1 = range[0];
                    item.ok2 = range[1];
                    item.date = new Date(new Date(item.date).setHours(item._id));
                    // item.date = new Date(item.date)
                    return item;
                });
                AmCharts.makeChart('aqi-chart', Utils.buildChartOptions(Utils.getAqiChartOptions(values)));
                if (ok === 3) $scope.progressbar.complete();
            });
        }
    }
    app.directive('dateReport', function (API, $timeout, baConfig, Utils) {
        return {
            restrict: 'A',
            link: function ($scope, element, attrs) {
                $scope.reports = {
                    temp: {
                        max: {
                            value: '30°C',
                            time: (new Date()).toLocaleTimeString()
                        },
                        avg: {
                            value: '28°C',
                            time: (new Date()).toLocaleTimeString()
                        },
                        min: {
                            value: '18°C',
                            time: (new Date()).toLocaleTimeString()
                        }
                    },
                    hum: {
                        max: {
                            value: '92%',
                            time: (new Date()).toLocaleTimeString()
                        },
                        avg: {
                            value: '76%',
                            time: (new Date()).toLocaleTimeString()
                        },
                        min: {
                            value: '69%',
                            time: (new Date()).toLocaleTimeString()
                        }
                    },
                    aqi: {
                        max: {
                            value: '4',
                            time: (new Date()).toLocaleTimeString()
                        },
                        avg: {
                            value: '3.2',
                            time: (new Date()).toLocaleTimeString()
                        },
                        min: {
                            value: '2',
                            time: (new Date()).toLocaleTimeString()
                        }
                    }
                }
            }
        };
    });

    app.directive('weekReport', function (API, $timeout, baConfig, Utils) {
        return {
            restrict: 'A',
            link: function ($scope, element, attrs) {
                $scope.reports = {
                    temp: {
                        max: {
                            value: '30°C',
                            time: (new Date()).toLocaleString()
                        },
                        avg: {
                            value: '28°C',
                            time: (new Date()).toLocaleString()
                        },
                        min: {
                            value: '18°C',
                            time: (new Date()).toLocaleString()
                        }
                    },
                    hum: {
                        max: {
                            value: '92%',
                            time: (new Date()).toLocaleString()
                        },
                        avg: {
                            value: '76%',
                            time: (new Date()).toLocaleString()
                        },
                        min: {
                            value: '69%',
                            time: (new Date()).toLocaleString()
                        }
                    },
                    aqi: {
                        max: {
                            value: '4',
                            time: (new Date()).toLocaleString()
                        },
                        avg: {
                            value: '3.2',
                            time: (new Date()).toLocaleString()
                        },
                        min: {
                            value: '2',
                            time: (new Date()).toLocaleString()
                        }
                    }
                }
            }
        };
    });
})();
