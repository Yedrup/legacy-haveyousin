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
import DetailTvController from './details/detailTV.controller.js'
import DetailMovieController from './details/detailMovie.controller.js'
import HomeController from './home/home.controller.js' 
import CardTvCtrl from './directives/cards/CardTv.controller.js' 
import PannelController from './directives/pannel/pannel.controller.js' 


var app = angular.module('haveYouSin', ['ui.router']);

//services
app.service('tmdbService', tmdbService);
// app.service('suggestiontv', suggestiontv);

//config
app.config(config);


//controller
app.controller('CardTvCtrl', CardTvCtrl);
app.controller('DetailMovieController', DetailMovieController);
app.controller('HomeController', HomeController);
app.controller('DetailTvController', DetailTvController);
app.controller('PannelController', PannelController);



app.directive("cardTv", function () {
    return {
        templateUrl: "src/directives/cards/card-tv.html",
        restrict: "E",
        controller: 'CardTvCtrl',
        controllerAs: 'cardTv'
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


//directives
// app.directive("secondDirective", function () {
//     return {
//         templateUrl: "./templates/directives/second-directive.html",
//         restrict: "E",
//         controller: 'secondDirectiveCtrl'
//     };
// });
