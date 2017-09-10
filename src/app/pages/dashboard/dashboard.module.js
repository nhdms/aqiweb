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

  function dashboardController($scope, $timeout, baConfig, layoutPaths, Utils, API, toastr , $rootScope, ngProgressFactory, SocketURL) {
    $scope.progressbar = ngProgressFactory.createInstance();
    $scope.progressbar.setColor('#209e91');
    $scope.progressbar.start();

    if (!$scope.socket || !$scope.socket.connected) $scope.socket = mqtt.connect(SocketURL);
    API.getInfo('locations', null, function (res) {
      if (res.success) {
        $scope.locations = res.data;
        $scope.currentLocation = $scope.locations[0];
        $rootScope.locations = $scope.locations;
        API.getInfo('roots', null, function (res) {
          if (res.success) {
            $scope.roots = res.data;
            $rootScope.roots = $scope.roots;            
            API.getInfo('nodes', null, function (res) {
              if (res.success) {
                $scope.nodes = res.data;
                // $scope.currentNode = $scope.nodes[0];
                $scope.tempNodes = API.getAllNodesByLocations($scope.currentLocation._id, $scope.roots, $scope.nodes);
                $scope.currentNode = $scope.tempNodes[0];
                $rootScope.nodes = $scope.nodes;
                $scope.progressbar.complete();           
              } else {
                toastr.error(res.msg, "Lỗi");
                $scope.progressbar.complete();
              }
            });
          } else {
            toastr.error(res.msg, "Lỗi");
            $scope.progressbar.complete();
          }
        });
      } else {
        toastr.error(res.msg, "Lỗi");
        $scope.progressbar.complete();
      }
    });

    if (!$rootScope.safeRange) {
      API.getSafeRange(function(res){
        $rootScope.safeRange = res.data
      })
    }

    $scope.changeLocation = function(id) {
      $scope.tempNodes = API.getAllNodesByLocations($scope.currentLocation._id, $scope.roots, $scope.nodes);
      try {
        $scope.currentNode = $scope.tempNodes[0];         
      } catch (e){
        $scope.currentNode = {};
      }
    }
    
    $scope.changeNode = function(){
      console.log('g')
    }

    
    // $timeout(() => {
    //   console.log(API.findAllInItems($scope.currentLocation._id, $scope.roots, 'locationId'));
    // }, 3000);


    $timeout(function () {
      var layoutColors = baConfig.colors;

      $scope.socket.subscribe("NODE_001");
      
      var humChart = AmCharts.makeChart('hum-chart', Utils.buildChartOptions(Utils.getRealTimeChartOptions({title: 'Độ ẩm', min: 40, max: 70}))),
          tempChart = AmCharts.makeChart('temp-chart', Utils.buildChartOptions(Utils.getRealTimeChartOptions({title: 'Nhiệt độ', min: 26, max: 32}))),
          aqiChart = AmCharts.makeChart('aqi-chart', Utils.buildChartOptions(Utils.getRealTimeChartOptions({title: 'PM2', min: 0, max: 2})));

      $scope.submit = function() {
        // console.log()
        humChart.dataProvider = []
        tempChart.dataProvider = []
        aqiChart.dataProvider = []
        $scope.socket.subscribe($scope.currentNode._id);      
      }
      $scope.socket.on("message", function(topic, payload) {
        console.log(topic, payload.toString());
        var str = payload.toString();
        try {
          var arr = str.trim().split(' '),
              date = new Date();

          if (+arr[1] > 0){
            if (humChart.dataProvider.length >= 15) {
              humChart.dataProvider.shift();
            }
            humChart.dataProvider.push({date: date, value: +arr[1]});
            humChart.validateData();
          }
          if (+arr[2] > 0) {
            if (tempChart.dataProvider.length >= 15) {
              tempChart.dataProvider.shift();
            }
            tempChart.dataProvider.push({date: date, value: +arr[2]});
            tempChart.validateData();
          }

          if (aqiChart.dataProvider.length >= 15) {
            aqiChart.dataProvider.shift();
          }
          aqiChart.dataProvider.push({date: date, value: +arr[3]});
          aqiChart.validateData();
        } catch (e) { console.log(e) }
      });

      
      

      // Socket.socket.on('get_index', function (data) {
      //   console.log(data);
      //   data.date = new Date(data.date);
      //   if (chart.dataProvider.length >= 15) {
      //     chart.dataProvider.shift();
      //   }
      //   chart.dataProvider.push(data);
      //   chart.validateData();
      // });
    });
  }
})();
