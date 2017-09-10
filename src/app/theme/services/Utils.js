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

        this.buildChartOptions = function (data) {
            console.log(data.dataProvider)
            var layoutColors = baConfig.colors;
            var ret = {
                "type": "serial",
                "theme": "none",
                "color": layoutColors.defaultText,
                "dataDateFormat": data.dataDateFormat,
                "precision": 2,
                "valueAxes": [
                    
                ],
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
                    "includeGuidesInMinMax": true,
                    "id": "v" + i,
                    "title": obj.title,
                    "position": obj.position,
                    "autoGridCount": false,
                    guides: [{
                        "fillAlpha": 0.3,
                        "fillColor": "#c6ffb3",
                        "lineAlpha": 0.3,
                        "toValue": data.range.max || 0,
                        "value": data.range.min || 0,
                        "label": "Ngưỡng an toàn",
                        "inside": true
                    }]
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


        // {title: title, }
        this.getRealTimeChartOptions = function(data) {
            var layoutColors = baConfig.colors;

            return {
                dataDateFormat: "JJ:NN:SS",
                axis: [
                    { title: data.title, position: "left" }
                ],
                graphs: [
                {
                    valueAxis: 'v1',
                    title: 'Giá trị hiện tại',
                    valueField: 'value',
                    lineColor: layoutColors.danger
                }
                ],
                categoryField: "date",
                minPeriod: "ss",
                dataProvider: [],
                range: {
                    min: data.min,
                    max: data.max
                }
            }
        }
        // {title, values, range:{min, max}}
        this.getStatisticChartOptions = function(data) {
            // console.log(data)
            var layoutColors = baConfig.colors;

            return {
                dataDateFormat: "JJ:NN:SS",
                axis: [
                    { title: data.title, position: "left" }
                ],
                graphs: [{
                    valueAxis: 'v1',
                    title: data.title + ' cao nhất',
                    valueField: 'max',
                    lineColor: layoutColors.danger
                },
                {
                    valueAxis: 'v1',
                    title: data.title + ' trung bình',
                    valueField: 'avg',
                    lineColor: layoutColors.warning
                },
                {
                    valueAxis: 'v1',
                    title: data.title + ' thấp nhất',
                    valueField: 'min',
                    lineColor: layoutColors.info
                },
                ],
                categoryField: "date",
                minPeriod: "hh",
                dataProvider: data.value,
                range: data.range
            }
        }
        return this;
    }

})();