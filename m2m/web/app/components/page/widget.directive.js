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

angular.module('gong.page').directive('widget', function ($compile, $http) {
    return {

        restrict: "E",
        link: function(scope, element, attrs) {

          var refresh = function() {
            $http.get(attrs.partial,{cache: true}).then(function (result) {
                var prefix = '';
                var suffix = '';
                element.html(result.data).show();
                $compile(element.contents())(scope);
            });
          }

          if(attrs.partial == 'true') {
            scope.$watch('contents.type', function(newValue, oldValue) {
                  if (newValue) {
                      refresh();
                  }
            }, true);
          }

          refresh();
        },
        scope: {
            contents:'='
        }
    };
});
