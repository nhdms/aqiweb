'use strict';

angular.module('BlurAdmin', [
  'ngAnimate',
  'ui.bootstrap',
  'ui.sortable',
  'ui.router',
  'ngTouch',
  'toastr',
  'smart-table',
  "xeditable",
  'ui.slimscroll',
  'ngJsTree',
  'angular-progress-button-styles',
  'pascalprecht.translate',
  // 'ngprogress',
  'BlurAdmin.theme',
  'BlurAdmin.pages',
  'ngProgress'
]).config(function ($translateProvider) {
  

  $translateProvider.useStaticFilesLoader({
    prefix: 'languages/',
    suffix: '.json'
  });

  $translateProvider.registerAvailableLanguageKeys(['en', 'vi'], {
    'en-US': 'en',
    'vi-VN': 'vi',
  });

  $translateProvider.uniformLanguageTag('bcp47');
  // $translateProvider.fallbackLanguage('vi');
  $translateProvider.preferredLanguage('vi');
})
  .value('PROGRESSBAR_COLOR', '#FF0000')
  .value('SocketURL', 'http://seeyourair.com:5000')
  .value('APIURL', 'http://seeyourair.com:8080');
  // .value('SocketURL', 'http://localhost:5000')
  // .value('APIURL', 'http://localhost:8080');
  