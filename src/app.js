//CSS
import './style/app.css'


//Config
import angular from 'angular'
import config from './app.config.js'
import run from './app.run.js'
import '@uirouter/angularjs'

//services
import tmdbService from './services/service.tmdb.js'
import currentUserService from './services/service.currentUser.js'
import listsService from './services/service.lists.js'


//Controllers
import detailContentController from './details/detailContent.controller.js'
import connectionController from './connection/connection.controller.js'
import HomeController from './home/home.controller.js'
import listController from './list/list.controller.js'
import CardContentController from './directives/cards/CardContent.controller.js'
import PannelController from './directives/pannel/pannel.controller.js'
import HeaderController from './header/header.controller.js'

var app = angular.module('haveYouSin', ['ui.router']);

//services
app.service('tmdbService', tmdbService);
app.factory('currentUserService', currentUserService);
app.factory('listsService', listsService);

//config
app.config(config);

//run 
app.run(run);


//controller
app.controller('CardContentController', CardContentController);
app.controller('HomeController', HomeController);
app.controller('detailContentController', detailContentController);
app.controller('connectionController', connectionController);
app.controller('PannelController', PannelController);
app.controller('HeaderController', HeaderController);
app.controller('listController', listController);




app.directive("cardContent", function () {
    return {
        scope: {},
        bindToController: {
            content: '=data'
        },
        templateUrl: "src/directives/cards/card-content.view.html",
        restrict: "E",
        controller: 'CardContentController',
        controllerAs: 'cardCtrl'
    };
});
app.directive("pannel", function () {
    return {
        templateUrl: "src/directives/pannel/pannel.view.html",
        restrict: "E",
        require: ['^cardContent, ^detailContentController'],                
        // bindToController: {
        //     contentId: '=contentId',
        //     contentType: '=contentType'
        // },
        scope: {
            contentId: "@",
            contentType: "@",            
          },
        controller: 'PannelController',
        controllerAs: 'pannelCtrl',
    };
});
app.directive("presentationApp", function () {
    return {
        templateUrl: "src/directives/presentationApp/presentationApp.view.html",
        restrict: "E",

    };
});
// app.directive("headerCustom", function () {
//     return {
//         templateUrl: "src/directives/header/header.view.html",
//         restrict: "E",
//         controller: 'HeaderController',
//         controllerAs: 'headerCtrl'
//     };
// });