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
  'BlurAdmin.theme',
  'BlurAdmin.pages'
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
});