'use strict';

/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.theme.components').controller('MsgCenterCtrl', MsgCenterCtrl);

  /** @ngInject */
  function MsgCenterCtrl($scope, $sce, $rootScope) {
    $scope.users = {
      0: {
        name: 'Vlad'
      },
      1: {
        name: 'Kostya'
      },
      2: {
        name: 'Andrey'
      },
      3: {
        name: 'Nasta'
      }
    };

    $scope.notifications = [{
      userId: 0,
      template: '&name theo dõi node xbcxyz',
      time: '1 phút trước'
    }];

    $scope.messages = [{
      userId: 3,
      text: 'Khu vực ABC vừa thêm một Root mới(XYZ)',
      time: '1 giờ trước'
    }];

    $scope.getMessage = function (msg) {
      var text = msg.template;
      if (msg.userId || msg.userId === 0) {
        text = text.replace('&name', '<strong>' + $scope.users[msg.userId].name + '</strong>');
      }
      return $sce.trustAsHtml(text);
    };
  }
})();