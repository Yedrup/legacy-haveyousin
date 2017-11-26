function config($stateProvider, $locationProvider, $urlRouterProvider,$sceDelegateProvider) {
      $locationProvider.hashPrefix('')
      $sceDelegateProvider.resourceUrlWhitelist([
        'self',
        '*://api.themoviedb.org/**',
        'https://www.youtube.com/**',        
    ]);

    //Routes
      $stateProvider
          .state({
              name        : 'detailTV',
              url         : '/details/:id/:title',
              templateUrl : 'src/details/detail.view.html',
              controller  : 'DetailTvController',
              controllerAs: 'model'
          })
          .state({
            name        : 'detailMovie',
            url         : '/details/:id/:title',
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

