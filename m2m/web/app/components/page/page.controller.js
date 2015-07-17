'use strict'

/*
 * Copyright 2015 Almagest Fraternite All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
angular.module('gong.page').controller('PageController', ['$mdDialog', '$rootScope','$scope', '$routeParams','page', function ($mdDialog, $rootScope, $scope, $routeParams, pageService) {
  $scope.data = pageService.getData($routeParams.fileId);

  this.edit = function(index) {
    var widget = $scope.data.widgets[index];
    var copy = angular.copy(widget);
    widget.copy = copy;
    widget.edit = true;
  }

  this.addWidget = function(e, index) {
    $scope.data.widgets.splice(index, 0, {edit:true, new:true});
  }

  this.editPage = function(edit) {
    if(edit == true) $scope.data.copy = angular.copy(pageService.getData());
    else angular.copy($scope.data.copy, $scope.data);
    pageService.editPage(edit);
  }

  this.savePage = function() {
    pageService.save('save/');
  }

  /**
  * Handle the save click
  */
  this.save = function(index) {
    delete $scope.data.widgets[index].copy;
    delete $scope.data.widgets[index].new;
    $scope.data.widgets[index].edit = false;
    $mdDialog.hide();
  };

  this.remove = function(index) {
    $scope.data.widgets.splice(index, 1);
  }

  this.moveUp = function(e,index) {
    $scope.data.widgets.splice(index + 1, 0, $scope.data.widgets.splice(index, 1)[0]);
  }

  this.moveDown = function(e,index) {
    $scope.data.widgets.splice(index - 1, 0, $scope.data.widgets.splice(index, 1)[0]);
  }

  /**
  * Handle the cancel click.
  */
  this.cancel = function(index) {
    if($scope.data.widgets[index].new == true){
      $scope.data.widgets.splice(index, 1);
    } else {
      var widget = $scope.data.widgets[index];
      angular.copy(widget.copy, $scope.data.widgets[index]);
      delete widget.copy;
    }
  };

}]);
