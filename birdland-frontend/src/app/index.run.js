(function() {
  'use strict';

  angular
    .module('birdland')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
