function config($stateProvider, $locationProvider, $urlRouterProvider,$sceDelegateProvider) {
      $locationProvider.hashPrefix('')
      $sceDelegateProvider.resourceUrlWhitelist([
        'self',
        'https://api.themoviedb.org/**'
    ]);

    //Routes
      $stateProvider
          .state({
              name        : 'detailTV',
              url         : '/detailTV',
              templateUrl : 'src/details/detail.view.html',
              controller  : 'DetailTvController',
              controllerAs: 'model'
          })
          .state({
            name        : 'detailMovie',
            url         : '/detailMovie',
            templateUrl : 'src/details/detail.view.html',
            controller  : 'DetailMovieController',
            controllerAs: 'model'
        })
          .state({
             name        : 'home',
             url         : '/',
             templateUrl : 'src/home/home.view.html',
             controller  : 'HomeController',
             controllerAs: 'home'
            })
      $urlRouterProvider.otherwise('/')
    }

    config.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider','$sceDelegateProvider']
    export default config

