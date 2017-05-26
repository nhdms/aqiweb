/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard', [])
      .config(routeConfig)
      .controller('DashboardController', dashboardController);

  /** @ngInject */
  function routeConfig($stateProvider, baConfigProvider) {
    var layoutColors = baConfigProvider.colors;
    AmCharts.themes.blur = {

      themeName: "blur",

      AmChart: {
        color: layoutColors.defaultText,
        backgroundColor: "#FFFFFF"
      },

      AmCoordinateChart: {
        colors: [layoutColors.primary, layoutColors.danger, layoutColors.warning, layoutColors.success, layoutColors.info, layoutColors.primaryDark, layoutColors.warningLight, layoutColors.successDark, layoutColors.successLight, layoutColors.primaryLight, layoutColors.warningDark]
      },

      AmStockChart: {
        colors: [layoutColors.primary, layoutColors.danger, layoutColors.warning, layoutColors.success, layoutColors.info, layoutColors.primaryDark, layoutColors.warningLight, layoutColors.successDark, layoutColors.successLight, layoutColors.primaryLight, layoutColors.warningDark]
      },

      AmSlicedChart: {
        colors: [layoutColors.primary, layoutColors.danger, layoutColors.warning, layoutColors.success, layoutColors.info, layoutColors.primaryDark, layoutColors.warningLight, layoutColors.successDark, layoutColors.successLight, layoutColors.primaryLight, layoutColors.warningDark],
        labelTickColor: "#FFFFFF",
        labelTickAlpha: 0.3
      },

      AmRectangularChart: {
        zoomOutButtonColor: '#FFFFFF',
        zoomOutButtonRollOverAlpha: 0.15,
        zoomOutButtonImage: "lens.png"
      },

      AxisBase: {
        axisColor: "#FFFFFF",
        axisAlpha: 0.3,
        gridAlpha: 0.1,
        gridColor: "#FFFFFF"
      },

      ChartScrollbar: {
        backgroundColor: "#FFFFFF",
        backgroundAlpha: 0.12,
        graphFillAlpha: 0.5,
        graphLineAlpha: 0,
        selectedBackgroundColor: "#FFFFFF",
        selectedBackgroundAlpha: 0.4,
        gridAlpha: 0.15
      },

      ChartCursor: {
        cursorColor: layoutColors.primary,
        color: "#FFFFFF",
        cursorAlpha: 0.5
      },

      AmLegend: {
        color: "#FFFFFF"
      },

      AmGraph: {
        lineAlpha: 0.9
      },
      GaugeArrow: {
        color: "#FFFFFF",
        alpha: 0.8,
        nailAlpha: 0,
        innerRadius: "40%",
        nailRadius: 15,
        startWidth: 15,
        borderAlpha: 0.8,
        nailBorderAlpha: 0
      },

      GaugeAxis: {
        tickColor: "#FFFFFF",
        tickAlpha: 1,
        tickLength: 15,
        minorTickLength: 8,
        axisThickness: 3,
        axisColor: '#FFFFFF',
        axisAlpha: 1,
        bandAlpha: 0.8
      },

      TrendLine: {
        lineColor: layoutColors.danger,
        lineAlpha: 0.8
      },

      // ammap
      AreasSettings: {
        alpha: 0.8,
        color: layoutColors.info,
        colorSolid: layoutColors.primaryDark,
        unlistedAreasAlpha: 0.4,
        unlistedAreasColor: "#FFFFFF",
        outlineColor: "#FFFFFF",
        outlineAlpha: 0.5,
        outlineThickness: 0.5,
        rollOverColor: layoutColors.primary,
        rollOverOutlineColor: "#FFFFFF",
        selectedOutlineColor: "#FFFFFF",
        selectedColor: "#f15135",
        unlistedAreasOutlineColor: "#FFFFFF",
        unlistedAreasOutlineAlpha: 0.5
      },

      LinesSettings: {
        color: "#FFFFFF",
        alpha: 0.8
      },

      ImagesSettings: {
        alpha: 0.8,
        labelColor: "#FFFFFF",
        color: "#FFFFFF",
        labelRollOverColor: layoutColors.primaryDark
      },

      ZoomControl: {
        buttonFillAlpha: 0.8,
        buttonIconColor: layoutColors.defaultText,
        buttonRollOverColor: layoutColors.danger,
        buttonFillColor: layoutColors.primaryDark,
        buttonBorderColor: layoutColors.primaryDark,
        buttonBorderAlpha: 0,
        buttonCornerRadius: 0,
        gridColor: "#FFFFFF",
        gridBackgroundColor: "#FFFFFF",
        buttonIconAlpha: 0.6,
        gridAlpha: 0.6,
        buttonSize: 20
      },

      SmallMap: {
        mapColor: "#000000",
        rectangleColor: layoutColors.danger,
        backgroundColor: "#FFFFFF",
        backgroundAlpha: 0.7,
        borderThickness: 1,
        borderAlpha: 0.8
      },

      // the defaults below are set using CSS syntax, you can use any existing css property
      // if you don't use Stock chart, you can delete lines below
      PeriodSelector: {
        color: "#FFFFFF"
      },

      PeriodButton: {
        color: "#FFFFFF",
        background: "transparent",
        opacity: 0.7,
        border: "1px solid rgba(0, 0, 0, .3)",
        MozBorderRadius: "5px",
        borderRadius: "5px",
        margin: "1px",
        outline: "none",
        boxSizing: "border-box"
      },

      PeriodButtonSelected: {
        color: "#FFFFFF",
        backgroundColor: "#b9cdf5",
        border: "1px solid rgba(0, 0, 0, .3)",
        MozBorderRadius: "5px",
        borderRadius: "5px",
        margin: "1px",
        outline: "none",
        opacity: 1,
        boxSizing: "border-box"
      },

      PeriodInputField: {
        color: "#FFFFFF",
        background: "transparent",
        border: "1px solid rgba(0, 0, 0, .3)",
        outline: "none"
      },

      DataSetSelector: {
        color: "#FFFFFF",
        selectedBackgroundColor: "#b9cdf5",
        rollOverBackgroundColor: "#a8b0e4"
      },

      DataSetCompareList: {
        color: "#FFFFFF",
        lineHeight: "100%",
        boxSizing: "initial",
        webkitBoxSizing: "initial",
        border: "1px solid rgba(0, 0, 0, .3)"
      },

      DataSetSelect: {
        border: "1px solid rgba(0, 0, 0, .3)",
        outline: "none"
      }

    };

    $stateProvider
        .state('dashboard', {
          url: '/dashboard',
          templateUrl: 'app/pages/dashboard/dashboard.html',
          title: 'Trang chủ',
          sidebarMeta: {
            icon: 'ion-android-home',
            order: 0,
          },
        });
  }

  function dashboardController($scope, $timeout, baConfig, layoutPaths){
    $scope.locations = [
      {
        id : 'hnptit',
        name : 'PTIT'
      },
      {
        id : 'hnbk',
        name : 'BK'
      },
      {
        id : 'hntl',
        name : 'TLU'
      }
    ];
    $scope.nodes = [
      {
        id: 'f1',
        name : 'NODE R1',
        loc : 'hnptit'
      },
      {
        id: 'f2',
        name : 'NODE R2',
        loc : 'hnptit'
      },
      {
        id: 'f3',
        name : 'NODE R3',
        loc : 'hnptit'
      },
      {
        id: 'f4',
        name : 'NODE RdS',
        loc : 'hnbk'
      },
      {
        id: 'f5',
        name : 'NODE RXS',
        loc : 'hnbk'
      },
      {
        id: 'f8',
        name : 'NODE RTLA',
        loc : 'hntl'
      }
    ];

    $scope.currentNode = $scope.nodes[0];
    $scope.currentLocation = $scope.locations[0];

    $timeout(function(){
      var layoutColors = baConfig.colors;
      var chart = AmCharts.makeChart('zoomAxisChart', {
        "type": "serial",
        "theme": "none",
        "color": layoutColors.defaultText,
        "dataDateFormat": "JJ:NN:SS",
        "precision": 2,
        "valueAxes": [{
          color: layoutColors.defaultText,
          axisColor: layoutColors.defaultText,
          gridColor: layoutColors.defaultText,
          "id": "v1",
          "title": "Nhiệt độ/Độ ẩm",
          "position": "left",
          "autoGridCount": false
        }, {
          color: layoutColors.defaultText,
          axisColor: layoutColors.defaultText,
          gridColor: layoutColors.defaultText,
          "id": "v2",
          "title": "AQI",
          "gridAlpha": 0,
          "position": "right",
          "autoGridCount": false
        }],
        "graphs": [{
          "id": "g1",
          "valueAxis": "v1",
          "bullet": "round",
          "bulletBorderAlpha": 1,
          "bulletColor": layoutColors.defaultText,
          color: layoutColors.defaultText,
          "bulletSize": 5,
          "hideBulletsCount": 50,
          "lineThickness": 2,
          "lineColor": layoutColors.danger,
          "type": "smoothedLine",
          "title": "Nhiệt độ",
          "useLineColorForBulletBorder": true,
          "valueField": "temp",
          "balloonText": "[[title]]<br/><b style='font-size: 130%'>[[value]]</b>"
        }, {
          "id": "g2",
          "valueAxis": "v1",
          color: layoutColors.defaultText,
          "bullet": "round",
          "bulletBorderAlpha": 1,
          "bulletColor": layoutColors.defaultText,
          "bulletSize": 5,
          "hideBulletsCount": 50,
          "lineThickness": 2,
          "lineColor": layoutColors.warning,
          "type": "smoothedLine",
          "dashLength": 5,
          "title": "Độ ẩm",
          "useLineColorForBulletBorder": true,
          "valueField": "hum",
          "balloonText": "[[title]]<br/><b style='font-size: 130%'>[[value]]</b>"
        },
        {
          "id": "g3",
          "valueAxis": "v2",
          color: layoutColors.defaultText,
          "bullet": "round",
          "bulletBorderAlpha": 1,
          "bulletColor": layoutColors.defaultText,
          "bulletSize": 5,
          "hideBulletsCount": 50,
          "lineThickness": 2,
          "lineColor": layoutColors.success,
          "type": "smoothedLine",
          "dashLength": 5,
          "title": "Chất lượng không khí",
          "useLineColorForBulletBorder": true,
          "valueField": "aqi",
          "balloonText": "[[title]]<br/><b style='font-size: 130%'>[[value]]</b>"
        }],
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
          "cursorColor" : layoutColors.danger,
          "valueLineEnabled": true,
          "valueLineBalloonEnabled": true,
          "cursorAlpha": 0,
          "valueLineAlpha": 0.2,
          "categoryBalloonDateFormat": "JJ:NN:SS"
        },
        "categoryField": "date",
        "categoryAxis": {
          "axisColor": layoutColors.defaultText,
          "color": layoutColors.defaultText,
          "gridColor": layoutColors.defaultText,
          "parseDates": true,
          "dashLength": 1,
          "minorGridEnabled": true,
          "minPeriod": "ss",
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
          "dateFormat": "JJ:NN:SS"
        },
        "dataProvider": [],
        pathToImages: layoutPaths.images.amChart
      });
      
      var ran = function(min, max) {
        return parseFloat((Math.random() * (max - min) + min).toFixed(1));
      }
      
      setInterval( function() {
        if (chart.dataProvider.length >= 15) {
          chart.dataProvider.shift();
        }
        var n = new Date();
        chart.dataProvider.push( {
          date:  n.getHours() + ':' + n.getMinutes() + ':' + n.getSeconds(),
          temp : ran(26, 30),
          hum : ran(60,65),
          aqi : ran(1, 3)
        } );
        chart.validateData();
      }, 3000 );
    });
  }
})();
