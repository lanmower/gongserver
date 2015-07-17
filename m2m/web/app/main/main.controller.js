(function() {
  'use strict';

  angular
    .module('gong')
    .controller('MainController', [
      '$scope',
      '$location',
      '$routeParams',
      '$q',
      '$mdToast',
      '$mdMedia',
      '$mdSidenav',
      '$log',
      'page',
      'drive',
      'login',
      'player',
      'renameDialog',
      'googleApi',

      MainController]);

  /** @ngInject */
  function MainController($scope,
      $location,
      $routeParams,
      $q,
      $mdToast,
      $mdMedia,
      $mdSidenav,
      $log,
      page,
      drive,
      login,
      player,
      renameDialog,
      googleApi) {

        var DEFAULT_FILE = {
          content: '',
          metadata: {
            id: null,
            title: 'untitled.txt',
            mimeType: 'text/plain',
            editable: true
          }
        };

        var DEFAULT_PAGE = {
          content: '',
          metadata: {
            id: null,
            title: 'untitled page',
            mimeType: 'text/plain',
            editable: true
          }
        };

        $scope.site = {
          title: 'Coastal Accounting Intranet'
        }

        $scope.file = null;
        $scope.loading = true;
        $scope.user = {name:'', image:''};
        $scope.menu = [{'title':'test'},{'title':'bla'}]
        $scope.$mdMedia = $mdMedia;

        var setWidgets = this.setWidgets = function(widgets) {
          $scope.$apply(function () {
                  page.setWidgets(widgets);
              });
          };

        /**
         * Displays a short message as a toast
         *
         * @param {String} message Message to display
         */
        var showMessage = function(message) {
          $mdToast.show($mdToast.simple().content(message));
        };

        /**
         * Handles the page edit button click for user-initiated page edits.
         *
         * @param {Event} $event Original click event
         */
        this.editPage = function($event) {
          return page.editPage($event);
        };


        this.showMenu = function() {
          console.log('test');
          $mdSidenav('left').toggle();
        }

        this.getUserInfo = function () {
          googleApi.then(function(gapi) {
            // Step 5: Assemble the API request
            var request = gapi.client.plus.people.get({
              'userId': 'me'
            });
            // Step 6: Execute the API request
            request.then(function(resp) {
              //$scope.userImage = resp.result.image.url;
              $scope.user.name  = resp.result.displayName;
              $scope.user.image = resp.result.image.url;
              $scope.$apply();
            }, function(reason) {
            });
          });
        }

        console.log('main');
        // Authenticate & load doc
        var self = this;
        login.checkAuth($routeParams.user).then(page.loadedFn, function() {
          return login.showLoginDialog(null, $routeParams.user).then(function() {
            //when loaded
          });
        }).finally(function() {
          self.getUserInfo();
          $scope.loading = false;
          console.log('calling userinfo');
        });

  }
})();
