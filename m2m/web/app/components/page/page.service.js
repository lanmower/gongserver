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
 angular.module('gong.page',[]).service('page', ['$http', '$mdDialog',function($http, $mdDialog) {
  var data = this.data = {
    widgets:[],
    types: ['none', 'header', 'image', 'paragraph'],
    title: 'untitled',
  }
  this.setWidgets = function(newWidgets) {
    data.widgets = newWidgets;
  }
  this.setTitle = function(newTitle) {
    data.title = newTitle;
  }
  this.removeWidget = function(index) {
    widgets.splice(index, 1);
  }

  this.editPage = function(edit) {
    this.data.edit = edit;
  }

  this.addWidget = function(widget) {
    data.widgets.push(widget);
  }

  this.getData = function(url) {
    if(url) {
      this.load(url);
    }
    return data;
  }
  self = this;
  this.load = function(url) {
    $http.get(url).then(function (result) {
        angular.copy(result.data, self.data);
      });
    console.log(self.data);
  }
  this.save = function(url) {
    var saveData = angular.copy(data);
    delete saveData['edit'];
    $http.post(url, saveData).then(function (result) {
      console.log(result);
    });
  }
  /**
   * Displays a dialog for renaming the file.
   *
   * @param {Event} $event Original click event for animations
   * @param {String} title Original document title
   * @return {Promise} Promise that resolves with the new title when the dialog is closed
   */
  this.showEdit = function(x) {
      data.widgets[x].edit = true;
  };

}]);
