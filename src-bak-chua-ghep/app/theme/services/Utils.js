/**
 * @author n.poltoratsky
 * created on 27.06.2016
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.theme')
        .factory('Utils', Utils);

    /** @ngInject */
    function Utils(baConfig, layoutPaths) {
        this.generateChartData = function (min, max) {
            var chartData = [];
            var firstDate = new Date();
            firstDate.setDate(firstDate.getDate() - 150);
            var ran = function (min, max) {
                return parseFloat((Math.random() * (max - min) + min).toFixed(1));
            }
            for (var i = 0; i < 23; i++) {
                // we create date objects here. In your data, you can have date strings
                // and then set format of your dates using chart.dataDateFormat property,
                // however when possible, use date objects, as this will speed up chart rendering.
                var newDate = new Date(firstDate);
                newDate.setHours(i);

                chartData.push({
                    date: newDate,
                    max: ran(max - 3, max + 3),
                    min: ran(min, min + 3),
                    avg: ran(min + 4, max - 4),
                    ok1: min,
                    ok2: (min + max) / 2
                });
            }
            return chartData;
        }

        this.ran = function (min, max) {
            return parseFloat((Math.random() * (max - min) + min).toFixed(1));
        }

        // {
        //     dataDateFormat : "JJ:HH:SS",
        //     axis : [
        //         {title : 'Nhiệt độ', position : "left"}
        //     ],
        //     graphs : [
        //         valueAxis : 'v1',
        //         title: 'nhiệt độ cao nhất',
        //         valueField : 'max'
        //     ],
        //     categoryField: "date",
        //     dataProvider : []
        // }
        this.buildChartOptions = function (data) {
            var layoutColors = baConfig.colors;
            var ret = {
                "type": "serial",
                "theme": "none",
                "color": layoutColors.defaultText,
                "dataDateFormat": data.dataDateFormat,
                "precision": 2,
                "valueAxes": [],
                "graphs": [],
                "chartScrollbar": {
                    "graph": "g1",
                    "oppositeAxis": false,
                    "offset": 30,
                    gridAlpha: 0,
                    color: layoutColors.defaultText,
                    scrollbarHeight: 50,
                    backgroundAlpha: 0,
                    selectedBackgroundAlpha: 0.05,
                    selectedBackgroundColor: layoutColors.defaultText,
                    graphFillAlpha: 0,
                    autoGridCount: true,
                    selectedGraphFillAlpha: 0,
                    graphLineAlpha: 0.2,
                    selectedGraphLineColor: layoutColors.defaultText,
                    selectedGraphLineAlpha: 1
                },
                "chartCursor": {
                    "pan": true,
                    "cursorColor": layoutColors.danger,
                    "valueLineEnabled": true,
                    "valueLineBalloonEnabled": true,
                    "cursorAlpha": 0,
                    "valueLineAlpha": 0.2,
                    "categoryBalloonDateFormat": data.dataDateFormat
                },
                "categoryField": data.categoryField,
                "categoryAxis": {
                    "axisColor": layoutColors.defaultText,
                    "color": layoutColors.defaultText,
                    "gridColor": layoutColors.defaultText,
                    "parseDates": true,
                    "dashLength": 1,
                    "minorGridEnabled": true,
                    "minPeriod": data.minPeriod ? data.minPeriod : data.dataDateFormat.slice(-2).toLowerCase(),
                },
                "legend": {
                    "useGraphSettings": true,
                    "position": "top",
                    "color": layoutColors.defaultText
                },
                "balloon": {
                    "borderThickness": 1,
                    "shadowAlpha": 0
                },
                "export": {
                    "enabled": true,
                    "dateFormat": data.dataDateFormat
                },
                "dataProvider": data.dataProvider,
                pathToImages: layoutPaths.images.amChart
            }

            for (var i in data.axis) {
                var obj = data.axis[i];
                ret.valueAxes.push({
                    color: layoutColors.defaultText,
                    axisColor: layoutColors.defaultText,
                    gridColor: layoutColors.defaultText,
                    "id": "v" + i,
                    "title": obj.title,
                    "position": obj.position,
                    "autoGridCount": false
                });
            }

            for (var i in data.graphs) {
                var obj = data.graphs[i];
                ret.graphs.push({
                    "id": "g" + i,
                    "valueAxis": obj.valueAxis ? obj.valueAxis : 'v1',
                    color: layoutColors.defaultText,
                    "bullet": "round",
                    "bulletBorderAlpha": 1,
                    "bulletColor": layoutColors.defaultText,
                    "bulletSize": 5,
                    "hideBulletsCount": 50,
                    "lineThickness": 2,
                    "lineColor": obj.lineColor ? obj.lineColor : layoutColors.success,
                    "type": "smoothedLine",
                    "dashLength": 5,
                    "title": obj.title,
                    "useLineColorForBulletBorder": true,
                    "valueField": obj.valueField,
                    "balloonText": "[[title]]<br/><b style='font-size: 130%'>[[value]]</b>"
                })
            }

            return ret;
        }
        return this;
    }

})();