//CSS
import './style/app.css'


//Config
import angular from 'angular'
import config from './app.config.js'
import '@uirouter/angularjs'

//services
import tmdbService from './services/service.tmdb.js' 
// import suggestiontv from './services/service.suggestiontv.js' 


//Controllers
import HelloController from './hello/hello.controller.js'
import HomeController from './home/home.controller.js' 
import CardTvCtrl from './directives/cards/CardTv.controller.js' 



var app = angular.module('haveYouSin', ['ui.router']);

//services
app.service('tmdbService', tmdbService);
// app.service('suggestiontv', suggestiontv);

//config
app.config(config);


//controller
app.controller('CardTvCtrl', CardTvCtrl);
app.controller('HelloController', HelloController);
app.controller('HomeController', HomeController);


app.directive("cardTv", function () {
    return {
        templateUrl: "src/directives/cards/card-tv.html",
        restrict: "E",
        controller: 'CardTvCtrl',
        controllerAs: 'cardTv'
    };
});


//directives
// app.directive("firstDirective", function () {
//     return {
//         templateUrl: "./templates/directives/first-directive.html",
//         restrict: "E",
//         controller: 'firstDirectiveCtrl'
//     };
// });
// app.directive("secondDirective", function () {
//     return {
//         templateUrl: "./templates/directives/second-directive.html",
//         restrict: "E",
//         controller: 'secondDirectiveCtrl'
//     };
// });
