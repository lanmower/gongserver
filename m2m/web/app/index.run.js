(function() {
  'use strict';

  angular
    .module('gong')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
