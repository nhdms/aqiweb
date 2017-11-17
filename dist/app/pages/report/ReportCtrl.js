'use strict';

/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    var app = angular.module('BlurAdmin.pages.report').controller('ReportCtrl', ReportCtrl);

    /** @ngInject */
    function ReportCtrl($scope, $filter, editableOptions, editableThemes, baConfig, layoutPaths, Utils, $timeout, API, ngProgressFactory, toastr, PROGRESSBAR_COLOR) {
        $scope.progressbar = ngProgressFactory.createInstance();
        $scope.dailyReport = [];
        $scope.weeklyReport = [];
        $scope.progressbar.setColor(PROGRESSBAR_COLOR);
        $scope.progressbar.start();
        $scope.datePicker = {
            dt: new Date(),
            open: function open($event) {
                console.log('fh');
                $scope.datePicker.opened = true;
            },
            opened: false,
            format: 'dd/MM/yyyy',
            options: {
                showWeeks: true
            }
        };
        $scope.onChange = function () {
            var start = new Date($scope.datePicker.dt);
            $scope.dfrom = start.toISOString();
            var nextWeek = new Date(start.getTime() + 7 * 24 * 60 * 60 * 1000);
            $scope.dto = nextWeek.toISOString();
            var st = start.setHours(0, 0, 0, 0),
                end = nextWeek.setHours(23, 59, 59, 999);
            $scope.progressbar.start();
            API.getReport(st, end, function (data) {
                // console.log(data.data.length ==)
                $scope.progressbar.complete();
                if (data.data.length === 0) {
                    $scope.weeklyReport = [];
                    return toastr.success("Chưa có dữ liệu cho ngày này");
                }
                $scope.weeklyReport = data.data;
                // console.log($scope.dailyReport)
            });
        };
        $scope.onChange();

        $scope.ondateChanged = function () {
            var date = new Date($scope.datePicker.dt),
                start = date.setHours(0, 0, 0, 0),
                end = date.setHours(23, 59, 59, 999);
            $scope.progressbar.start();
            API.getReport(start, end, function (data) {
                // console.log(data.data.length ==)
                $scope.progressbar.complete();
                if (data.data.length === 0) {
                    $scope.dailyReport = [];
                    return toastr.success("Chưa có dữ liệu cho ngày này");
                }
                $scope.dailyReport = data.data;
                // console.log($scope.dailyReport)
            });
        };

        $scope.dateChanged = alert;
        if ($scope.dailyReport.length === 0) {
            var start = new Date().setHours(0, 0, 0, 0) - 24 * 60 * 1000,
                end = new Date().setHours(23, 59, 59, 999) - 24 * 60 * 1000;
            // console.log(start)
            API.getReport(start, end, function (data) {
                $scope.progressbar.complete();
                // console.log(data.data.length ==)
                if (data.data.length === 0) return; //toastr.success("Chưa có dữ liệu cho ngày này")
                $scope.dailyReport = data;
            });
        }

        if ($scope.weeklyReport.length === 0) {
            var start = new Date().setHours(0, 0, 0, 0) - 7 * 24 * 60 * 60 * 1000,
                end = new Date().setHours(23, 59, 59, 999) - 24 * 60 * 60 * 1000;
            API.getReport(start, end, function (data) {
                // console.log(data.data.length ==)
                // console.log(data)
                $scope.progressbar.complete();
                if (data.data.length === 0) return; //toastr.success("Chưa có dữ liệu cho ngày này")
                $scope.weeklyReport = data;
            });
        }
    }
    app.directive('dateReport', function (API, $timeout, baConfig, Utils) {
        return {
            restrict: 'A',
            link: function link($scope, element, attrs) {
                $scope.reports = {
                    temp: {
                        max: {
                            value: '30°C',
                            time: new Date().toLocaleTimeString()
                        },
                        avg: {
                            value: '28°C',
                            time: new Date().toLocaleTimeString()
                        },
                        min: {
                            value: '18°C',
                            time: new Date().toLocaleTimeString()
                        }
                    },
                    hum: {
                        max: {
                            value: '92%',
                            time: new Date().toLocaleTimeString()
                        },
                        avg: {
                            value: '76%',
                            time: new Date().toLocaleTimeString()
                        },
                        min: {
                            value: '69%',
                            time: new Date().toLocaleTimeString()
                        }
                    },
                    aqi: {
                        max: {
                            value: '4',
                            time: new Date().toLocaleTimeString()
                        },
                        avg: {
                            value: '3.2',
                            time: new Date().toLocaleTimeString()
                        },
                        min: {
                            value: '2',
                            time: new Date().toLocaleTimeString()
                        }
                    }
                };
            }
        };
    });

    app.directive('weekReport', function (API, $timeout, baConfig, Utils) {
        return {
            restrict: 'A',
            link: function link($scope, element, attrs) {
                $scope.reports = {
                    temp: {
                        max: {
                            value: '30°C',
                            time: new Date().toLocaleString()
                        },
                        avg: {
                            value: '28°C',
                            time: new Date().toLocaleString()
                        },
                        min: {
                            value: '18°C',
                            time: new Date().toLocaleString()
                        }
                    },
                    hum: {
                        max: {
                            value: '92%',
                            time: new Date().toLocaleString()
                        },
                        avg: {
                            value: '76%',
                            time: new Date().toLocaleString()
                        },
                        min: {
                            value: '69%',
                            time: new Date().toLocaleString()
                        }
                    },
                    aqi: {
                        max: {
                            value: '4',
                            time: new Date().toLocaleString()
                        },
                        avg: {
                            value: '3.2',
                            time: new Date().toLocaleString()
                        },
                        min: {
                            value: '2',
                            time: new Date().toLocaleString()
                        }
                    }
                };
            }
        };
    });
})();