'use strict';

// console.log('1')
var SOCKET_URL = 'http://seeyourair.com:5000',
  API_URL = 'http://seeyourair.com:8080'
if ('https' === window.location.protocol.slice(0, -1)) {
  SOCKET_URL = 'wss://seeyourair.com:6443',
  API_URL = 'https://seeyourair.com:8443'
}
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
  .value('SocketURL', SOCKET_URL)
  .value('APIURL', API_URL);
  // .value('SocketURL', 'http://localhost:5000')
  // .value('APIURL', 'http://localhost:8080');
  