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
              name        : 'detailContent',
              url         : '/details/:type/:id/:title',
              templateUrl : 'src/details/detail.view.html',
              controller  : 'detailContentController',
              controllerAs: 'vm'
          })
          .state({
             name        : 'home',
             url         : '/',
             templateUrl : 'src/home/home.view.html',
             controller  : 'HomeController',
             controllerAs: 'vm'
            })
      $urlRouterProvider.otherwise('/')
    }

    config.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider','$sceDelegateProvider']
    export default config

