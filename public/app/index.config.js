(function() {
  'use strict';

  angular
    .module('birdland')
    // .config(config);

  /** @ngInject */
  // function config($logProvider, toastr) {
    // Enable log
    // $logProvider.debugEnabled(true);

    // // Set options third-party lib
    // toastr.options.timeOut = 3000;
    // toastr.options.positionClass = 'toast-top-right';
    // toastr.options.preventDuplicates = true;
    // toastr.options.progressBar = true;
  // }
  .config(function(uiGmapGoogleMapApiProvider) {
      uiGmapGoogleMapApiProvider.configure({
          key: 'AIzaSyCmP9_IcqdVZEvLo8cu4tQ42JUCo6V6-5Y',
          v: '3.20', //defaults to latest 3.X anyhow
          libraries: 'weather,geometry,visualization'
      });
  })
})();
