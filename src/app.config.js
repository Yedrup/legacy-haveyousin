function config($stateProvider, $locationProvider, $urlRouterProvider,$sceDelegateProvider) {
      $locationProvider.hashPrefix('')
      $sceDelegateProvider.resourceUrlWhitelist([
        'self',
        'https://api.themoviedb.org/**'
    ]);

    //Routes
      $stateProvider
          .state({
              name        : 'hello',
              url         : '/hello',
              templateUrl : 'src/hello/hello.view.html',
              controller  : 'HelloController',
              controllerAs: 'hello'
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

