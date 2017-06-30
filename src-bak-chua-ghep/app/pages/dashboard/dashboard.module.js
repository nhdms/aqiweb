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

  function dashboardController($scope, $timeout, baConfig, layoutPaths, Utils) {
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
    $scope.nodes = [
      {
        id: 'f1',
        name: 'NODE R1',
        loc: 'hnptit'
      },
      {
        id: 'f2',
        name: 'NODE R2',
        loc: 'hnptit'
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

    $scope.currentNode = $scope.nodes[0];
    $scope.currentLocation = $scope.locations[0];

    $timeout(function () {
      var layoutColors = baConfig.colors;
    
      var options = {
        dataDateFormat: "JJ:NN:SS",
        axis: [
          { title: 'Nhiệt độ/Độ ẩm', position: "left" },
          { title: 'AQI', position: "right" }
        ],
        graphs: [{
          valueAxis: 'v1',
          title: 'Nhiệt độ',
          valueField: 'temp',
          lineColor: layoutColors.danger
        },
        {
          valueAxis: 'v1',
          title: 'Độ ẩm',
          valueField: 'hum',
          lineColor: layoutColors.warning
        },
        {
          valueAxis: 'v2',
          title: 'Chất lượng không khí',
          valueField: 'aqi',
          lineColor: layoutColors.info
        }
        ],
        categoryField: "date",
        minPeriod: "ss",
        dataProvider: []
      }
      // var chart = AmCharts.makeChart('temp-chart', Utils.buildChartOptions(temp));
      var chart = AmCharts.makeChart('zoomAxisChart', Utils.buildChartOptions(options));
      var ran = function (min, max) {
        return parseFloat((Math.random() * (max - min) + min).toFixed(1));
      }

      setInterval(function () {
        if (chart.dataProvider.length >= 15) {
          chart.dataProvider.shift();
        }
        var n = new Date();
        var val = {
          date: n,
          temp: ran(26, 30),
          hum: ran(60, 65),
          aqi: ran(1, 3)
        }
        chart.dataProvider.push(val);
        chart.validateData();
      }, 3000);
    });
  }
})();
