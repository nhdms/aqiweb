/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    var app = angular.module('BlurAdmin.pages.hardware')
        .controller('HardwareCtrl', HardwareCtrl);

    /** @ngInject */
    function HardwareCtrl($scope, $filter, editableOptions, editableThemes, baConfig, layoutPaths, Utils, $timeout) {
        editableOptions.theme = 'bs3';
        editableThemes['bs3'].submitTpl = '<button type="submit" class="btn btn-primary btn-with-icon"><i class="ion-checkmark-round"></i></button>';
        editableThemes['bs3'].cancelTpl = '<button type="button" ng-click="$form.$cancel()" class="btn btn-default btn-with-icon"><i class="ion-close-round"></i></button>';

        $scope.showRoots = function (node) {
            // if (node.root && $scope.groups.length) {
            //     var selected = $filter('filter')($scope.groups, { id: user.group });
            //     return selected.length ? selected[0].text : 'Not set';
            // } else return 'Not set'
        };
    }

    app.directive('nodeDirective', function (API, $timeout, baConfig, Utils) {
        return {
            restrict: 'A',
            link: function ($scope, element, attrs) {
                $scope.locations = [
                    {
                        id: 'hnptit',
                        name: 'PTIT'
                    },
                    {
                        id: 'hnbk',
                        name: 'BK'
                    },
                    {
                        id: 'hntl',
                        name: 'TLU'
                    }
                ];

                $scope.roots = [
                    {
                        id: 'f1',
                        name: 'ROOT R1',
                        loc: 'hnptit',
                        description: 'mô tả'
                    },
                    {
                        id: 'f2',
                        name: 'ROOT XX2',
                        loc: 'hnptit',
                    },
                    {
                        id: 'f3',
                        name: 'ROOT XX3',
                        loc: 'hnptit'
                    },
                    {
                        id: 'f4',
                        name: 'ROOT EW',
                        loc: 'hnbk'
                    },
                    {
                        id: 'f5',
                        name: 'ROOT EWWC',
                        loc: 'hnbk'
                    },
                    {
                        id: 'f8',
                        name: 'ROOT SFC',
                        loc: 'hntl'
                    }
                ];

                $scope.currentLoc = $scope.locations[0];

                $scope.nodes = [
                    {
                        id: 'f1',
                        name: 'NODE R1',
                        loc: 'hnptit',
                        description: 'mô tả'
                    },
                    {
                        id: 'f2',
                        name: 'NODE R2',
                        loc: 'hnptit',
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
            }
        };
    });
    app.directive('rootDirective', function (API, $timeout, baConfig, Utils) {
        return {
            restrict: 'A',
            link: function ($scope, element, attrs) {
                $scope.locations = [
                    {
                        id: 'hnptit',
                        name: 'PTIT'
                    },
                    {
                        id: 'hnbk',
                        name: 'BK'
                    },
                    {
                        id: 'hntl',
                        name: 'TLU'
                    }
                ];

                $scope.currentLoc = $scope.locations[0];

                $scope.roots = [
                    {
                        id: 'f1',
                        name: 'ROOT R1',
                        loc: 'hnptit',
                        description: 'mô tả'
                    },
                    {
                        id: 'f2',
                        name: 'ROOT XX2',
                        loc: 'hnptit',
                    },
                    {
                        id: 'f3',
                        name: 'ROOT XX3',
                        loc: 'hnptit'
                    },
                    {
                        id: 'f4',
                        name: 'ROOT EW',
                        loc: 'hnbk'
                    },
                    {
                        id: 'f5',
                        name: 'ROOT EWWC',
                        loc: 'hnbk'
                    },
                    {
                        id: 'f8',
                        name: 'ROOT SFC',
                        loc: 'hntl'
                    }
                ];
            }
        };
    });


    app.directive('sensorDirective', function (API, $timeout, baConfig, Utils) {
        return {
            restrict: 'A',
            link: function ($scope, element, attrs) {
                $scope.locations = [
                    {
                        id: 'hnptit',
                        name: 'PTIT'
                    },
                    {
                        id: 'hnbk',
                        name: 'BK'
                    },
                    {
                        id: 'hntl',
                        name: 'TLU'
                    }
                ];

                $scope.roots = [
                    {
                        id: 'f1',
                        name: 'ROOT R1',
                        loc: 'hnptit',
                        description: 'mô tả'
                    },
                    {
                        id: 'f2',
                        name: 'ROOT XX2',
                        loc: 'hnptit',
                    },
                    {
                        id: 'f3',
                        name: 'ROOT XX3',
                        loc: 'hnptit'
                    },
                    {
                        id: 'f4',
                        name: 'ROOT EW',
                        loc: 'hnbk'
                    },
                    {
                        id: 'f5',
                        name: 'ROOT EWWC',
                        loc: 'hnbk'
                    },
                    {
                        id: 'f8',
                        name: 'ROOT SFC',
                        loc: 'hntl'
                    }
                ];

                $scope.currentLoc = $scope.locations[0];
                $scope.currentRoot = $scope.roots[0];

                $scope.nodes = [
                    {
                        id: 'f1',
                        name: 'NODE R1',
                        loc: 'hnptit',
                        description: 'mô tả'
                    },
                    {
                        id: 'f2',
                        name: 'NODE R2',
                        loc: 'hnptit',
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
                        id : 's1',
                        name : 'Air Quality Sensor v1.3',
                        description : 'Cảm biến đo chất lượng không khi',
                    },
                    {
                        id : 's2',
                        name : 'Temperature DHT Sensor',
                        description : 'Cảm biến đo nhiệt độ',
                    },
                    {
                        id : 's31',
                        name : 'Humidity DHT Sensor',
                        description : 'Cảm biến đo độ ẩm',
                    }
                ]
            }
        };
    });
})();
