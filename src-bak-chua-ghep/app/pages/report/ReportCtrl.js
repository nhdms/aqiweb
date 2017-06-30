/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    var app = angular.module('BlurAdmin.pages.report')
        .controller('ReportCtrl', ReportCtrl);

    /** @ngInject */
    function ReportCtrl($scope, $filter, editableOptions, editableThemes, baConfig, layoutPaths, Utils, $timeout) {
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
