/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    var app = angular.module('BlurAdmin.pages.statistics')
        .controller('StatisticCtrl', StatisticCtrl);

    /** @ngInject */
    function StatisticCtrl($scope, $filter, editableOptions, editableThemes, baConfig,toastr, layoutPaths, Utils, $timeout, $rootScope,PROGRESSBAR_COLOR, API, ngProgressFactory) {
        
        $rootScope.$on('$stateChangeStart', 
            function(event, toState, toParams, fromState, fromParams){ 
                // do something
                $scope.items = []
            }
        )
        $scope.progressbar = ngProgressFactory.createInstance();
        $scope.progressbar.setColor(PROGRESSBAR_COLOR);
        if (!$rootScope.safeRange) {
            API.getSafeRange(function (res) {
                $rootScope.safeRange = res.data
            })
        }

        $scope.labels = ['Nhiệt độ','Chất lượng không khí', 'Độ ẩm']
        $scope.btnStatistic = function (type) {
            // console.log();
            //    console.log($scope.datePicker.dt.setHours(0,0,0,0), $scope.currentNode); 
            var obj = {
                nodeId: document.getElementById('select_node').value,
                date: $scope.datePicker.dt.getTime()
            }
            var ok = 0;
            // var hum = obj, aqi = obj, temp = 
            // console.log(Utils.generateChartData(0,3));
            $scope.progressbar.start();
            API.getData(obj, 2, function (err, response) {
                // if (response.data.success)
                console.log(response) 
                ok++;
                if (ok === 3) $scope.progressbar.complete();                
                if (err) return toastr.error(err, "Lỗi");                
                var range = $rootScope.safeRange[2];
                var values = response.map(function (item) {
                    item.date = new Date(new Date(item.date).setHours(item._id));
                    return item;
                });
                AmCharts.makeChart('hum-chart', Utils.buildChartOptions(Utils.getStatisticChartOptions({ title: 'Độ ẩm', value: values.sort(function(a,b) {return a._id - b._id}), range: { min: range[0], max: range[1] } })))
            });

            API.getData(obj, 0, function (err, response) {
                // console.log(response)
                // if (response.data.success)
                ok++;
                if (ok === 3) $scope.progressbar.complete();                
                if (err) return toastr.error(err, "Lỗi");
                var range = $rootScope.safeRange[0];
                var values = response.map(function (item) {
                    // item.ok1 = range[0];
                    item.date = new Date(new Date(item.date).setHours(item._id));
                    // item.ok2 = range[1];
                    return item;
                });
                // console.log(values[0], Utils.generateChartData(20,30)[0])
                // var opts = 
                AmCharts.makeChart('temp-chart', Utils.buildChartOptions(Utils.getStatisticChartOptions({ title: 'Nhiệt độ', value: values.sort(function(a,b) {return a._id - b._id}), range: { min: range[0], max: range[1] } })))
                // AmCharts.makeChart('temp-chart', Utils.buildChartOptions(Utils.getTempChartOptions(values)));

            });

            API.getData(obj, 1, function (err, response) {
                // console.log(response)
                // if (response.data.success)
                ok++;
                if (ok === 3) $scope.progressbar.complete();                
                if (err) return toastr.error(err, "Lỗi");                
                var range = $rootScope.safeRange[1];
                var values = response.map(function (item) {
                    // item.ok1 = range[0];
                    // item.ok2 = range[1];
                    item.date = new Date(new Date(item.date).setHours(item._id));
                    // item.date = new Date(item.date)
                    return item;
                });
                // AmCharts.makeChart('aqi-chart', Utils.buildChartOptions(Utils.getAqiChartOptions(values)));
                AmCharts.makeChart('aqi-chart', Utils.buildChartOptions(Utils.getStatisticChartOptions({ title: 'Chỉ số không khí', value: values.sort(function(a,b) {return a._id - b._id}), range: { min: range[0], max: range[1] } })))
            });
            //    var chart = AmCharts.makeChart('temp-chart', Utils.buildChartOptions(temp));
            //             var chart = AmCharts.makeChart('aqi-chart', Utils.buildChartOptions(aqi));
        }

        $scope.dailyStatistic = function () {
            $scope.progressbar.start();
            var sensor = document.getElementById('select_sensor');
            var type = +sensor.value || 0
            var obj = {
                start: $scope.datePicker.dt.getTime(),
                end: $scope.datePicker.dt2.getTime(),
                nodeId: document.getElementById('select_node').value,
                type: type
            }

            API.getMonthData(obj, function (err, data) {
                $scope.progressbar.complete();                
                if (err) return toastr.error(err, "Lỗi");                
                data = data.map(function (i) {
                    i.date = new Date(i._id);
                    return i;
                });
                // console.log(data)
                var opts = Utils.getStatisticChartOptions({
                    title: $scope.labels[type],
                    value: data,
                    range: {
                        min: $rootScope.safeRange[type][0],
                        max: $rootScope.safeRange[type][1]
                    }
                })

                opts.dataDateFormat = "YYYY-MM-DD";
                opts.minPeriod = "DD";
                AmCharts.makeChart('div-chart', Utils.buildChartOptions(opts));
            });
            // var opts = (1 == type) ? Utils.getTempChartOptions()
        }

        $scope.pageLength = 0;

        $scope.tableStatistic = function (page) {
            $scope.progressbar.start();
            $scope.currentPage = page;
            var sensor = document.getElementById('select_sensor');
            var type = +sensor.value || 0
            // console.log();
            var obj = {
                start: $scope.datePicker.dt.getTime(),
                end: $scope.datePicker.dt2.getTime(),
                nodeId: document.getElementById('select_node').value,
                // sensorId: sensor.value,
                type: type,
                page: page
            };

            // $scope.currentPage = obj.page;
            API.getTableData(obj, function (err, data, pages) {
                // console.log(data, pages, $rootScope.safeRange)
                $scope.progressbar.complete();                
                if (err) return toastr.error(err, "Lỗi");                
                $scope.pageLength = pages;
                data = data.map(function (i) {
                    i.unit = (0 == i.type ? '°C' : (2 == i.type) ? '%' : '');
                    var range = $rootScope.safeRange[i.type];
                    i.status = (i.value < range[0] || i.value > range[1] ? 'app/status/bad.png' : 'app/status/ok.png');
                    return i;
                });
                $scope.items = data;
                

                // console.log($scope.items)
                // $scope.pages = createPagesArray(obj.page);
                // if ($scope.pageLength - $scope.currentPage >= 7) {
                var start = ($scope.pageLength - $scope.currentPage >= 7 ? $scope.currentPage : $scope.pageLength - 7);
                var len = $scope.pageLength > 7 ? 7 : $scope.pageLength;
                $scope.pages = Array(len).fill().map(function (x, i) {
                    return i + start;
                });
                // }
            })
        }

        // function getTable
        // DatePicker
        $scope.datePicker = {
            dt: new Date('Fri Sep 09 2016 00:00:00 GMT+0700 (SE Asia Standard Time)'),
            dt2: new Date(),
            open: open,
            open2: open2,
            opened: false,
            opened2: false,
            format: 'dd/MM/yyyy',
            options: {
                showWeeks: false
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
        var loaded = 0;
        if ($rootScope.nodes && $rootScope.nodes.length > 0) {
            $scope.nodes = $rootScope.nodes;
            $scope.currentNode = $scope.nodes[0];
            loaded++;
            if (loaded == 2) $scope.progressbar.complete();
        } else {
            $scope.progressbar.start();        
            API.getInfo('nodes', null, function (res) {
                if (res.success) {
                    $scope.nodes = res.data;
                    $scope.currentNode = $scope.nodes[1];
                    $rootScope.nodes = $scope.nodes;
                }
                $scope.progressbar.complete();
            });
        }

        $scope.progressbar.start();                
        API.getInfo('sensors', null, function (res) {
            $scope.progressbar.complete();
            if (res.success) {
                $scope.sensors = res.data;
                $scope.currentSensor = $scope.sensors[0];
                $rootScope.sensors = $scope.sensors;
            }
        });

        $scope.harmStatistic = function (page) {
            $scope.progressbar.start();
            $scope.currentPage = +page;
            var sensor = document.getElementById('select_sensor');
            var type = +sensor.value || 0;

            // console.log();
            var obj = {
                start: $scope.datePicker.dt.getTime(),
                end: $scope.datePicker.dt2.getTime(),
                nodeId: document.getElementById('select_node').value,
                // sensorId: sensor.value,
                type: type,
                page: page,
                range: $rootScope.safeRange[type].join(',')
            };

            // $scope.currentPage = obj.page;
            // console.log(obj)
            // alert()
            API.getTableData(obj, function (err, data, pages) {
                // console.log(data, pages)
                $scope.progressbar.complete();                
                if (err) return toastr.error(err, "Lỗi");                
                $scope.pageLength = pages;
                data = data.map(function (i) {
                    i.unit = (0 == i.type ? '°C' : (2 == i.type) ? '%' : '');
                    i.status = 'app/status/bad.png';
                    return i;
                });
                $scope.items = data;
                // $scope.pages = createPagesArray(obj.page);
                // if ($scope.pageLength - $scope.currentPage >= 7) {
                var start = ($scope.pageLength - $scope.currentPage >= 7 ? $scope.currentPage : $scope.pageLength - 7);
                var len = $scope.pageLength > 7 ? 7 : $scope.pageLength;
                $scope.pages = Array(len).fill().map(function (x, i) {
                    return i + start;
                });
                // }
            })
        }
    }
})();
