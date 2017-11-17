'use strict';

/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    var app = angular.module('BlurAdmin.pages.hardware').controller('HardwareCtrl', HardwareCtrl);

    /** @ngInject */
    function HardwareCtrl($scope, $filter, editableOptions, editableThemes, baConfig, layoutPaths, Utils, $timeout, ngProgressFactory, PROGRESSBAR_COLOR, API, $rootScope, toastr) {
        $scope.locations = [];
        $scope.roots = [];
        $scope.nodes = [];
        $scope.progressbar = ngProgressFactory.createInstance();
        $scope.progressbar.setColor(PROGRESSBAR_COLOR);
        $scope.progressbar.start();
        $scope.sensors = [];
        $scope.type = 'sensors';
        editableOptions.theme = 'bs3';
        editableThemes['bs3'].submitTpl = '<button type="submit" ng-click="submitItem(node, $data, $form)" class="btn btn-primary btn-with-icon"><i class="ion-checkmark-round"></i></button>';
        editableThemes['bs3'].cancelTpl = '<button type="button" ng-click="$form.$cancel()" class="btn btn-default btn-with-icon"><i class="ion-close-round"></i></button>';

        API.getInfo('locations', null, function (res) {
            if (res.success && res.data.length) {
                $scope.locations = res.data;
                $scope.currentLocation = $scope.locations[0];
                $rootScope.locations = $scope.locations;
                API.getInfo('roots', null, function (res) {
                    if (res.success && res.data.length) {
                        // res.data.push({name: 'node độc lập'})
                        $scope.roots = res.data;
                        $rootScope.roots = $scope.roots;
                        $scope.currentRoot = $scope.roots[0];
                        API.getInfo('nodes', null, function (res) {
                            if (res.success) {
                                $scope.nodes = res.data;
                                $scope.currentNode = $scope.nodes[0];
                                $rootScope.nodes = $scope.nodes;
                                $scope.progressbar.complete();
                            } else {
                                toastr.error(res.msg || "Không tìm thấy node", "Lỗi");
                                $scope.progressbar.complete();
                            }
                        });
                    } else {
                        toastr.error(res.msg || "Không tìm thấy root", "Lỗi");
                        $scope.progressbar.complete();
                        API.getInfo('nodes', null, function (res) {
                            if (res.success) {
                                $scope.nodes = res.data;
                                $scope.currentNode = $scope.nodes[0];
                                $rootScope.nodes = $scope.nodes;
                                $scope.progressbar.complete();
                            } else {
                                toastr.error(res.msg || "Không tìm thấy node", "Lỗi");
                                $scope.progressbar.complete();
                            }
                        });
                    }
                });
            } else {
                // toastr.error(res.msg || "Không tìm thấy location", "Lỗi");
                API.getInfo('nodes', null, function (res) {
                    if (res.success) {
                        $scope.nodes = res.data;
                        $scope.currentNode = $scope.nodes[0];
                        $rootScope.nodes = $scope.nodes;
                        $scope.progressbar.complete();
                    } else {
                        toastr.error(res.msg || "Không tìm thấy node", "Lỗi");
                        $scope.progressbar.complete();
                    }
                });
                // $scope.progressbar.complete();
            }
        });

        if (!$rootScope.safeRange) {
            API.getSafeRange(function (res) {
                $rootScope.safeRange = res.data;
            });
        }

        $scope.close = function (row, i) {
            row.$cancel();
            $scope.sensors.splice(i, 1);
        };

        $scope.addHW = function (hw, type, e) {
            if (!hw.name) {
                e.preventDefault();
                toastr.warning("Không được bỏ trống tên " + type + "!");
            }
            if ('node' == type && !!!hw.rootId && !!$scope.currentLocation) hw.lid = $scope.currentLocation._id;
            if ('sensor' == type) hw.nodeId = document.getElementById('select_node').value;
            // console.log(hw)
            API.save(type + 's', hw, function (res) {
                if (!res.data.success) return toastr.error(res.data.msg);
                toastr.success("Thêm " + type + " " + hw.name + " thành công!");
            });
        };

        $scope.submitItem = function (node, $data, $form) {
            if (!node._id) return;
            var type = document.getElementById('device-type').value;
            // console.dir(type, type.value)
            // return;            
            var field = $form.$editables["0"].attrs.field;
            node[field] = $data;

            API.update(type, node, function (res) {
                if (!res.data.success) {
                    return toastr.error(res.data.msg, "Lỗi");
                }
                return toastr.success("Update thành công");
            });
        };

        $scope.remove = function (type, id, index) {
            // console.log(type, id, index)
            if (!id) return $scope[type].splice(index, 1);
            var ok = confirm('Bạn có chắc chắn muốn xóa ' + type + ' này');
            if (ok) API.remove(type, id, function (res) {
                console.log(res.data.success);
                if (!res.data.success) {
                    return toastr.error("Thử lại", "Lỗi");
                }
                toastr.success("Xóa thành công", "");
                $scope[type].splice(index, 1);
            });
        };

        $scope.addSensorsRow = function () {
            $scope.inserted = {
                name: '',
                type: 1,
                description: '',
                nodeId: document.getElementById('select_node').value
            };
            $scope.sensors.push($scope.inserted);
        };

        $scope.addNodesRow = function () {
            $scope.inserted = {
                name: 'tên node',
                description: '',
                rootId: ''
            };
            $scope.nodes.push($scope.inserted);
        };

        $scope.getAllSensors = function () {
            var nodeId = document.getElementById('select_node').value;
            // var rootId = document.getElementById('select_root').value;
            API.getChildInfo('sensors', 'node', nodeId, function (res) {
                // console.log(res)
                if (res.success) $scope.sensors = res.data;else toastr.error(res.msg || "Không tìm thấy sensor");
            });
        };
    }
})();