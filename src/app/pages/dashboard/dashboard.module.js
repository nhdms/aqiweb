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

  function dashboardController($scope, $timeout, baConfig, layoutPaths, Utils, API, toastr, $rootScope, ngProgressFactory, SocketURL, PROGRESSBAR_COLOR) {
    $scope.progressbar = ngProgressFactory.createInstance();
    $scope.progressbar.setColor(PROGRESSBAR_COLOR);
    $scope.progressbar.start();
    var mymap = null
    $scope.isMapClicked = false

    $scope.addMarker = function (aqi, nodeId) {
      var color = Utils.getPollutionLevel(aqi).txtColor
      var marker = L.ExtraMarkers.icon({
        ico: 'fa-number',
        number: '100',
        innerHTML: "<b style='line-height: 300%;color: #000000;'>" + aqi + "</b>",
        markerColor: color,
        shape: 'penta',
        prefix: 'fa',
        nodeId: nodeId
      });
      // console.log(marker)
      return marker
    }


    $scope.initMap = function (lat, long, info) {
      try {
        mymap = L.map('mapid').setView([lat, long], 13);
        L.tileLayer(
          'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
            maxZoom: 18,
            attribution: '<a href="https://seeyourair.com">SYA</a>',
            id: 'mapbox.streets',
            // renderer: L.svg()
          }).addTo(mymap);
        // marker = L.marker([lat, long]);
        // // .bindTooltip();
        // marker.addTo(mymap);

      } catch (e) {
        console.warn(e)
      }
    }

    if (!$scope.socket || !$scope.socket.connected) $scope.socket = mqtt.connect(SocketURL);
    API.getInfo('locations', null, function (res) {
      if (res.success) {
        $scope.locations = res.data;
        $scope.currentLocation = $scope.locations[0];
        // console.log($scope.currentLocation)
        $rootScope.locations = $scope.locations;
      } else {
        toastr.error(res.msg, "Lỗi");
        $scope.progressbar.complete();
      }
    });


    // API.getInfo('roots', null, function (res) {
    //   if (res.success) {
    //     $scope.roots = res.data;
    //     $rootScope.roots = $scope.roots;
    //   } else {
    //     toastr.error(res.msg, "Lỗi");
    //     $scope.progressbar.complete();
    //   }
    // });

    $scope.generateHTML = function (n) {
      return "<b>" + n.name + "</b><br>" +
        "<b> Nhiệt độ: " + n.now.temp + "°C</b><br>" +
        "<b> Độ ẩm: " + n.now.hum + "%</b><br>" +
        "<b> AQI: " + n.now.pm2 + "</b><br>" +
        "<b> Thời gian: " + new Date(n.now.lastUpdated).toLocaleString("vi") + "</b><br>" +
        "<b> Trạng thái: " + (n.connected ? 'Đã kết nối' : 'Ngắt kết nối') + "</b>"
    }

    API.getInfo('nodes', null, function (res) {
      if (res.success) {
        $scope.nodes = res.data;
        // $scope.currentNode = $scope.nodes[0];
        // $scope.nodes = API.getAllNodesByLocations($scope.currentLocation._id, $scope.roots, $scope.nodes);
        $scope.currentNode = $scope.nodes[0];
        $scope.currentNode.status = Utils.getPollutionLevel($scope['currentNode']['now']['pm2'])

        var info = Object.assign($scope.currentNode.now, {
          node: $scope.currentNode.name
        })
        $scope.initMap($scope.currentNode.current_location.latitude, $scope.currentNode.current_location.longitude, info)
        // console.log($scope.currentNode)
        $rootScope.nodes = $scope.nodes;
        $scope.progressbar.complete();

        $scope.nodes.map(function (n, i) {
          // $scope.nodes[i].now.lastUpdated = n.now.lastUpdated
          var mk = L.marker([n.current_location.latitude, n.current_location.longitude], {
            icon: $scope.addMarker(n.now.pm2, n._id)
          })
          mk.addTo(mymap);
          mk.bindPopup($scope.generateHTML(n))
          mk.on('click', function (e) {
            // alert()
            mk.openPopup();
          })
        })
      } else {
        toastr.error(res.msg, "Lỗi");
        $scope.progressbar.complete();
      }
    });

    if (!$rootScope.safeRange) {
      API.getSafeRange(function (res) {
        $rootScope.safeRange = res.data
      })
    }

    $scope.changeLocation = function (id) {
      $scope.nodes = API.getAllNodesByLocations($scope.currentLocation._id, $scope.roots, $scope.nodes);
      try {
        $scope.currentNode = $scope.nodes[0];
      } catch (e) {
        $scope.currentNode = {};
      }
    }

    // $timeout(() => {
    //   console.log(API.findAllInItems($scope.currentLocation._id, $scope.roots, 'locationId'));
    // }, 3000);


    $timeout(function () {
      var layoutColors = baConfig.colors;

      $scope.socket.subscribe("NODE_001");
      $scope.socket.subscribe("client_connected");

      var humChart = AmCharts.makeChart('hum-chart', Utils.buildChartOptions(Utils.getRealTimeChartOptions({
          title: 'Độ ẩm',
          min: 40,
          max: 70
        }))),
        tempChart = AmCharts.makeChart('temp-chart', Utils.buildChartOptions(Utils.getRealTimeChartOptions({
          title: 'Nhiệt độ',
          min: 26,
          max: 32
        }))),
        aqiChart = AmCharts.makeChart('aqi-chart', Utils.buildChartOptions(Utils.getRealTimeChartOptions({
          title: 'AQI',
          min: 0,
          max: 50
        })));

      $scope.submit = function () {
        // console.log()
        // $scope.socket.
        if ($scope.socket.connected) {
          Object.keys($scope.socket.messageIdToTopic).map(function (i) {
            // console.log(temp1[i][0])
            if ($scope.socket.messageIdToTopic[i][0] !== 'client_connected') {
              $scope.socket.unsubscribe($scope.socket.messageIdToTopic[i][0], console.log);
            }
          })
        }
        $scope.showCharts = true
        humChart.dataProvider = []
        tempChart.dataProvider = []
        aqiChart.dataProvider = []
        $scope.socket.subscribe($scope.currentNode._id);
        mymap.setView([$scope.currentNode.current_location.latitude, $scope.currentNode.current_location.longitude], 14)
        if ($scope.currentNode)
          $scope.currentNode.status = Utils.getPollutionLevel($scope.currentNode['now']['pm2'])

      }
      $scope.socket.on("message", function (topic, payload) {
        // console.log(topic, payload.toString());
        var str = payload.toString()
        if (topic === 'client_connected') {
          // alert()
          var clinz = JSON.parse(str)
          console.log(clinz)
          var index = $scope.nodes.findIndex(function (i) {
            return i._id == clinz.id
          })
          // console.log(index)
          if (index !== -1) {
            $scope.nodes[index].connected = +clinz.status
            if ($scope.currentNode._id === clinz.id) {
              $scope.$apply(function () {
                $scope.currentNode.connected = +clinz.status
                $scope.currentNode.now.lastUpdated = Date.now()
              })
            }
          }

        } else {
          var arr = str.trim().split(' ')
          $scope.$apply(function () {
            if ($scope.currentNode) {
              $scope.currentNode.now = {
                temp: +arr[0],
                hum: +arr[1],
                pm2: +arr[2],
                lastUpdated: Date.now()
              }
              // $scope.addMarker($scope.currentNode._id, +arr[0], +arr[1], +arr[2])        
              $scope.currentNode.status = Utils.getPollutionLevel($scope['currentNode']['now']['pm2'])
            }
          })

          try {
            // $scope.curr
            var date = new Date();

            if (+arr[1] > 0) {
              if (humChart.dataProvider.length >= 15) {
                humChart.dataProvider.shift();
              }
              humChart.dataProvider.push({
                date: date,
                value: +arr[1]
              });
              humChart.validateData();
            }
            if (+arr[0] > 0) {
              if (tempChart.dataProvider.length >= 15) {
                tempChart.dataProvider.shift();
              }
              tempChart.dataProvider.push({
                date: date,
                value: +arr[0]
              });
              tempChart.validateData();
            }

            if (aqiChart.dataProvider.length >= 15) {
              aqiChart.dataProvider.shift();
            }
            aqiChart.dataProvider.push({
              date: date,
              value: +arr[2]
            });
            aqiChart.validateData();
            if (mymap) {
              mymap.eachLayer(function (layer) {
                if (layer.options.icon && layer.options.icon.options.nodeId === topic) {
                  var ico = $scope.addMarker(+arr[2], topic)
                  layer.setIcon(ico)

                  layer._popup.setContent($scope.generateHTML($scope.currentNode))
                }
              });
            }
          } catch (e) {
            console.warn(e)
          }
        }
      });
    });
  }
})();