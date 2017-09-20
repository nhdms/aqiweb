/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    var app = angular.module('BlurAdmin.pages.news')
        .controller('NewsCtrl', NewsCtrl);

    /** @ngInject */
    function NewsCtrl($scope, $filter, editableOptions, editableThemes, baConfig, layoutPaths, Utils, $timeout, ngProgressFactory,PROGRESSBAR_COLOR, API, $rootScope, toastr) {
        // alert('ok')
        $scope.news = [
            {
                title: '2017-07-27',
                content: 'Sensor down from Jul 24 to Jul 27 due to a power supply issue. The problem could not been resolved earlier as the maintainer was away from Jul 24 (« Murphy\'s law »).'
            },
            {
                title: '2016-12-22',
                content: 'Sensor down 12 hours today due to a power failure.'
            },
            {
                title: '2016-10-05',
                content: 'Sensor down for cleaning (14:50 - 15:00)'
            },
            {
                title: '2016-05-25',
                content: 'Due to a very unusual hardware failure on our main server, 19 hours of data were lost on 25 of may. Hourly backups, real-time database replication and a local copy of the raw sensor data on the collector (client) will be set up in the next days to prevent any future loss of data.'
            }
        ]
    }
})();
