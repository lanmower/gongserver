(function() {
  'use strict';

  angular
    .module('gong')
    .config(config);

  /** @ngInject */
  function config($logProvider, $routeProvider) {
    $routeProvider
      .when('/:fileId?', {
        templateUrl: 'app/components/page/page.html',
        controller: 'PageController',
        controllerAs: 'page'
      })
      .otherwise({
        //redirectTo: function() {
        //  console.log("Otherwise...");
        //  return '/edit/';
        //}
      });
  }

})();
