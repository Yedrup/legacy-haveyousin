import './style/app.css'
import angular from 'angular' //cherche dans les nodes_modules
import '@uirouter/angularjs'
import config from './app.config.js'
// import run from './app.run.js'
import toto from './hello/hello.controller.js'
import HomeController from './home/home.controller.js' 




var app = angular.module('lastApp', ['ui.router' ]);
app.config(config);
// app.run(run);
app.controller('HelloController', toto);
app.controller('HomeController', HomeController);

//directives
app.directive("firstDirective", function () {
    return {
        templateUrl: "./templates/directives/first-directive.html",
        restrict: "E",
        controller: 'firstDirectiveCtrl'
        /*,
                controllerAs: 'first'*/
    };
});
app.directive("secondDirective", function () {
    return {
        templateUrl: "./templates/directives/second-directive.html",
        restrict: "E",
        controller: 'secondDirectiveCtrl'
        /*,
                controllerAs: 'second'*/
    };
});
