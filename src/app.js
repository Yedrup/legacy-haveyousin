//CSS
import './style/app.css'


//Config
import angular from 'angular'
import config from './app.config.js'
import '@uirouter/angularjs'

//services
import tmdbService from './services/service.tmdb.js' 


//Controllers
import detailContentController from './details/detailContent.controller.js'
import HomeController from './home/home.controller.js' 
import CardContentController from './directives/cards/CardContent.controller.js' 
import PannelController from './directives/pannel/pannel.controller.js' 
import HeaderController from './directives/header/header.controller.js'

var app = angular.module('haveYouSin', ['ui.router']);

//services
app.service('tmdbService', tmdbService);

//config
app.config(config);


//controller
app.controller('CardContentController', CardContentController);
app.controller('HomeController', HomeController);
app.controller('detailContentController', detailContentController);
app.controller('PannelController', PannelController);
app.controller('HeaderController', HeaderController);




app.directive("cardContent", function () {
    return {
        scope: {},
        bindToController: {
            content : '=data'
        },
        templateUrl: "src/directives/cards/card-content.view.html",
        restrict: "E",
        controller: 'CardContentController',
        controllerAs: 'vm'
    };
});
app.directive("pannel", function () {
    return {
        templateUrl: "src/directives/pannel/pannel.view.html",
        restrict: "E",
        controller: 'PannelController',
        controllerAs: 'pannel'
    };
});
app.directive("headerCustom", function () {
    return {
        templateUrl: "src/directives/header/header.view.html",
        restrict: "E",
        controller: 'HeaderController',
        controllerAs: 'vm'
    };
});
