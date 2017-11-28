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
import DetailMovieController from './details/detailMovie.controller.js'
import HomeController from './home/home.controller.js' 
import CardContentCtrl from './directives/cards/CardContent.controller.js' 
import PannelController from './directives/pannel/pannel.controller.js' 


var app = angular.module('haveYouSin', ['ui.router']);

//services
app.service('tmdbService', tmdbService);
// app.service('suggestiontv', suggestiontv);

//config
app.config(config);


//controller
app.controller('CardContentCtrl', CardContentCtrl);
app.controller('DetailMovieController', DetailMovieController);
app.controller('HomeController', HomeController);
app.controller('detailContentController', detailContentController);
app.controller('PannelController', PannelController);



app.directive("cardContent", function () {
    return {
        scope: {},
        bindToController: {
            content : '=data'
        },
        templateUrl: "src/directives/cards/card-content.html",
        restrict: "E",
        controller: 'CardContentCtrl',
        controllerAs: 'vm'
    };
});
app.directive("pannel", function () {
    return {
        templateUrl: "src/directives/pannel/pannel.view.html",
        restrict: "E",
        controller: 'PannelController',
        controllerAs: 'vm'
    };
});
