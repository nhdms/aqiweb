(function () {
    'use strict';

    var app = angular.module('BlurAdmin.pages.hardware')
    .controller('HardwareCtrl', HardwareCtrl);

    /** @ngInject */
    function HardwareCtrl($scope, $filter, editableOptions, editableThemes, baConfig, layoutPaths, Utils, $timeout, ngProgressFactory,PROGRESSBAR_COLOR, API, $rootScope, toastr) {
        $scope.locations = []
        $scope.roots = []
        $scope.nodes = []
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
                API.getInfo('nodes', null, function (res) {
                    if (res.success) {
                        $scope.nodes = res.data;
                        $scope.currentNode = $scope.nodes[0];
                        $rootScope.nodes = $scope.nodes;
                        $scope.nodes.map(function(node) {
                            node.location =  node.current_location.latitude + '-' + node.current_location.longitude
                            return node
                        })
                        $scope.progressbar.complete();
                    } else {
                        toastr.error(res.msg || "Không tìm thấy node", "Lỗi");
                        $scope.progressbar.complete();
                    }
                });
            } else {
                // toastr.error(res.msg || "Không tìm thấy location", "Lỗi");
                API.getInfo('nodes', null, function (res) {
                    if (res.success) {
                        $scope.nodes = res.data;
                        $scope.currentNode = $scope.nodes[0];
                        $rootScope.nodes = $scope.nodes;
                        $scope.nodes.map(function(node) {
                            node.location =  node.current_location.latitude + '-' + node.current_location.longitude
                            return node
                        })
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
            API.getSafeRange(function(res){
              $rootScope.safeRange = res.data
          })
        }

        $scope.close = function(row, i) {
            row.$cancel();
            $scope.sensors.splice(i, 1);
        }

        $scope.addHW = function(hw,type, e) {
            if (!hw.name) {
                e.preventDefault();
                toastr.warning("Không được bỏ trống tên " + type +"!");
            }
            if ('node' == type && !!!hw.rootId && !!$scope.currentLocation) hw.lid = $scope.currentLocation._id
                if ('sensor' == type) hw.nodeId = document.getElementById('select_node').value
            // console.log(hw)
        API.save(type + 's', hw, function(res) {
            if (!res.data.success) return toastr.error(res.data.msg);
            toastr.success("Thêm " + type + " " + hw.name + " thành công!");
        });
    }
    $scope.isMobile = (/android|webos|iphone|ipad|ipod|blackberry|windows phone/).test(navigator.userAgent.toLowerCase());

    $scope.detect = function(index, id, e, z) {
        // alert(id)
        var type = document.getElementById('device-type').value;

        if ('nodes' === type && $scope.isMobile && navigator.geolocation) {
            // e.stopPropagation()
            // e.preventDefault()
            var cf = !z ? confirm('Xác định location bằng GPS?') : true
            var obj = {
                _id: id
            }
            if (cf) {
                navigator.geolocation.getCurrentPosition(function(coord) {
                    obj.location = coord.coords.latitude + '-' + coord.coords.longitude
                    API.update(type, obj, function (res) {
                        if (!res.data.success) {
                            return toastr.error(res.data.msg, "Lỗi");
                        } else {
                            return toastr.success("Update node location successfully!163.44.192.217")
                        }
                    }); 
                    $scope.nodes[index]['current_location'] = {
                        latitude: coord.coords.latitude,
                        longitude: obj.longitude
                    }

                    $scope.nodes[index]['location'] = coord.coords.latitude + '-' + coord.coords.longitude
                });
            }
        }
    }


    $scope.submitItem = function (node, $data, $form) {
            // alert()
            if (!node._id) return;
            var type = document.getElementById('device-type').value;
            // console.dir(type, type.value)
            // return;            
            var field = $form.$editables["0"].name;
            // node[field] = $data;
            // var obj 
            if ('nodes' === type) {
                field = $form.$editables["0"].name.split('.').slice(-1)[0]
                var obj = {}
                obj._id = node._id
                obj[field] = $data
                // node._id = node
                API.update(type, obj, function (res) {
                    if (!res.data.success) {
                        return toastr.error(res.data.msg, "Lỗi");
                    }

                    return toastr.success("Update thành công");
                });
            } else {
                API.update(type, node, function (res) {
                    if (!res.data.success) {
                        return toastr.error(res.data.msg, "Lỗi");
                    }

                    return toastr.success("Update thành công");
                });
            }
        }

        $scope.remove = function (type, id, index) {
            // console.log(type, id, index)
            if (!id) return $scope[type].splice(index, 1);
            var ok = confirm('Bạn có chắc chắn muốn xóa ' + type + ' này');
            if (ok)
                API.remove(type, id, function (res) {
                    console.log(res.data.success);
                    if (!res.data.success) {
                        return toastr.error("Thử lại", "Lỗi");
                    }
                    toastr.success("Xóa thành công", "");
                    $scope[type].splice(index, 1);
                });
        }

        $scope.addSensorsRow = function () {
            $scope.inserted = {
                name: '',
                type: 1,
                description: '',
                nodeId : document.getElementById('select_node').value
            };
            $scope.sensors.push($scope.inserted);
        }

        $scope.addNodesRow = function () {
            $scope.inserted = {
                name: 'tên node',
                description: '',
                rootId: '',
            };
            $scope.nodes.push($scope.inserted);
        }

        $scope.getAllSensors = function () {
            var nodeId = document.getElementById('select_node').value;
            // var rootId = document.getElementById('select_root').value;
            API.getChildInfo('sensors', 'node', nodeId, function (res) {
                // console.log(res)
                if (res.success)
                    $scope.sensors = res.data;
                else
                    toastr.error(res.msg || "Không tìm thấy sensor");
            });
        }
    }
})();
