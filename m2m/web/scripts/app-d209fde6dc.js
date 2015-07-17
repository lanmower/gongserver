"use strict";/*
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
function on_gapi_loaded(){window.init_gapi?window.init_gapi():setTimeout(on_gapi_loaded,10)}/*
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
var module=angular.module("gong.rename",["ngMaterial"]);module.controller("RenameCtrl",["$scope","$mdDialog","title",function(e,t,n){e.form={title:n},this.save=function(){t.hide(e.form.title)},this.cancel=function(){t.cancel()}}]),/*
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
angular.module("gong.rename").service("renameDialog",["$mdDialog",function(e){this.show=function(t,n){return e.show({targetEvent:t,templateUrl:"app/components/rename/rename.html",controller:"RenameCtrl",controllerAs:"ctrl",locals:{title:n}})}}]),/*
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
angular.module("gong.player",["ngSanitize","com.2fdevs.videogular","com.2fdevs.videogular.plugins.controls","com.2fdevs.videogular.plugins.overlayplay","com.2fdevs.videogular.plugins.poster","com.2fdevs.videogular.plugins.buffering"]).service("player",[function(){this.data={}}]),/*
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
angular.module("gong.player").directive("player",["$compile","$http",function(e,t){return{controller:"PlayerCtrl",controllerAs:"player",restrict:"E",templateUrl:"app/components/player/player.html"}}]),angular.module("gong.player").controller("PlayerCtrl",["$sce","$timeout","$scope","$mdSidenav",function(e,t,n,i){n.state=null,n.API=null,n.currentVideo=0,n.videos=[{title:"asdf",sources:[{src:e.trustAsResourceUrl("http://static.videogular.com/assets/videos/videogular.mp4"),type:"video/mp4"},{src:e.trustAsResourceUrl("http://static.videogular.com/assets/videos/videogular.webm"),type:"video/webm"},{src:e.trustAsResourceUrl("http://static.videogular.com/assets/videos/videogular.ogg"),type:"video/ogg"}]},{title:"asdf",sources:[{src:e.trustAsResourceUrl("http://static.videogular.com/assets/videos/big_buck_bunny_720p_h264.mov"),type:"video/mp4"},{src:e.trustAsResourceUrl("http://static.videogular.com/assets/videos/big_buck_bunny_720p_stereo.ogg"),type:"video/ogg"}]}],n.config={preload:"none",autoHide:!1,autoHideTime:3e3,autoPlay:!0,sources:[{src:e.trustAsResourceUrl("http://static.videogular.com/assets/videos/videogular.mp4"),type:"video/mp4"},{src:e.trustAsResourceUrl("http://static.videogular.com/assets/videos/videogular.webm"),type:"video/webm"},{src:e.trustAsResourceUrl("http://static.videogular.com/assets/videos/videogular.ogg"),type:"video/ogg"}],theme:{url:"http://www.videogular.com/styles/themes/default/latest/videogular.css"},plugins:{}},n.videos.selected=n.videos[0],this.select=function(e){n.API.stop(),n.currentVideo=e,n.videos.selected=n.videos[e],n.config.sources=n.videos[e].sources,t(n.API.play.bind(n.API),100)},this.showPlayer=function(){i("right").toggle()},this.onPlayerReady=function(e){n.API=e},this.onCompleteVideo=function(){n.isCompleted=!0,n.currentVideo++,n.currentVideo>=n.videos.length&&(n.currentVideo=0),n.setVideo(n.currentVideo)}}]),/*
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
angular.module("gong.page",[]).service("page",["$http","$mdDialog",function(e,t){var n=this.data={widgets:[],types:["none","header","image","paragraph"],title:"untitled"};this.setWidgets=function(e){n.widgets=e},this.setTitle=function(e){n.title=e},this.removeWidget=function(e){widgets.splice(e,1)},this.editPage=function(e){this.data.edit=e},this.addWidget=function(e){n.widgets.push(e)},this.getData=function(e){return e&&this.load(e),n},self=this,this.load=function(t){e.get(t).then(function(e){angular.copy(e.data,self.data)}),console.log(self.data)},this.save=function(t){var i=angular.copy(n);delete i.edit,e.post(t,i).then(function(e){console.log(e)})},this.showEdit=function(e){n.widgets[e].edit=!0}}]),/*
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
angular.module("gong.page").directive("widget",["$compile","$http",function(e,t){return{restrict:"E",link:function(n,i,o){var a=function(){t.get(o.partial,{cache:!0}).then(function(t){i.html(t.data).show(),e(i.contents())(n)})};"true"==o.partial&&n.$watch("contents.type",function(e,t){e&&a()},!0),a()},scope:{contents:"="}}}]),/*
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
angular.module("gong.page").directive("page",["$compile","$http",function(e,t){return{controller:"PageCtrl",controllerAs:"page",restrict:"E",templateUrl:"app/components/page/page.html",scope:{widgets:"="}}}]),/*
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
angular.module("gong.page").controller("PageController",["$mdDialog","$rootScope","$scope","$routeParams","page",function(e,t,n,i,o){n.data=o.getData(i.fileId),this.edit=function(e){var t=n.data.widgets[e],i=angular.copy(t);t.copy=i,t.edit=!0},this.addWidget=function(e,t){n.data.widgets.splice(t,0,{edit:!0,"new":!0})},this.editPage=function(e){1==e?n.data.copy=angular.copy(o.getData()):angular.copy(n.data.copy,n.data),o.editPage(e)},this.savePage=function(){o.save("save/")},this.save=function(t){delete n.data.widgets[t].copy,delete n.data.widgets[t]["new"],n.data.widgets[t].edit=!1,e.hide()},this.remove=function(e){n.data.widgets.splice(e,1)},this.moveUp=function(e,t){n.data.widgets.splice(t+1,0,n.data.widgets.splice(t,1)[0])},this.moveDown=function(e,t){n.data.widgets.splice(t-1,0,n.data.widgets.splice(t,1)[0])},this.cancel=function(e){if(1==n.data.widgets[e]["new"])n.data.widgets.splice(e,1);else{var t=n.data.widgets[e];angular.copy(t.copy,n.data.widgets[e]),delete t.copy}}}]);/*
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
var module=angular.module("gong.login",["gong.gapi","ngMaterial"]);module.controller("LoginCtrl",["$mdDialog","login","user",function(e,t,n){this.login=function(){t.login(n).then(function(){e.hide()})}}]),angular.module("gong.login").service("login",["$q","$mdDialog","googleApi","clientId","scope",function(e,t,n,i,o){var a=function(){var e=gapi.auth.getToken();return e&&Date.now()<e.expires_at},l=function(e,t){var n={client_id:i,scope:o,immediate:e};return t&&(n.login_hint=t,n.authuser=-1),n},r=function(t){return n.then(function(n){if(a())return n.auth.getToken();var i=e.defer();return n.auth.authorize(t,function(e){if(e&&!e.error)i.resolve(e);else{var t=e?e.error:"Unknown authentication error";i.reject(t)}}),i.promise})};this.login=function(e){var t=l(!1,e);return r(t)},this.checkAuth=function(e){var t=l(!0,e),n=r(t);return n},this.showLoginDialog=function(e,n){return t.show({targetEvent:e,templateUrl:"app/components/login/login.html",controller:"LoginCtrl",clickOutsideToClose:!1,escapeToClose:!1,controllerAs:"ctrl",locals:{user:n}})}}]);var module=angular.module("gong.gapi",[]);module.factory("googleApi",["$rootScope","$window","$q","apiKey","loadApis",function(e,t,n,i,o){var a=n.defer();return t.init_gapi=function(){e.$apply(function(){var e=[];i&&t.gapi.client.setApiKey(i),angular.forEach(o,function(t,i){e.push(n.when(gapi.client.load(i,t)))}),n.all(e).then(function(){a.resolve(t.gapi)})})},a.promise}]);var MultiPartBuilder=function(){this.boundary=Math.random().toString(36).slice(2),this.mimeType='multipart/mixed; boundary="'+this.boundary+'"',this.parts=[],this.body=null};MultiPartBuilder.prototype.append=function(e,t){if(null!==this.body)throw new Error("Builder has already been finalized.");return this.parts.push("\r\n--",this.boundary,"\r\n","Content-Type: ",e,"\r\n\r\n",t),this},MultiPartBuilder.prototype.finish=function(){if(0===this.parts.length)throw new Error("No parts have been added.");return null===this.body&&(this.parts.push("\r\n--",this.boundary,"--"),this.body=this.parts.join("")),{type:this.mimeType,body:this.body}};/*
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
var module=angular.module("gong.drive",["gong.gapi"]);module.service("drive",["$q","$cacheFactory","googleApi","applicationId",function(e,t,n,i){var o="id,title,mimeType,userPermission,editable,copyable,shared,fileSize",a=t("files"),l=function(e,t){var n={metadata:e,content:t};return a.put(e.id,n),n};this.loadFile=function(t){var i=a.get(t);return i?e.when(i):n.then(function(n){var i=n.client.drive.files.get({fileId:t,fields:o}),a=n.client.drive.files.get({fileId:t,alt:"media"});return e.all([e.when(i),e.when(a)])}).then(function(e){return l(e[0].result,e[1].body)})},this.saveFile=function(t,i){return n.then(function(n){var a,l;t.id?(a="/upload/drive/v2/files/"+encodeURIComponent(t.id),l="PUT"):(a="/upload/drive/v2/files",l="POST");var r=(new MultiPartBuilder).append("application/json",JSON.stringify(t)).append(t.mimeType,i).finish(),s=n.client.request({path:a,method:l,params:{uploadType:"multipart",fields:o},headers:{"Content-Type":r.type},body:r.body});return e.when(s)}).then(function(e){return l(e.result,i)})},this.showPicker=function(){return n.then(function(t){var n=e.defer(),o=new google.picker.View(google.picker.ViewId.DOCS);o.setMimeTypes("text/plain");var a=(new google.picker.PickerBuilder).setAppId(i).setOAuthToken(t.auth.getToken().access_token).addView(o).setCallback(function(e){if("picked"==e.action){var t=e.docs[0].id;n.resolve(t)}else"cancel"==e.action&&n.reject()}).build();return a.setVisible(!0),n.promise})},this.showSharing=function(e){return n.then(function(t){var n=new t.drive.share.ShareClient(i);n.setItemIds([e]),n.showSettingsDialog()})}}]),function(){angular.module("gong",["gong.login","ngMdIcons","gong.rename","gong.drive","gong.page","gong.player","ngAnimate","ngCookies","ngTouch","ngSanitize","ngResource","ngMaterial","ngRoute"])}(),/*
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
angular.module("gong").directive("main",["$compile","$http",function(e,t){return{templateUrl:"app/main/main.html",controller:"MainController",controllerAs:"ctrl"}}]),function(){function e(e,t,n,i,o,a,l,r,s,d,c,g,u,p){e.site={title:"Coastal Accounting Intranet"},e.file=null,e.loading=!0,e.user={name:"",image:""},e.menu=[{title:"test"},{title:"bla"}],e.$mdMedia=a;this.setWidgets=function(t){e.$apply(function(){s.setWidgets(t)})};this.editPage=function(e){return s.editPage(e)},this.showMenu=function(){console.log("test"),l("left").toggle()},this.getUserInfo=function(){p.then(function(t){var n=t.client.plus.people.get({userId:"me"});n.then(function(t){e.user.name=t.result.displayName,e.user.image=t.result.image.url,e.$apply()},function(e){})})},console.log("main");var m=this;c.checkAuth(n.user).then(s.loadedFn,function(){return c.showLoginDialog(null,n.user).then(function(){})})["finally"](function(){m.getUserInfo(),e.loading=!1,console.log("calling userinfo")})}angular.module("gong").controller("MainController",["$scope","$location","$routeParams","$q","$mdToast","$mdMedia","$mdSidenav","$log","page","drive","login","player","renameDialog","googleApi",e]),e.$inject=["$scope","$location","$routeParams","$q","$mdToast","$mdMedia","$mdSidenav","$log","page","drive","login","player","renameDialog","googleApi"]}(),function(){function e(e){e.debug("runBlock end")}angular.module("gong").run(e),e.$inject=["$log"]}(),function(){angular.module("gong").constant("apiKey",null).constant("clientId","782299333721-gpi0jl93onskv259h75d1tnfd5qkkr35.apps.googleusercontent.com").constant("applicationId","-SFhJxgQmttIbbU45EbD-hLZ").constant("scope",["email","profile","https://www.googleapis.com/auth/plus.me","https://www.googleapis.com/auth/drive","https://www.googleapis.com/auth/drive.install"]).constant("loadApis",{drive:"v2",plus:"v1"})}(),function(){function e(e,t){t.when("/:fileId?",{templateUrl:"app/components/page/page.html",controller:"PageController",controllerAs:"page"}).otherwise({})}angular.module("gong").config(e),e.$inject=["$logProvider","$routeProvider"]}(),angular.module("gong").run(["$templateCache",function(e){e.put("app/main/main.html",'<section layout="row" style="height:100%" flex=""><md-sidenav class="md-sidenav-left" md-component-id="left" md-is-locked-open="$mdMedia(\'gt-md\')"><md-toolbar></md-toolbar><md-list-item ng-repeat="item in menu" ng-click="ctrl.select($index)" ng-class="{\'selected\' : item === ctrl.selected }">{{item.title}}</md-list-item></md-sidenav><md-sidenav class="md-sidenav-right" md-component-id="right"><player></player></md-sidenav><md-content flex=""><md-toolbar><div class="md-toolbar-tools"><span ng-click="ctrl.showMenu()" aria-label="Show Menu" ng-show="!$mdMedia(\'gt-md\')" style="padding:0.5em;"><ng-md-icon class="ic_24px" icon="menu" style="fill:white;"></ng-md-icon></span> <img ng-src="{{user.image}}" class="md-whiteframe-z2" style="border-radius: 25px; -webkit-border-radius: 25px; -moz-border-radius: 25px;"> {{user.name}}</div></md-toolbar><md-button ng-click="player.showPlayer()" class="md-fab" aria-label="Eat cake" style="right:0px; top:2em; right:2em; position:fixed"><ng-md-icon icon="play_arrow" size="40" style="fill:white;"></ng-md-icon></md-button><div ng-show="loading" layout-align="center center" flex="" layout="column"><md-progress-circular md-mode="indeterminate"></md-progress-circular></div><div ng-hide="loading" ng-view=""></div></md-content></section>'),e.put("app/components/login/login.html",'<md-dialog><md-content><p>Please sign-in with your Google account to continue.</p></md-content><div class="md-actions" layout="row" layout-align="center center"><md-button class="md-primary" ng-click="ctrl.login()">Sign-in</md-button></div></md-dialog>'),e.put("app/components/page/page.html",'<section class="layout-margin" ng-if="data.edit != true"><md-subheader class="md-primary"><span ng-click="page.editPage(true)">{{data.title}}</span></md-subheader><widget ng-repeat="widget in data.widgets | orderBy:\'rank\'" partial="/partials/{{ widget.type }}.html" contents="widget" index="{{ $index }}"></widget></section><section class="layout-margin" ng-if="data.edit == true"><md-subheader><md-input-container style="display:inline-block; padding-bottom:0px"><label>Title</label> <input ng-model="data.title" size="50" maxlength="45"></md-input-container><md-button ng-click="page.savePage()" style="height:2em">Save</md-button><md-button ng-click="page.editPage(false)" style="height:2em">Cancel</md-button></md-subheader><md-button class="widgetEditButton" ng-click="page.addWidget($event, 0)">Add</md-button><section ng-repeat="widget in data.widgets | orderBy:\'rank\'"><span ng-if="widget.edit == true"><md-card><span ng-init="widget.type = widget.type || data.types[0]"></span><md-content layout-padding=""><label>Type</label><select ng-if="data.types >= 2" ng-model="widget.type" ng-selected="widget.type" ng-options="type as type for type in data.types"></select><select ng-if="data.types < 2" ng-model="widget.type" ng-selected="widget.type" ng-options="type as type for type in data.types" disabled=""></select><widget partial="/partials/{{ widget.type }}Edit.html" contents="widget" index="{{ $index }}"></widget></md-content><div class="md-actions" layout="row" layout-align="center center"><md-button ng-click="page.cancel($index)">Cancel</md-button><md-button ng-click="page.save($index)">Ok</md-button></div></md-card></span><style>\n      .widgetEditButton {\n        color:#aaa;\n      }\n      .widgetEditButton:hover {\n        color:#ccc;\n      }\n    </style><div ng-if="widget.edit != true"><section style="position:absolute;"><md-button class="widgetEditButton" ng-click="page.edit($index)">Edit</md-button><md-button class="widgetEditButton" ng-click="page.addWidget($event, $index)">Add</md-button><md-button class="widgetEditButton" ng-click="page.moveDown($event, $index)">Up</md-button><md-button class="widgetEditButton" ng-click="page.moveUp($event, $index)">Down</md-button><md-button class="widgetEditButton" ng-click="page.remove(data.widgets, $index)">Remove</md-button></section><widget partial="/partials/{{ widget.type }}.html" contents="widget" index="{{ $index }}"></widget></div></section></section>'),e.put("app/components/player/player.html",'<div class="videogular-container"><videogular vg-player-ready="player.onPlayerReady($API)" vg-complete="player.onCompleteVideo()" vg-theme="config.theme.url"><vg-media vg-src="config.sources" vg-tracks="config.tracks"></vg-media><vg-controls><vg-play-pause-button></vg-play-pause-button><vg-time-display>{{ currentTime | date:\'mm:ss\' }}</vg-time-display><vg-scrub-bar><vg-scrub-bar-current-time></vg-scrub-bar-current-time></vg-scrub-bar><vg-time-display>{{ timeLeft | date:\'mm:ss\' }}</vg-time-display><vg-volume><vg-mute-button></vg-mute-button><vg-volume-bar></vg-volume-bar></vg-volume><vg-fullscreen-button></vg-fullscreen-button></vg-controls><vg-overlay-play></vg-overlay-play><vg-buffering></vg-buffering><vg-poster vg-url="config.plugins.poster"></vg-poster></videogular></div><md-list style="padding-right:20px"><md-list-item ng-repeat="video in videos" ng-click="player.select($index)" ng-class="{\'selected\' : video === videos.selected }">{{video.title}}</md-list-item></md-list>'),e.put("app/components/rename/rename.html",'<md-dialog><md-content layout-padding="" layout="row" layout-sm="column"><md-input-container><label>Title</label> <input ng-model="form.title"></md-input-container></md-content><div class="md-actions" layout="row" layout-align="center center"><md-button ng-click="ctrl.cancel()">Cancel</md-button><md-button ng-click="ctrl.save()">Save</md-button></div></md-dialog>')}]);