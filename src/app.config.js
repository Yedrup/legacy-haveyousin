function config($stateProvider, $locationProvider, $urlRouterProvider, $sceDelegateProvider) {
    $locationProvider.hashPrefix('')
    $sceDelegateProvider.resourceUrlWhitelist([
        'self',
        '*://api.themoviedb.org/**',
        'https://www.youtube.com/**',
        'https://www.themoviedb.org/**',
        'localhost:9000/**',
    ]);

    //Routes
    $stateProvider
        .state('root', {
            url: '',
            abstract: true,
            views: {
                'header@': {
                    templateUrl: 'src/header/header.view.html',
                    controller: 'HeaderController',
                    controllerAs: 'headerCtrl'
                }
                // ,
                // 'footer': {
                //     templateUrl: 'footer.html',
                //     controller: 'FooterCtrl'
                // }
            }
        })
        .state({
            name: 'root.detailContent',
            url: '/details/:type/:id/:title',
            views: {
                'container@': {
                    templateUrl: 'src/details/detail.view.html',
                    controller: 'detailContentController',
                    controllerAs: 'detailCtrl',
                }
            },
            resolve: {
                loginRequired: ['$q', '$state', '$timeout', function ($q, $state, $timeout) {
                    var userId = localStorage.getItem("userId"); 
                    if (!userId) 
                    {
                        $timeout(function () {
                            $state.go('root.connection');
                        });
                        return $q.reject('User not logged in. Redirecting to connection page.');
                    }
                }]
            }
        })
        .state({
            name: 'root.home',
            url: '/',
            views: {
                'container@': {
                    templateUrl: 'src/home/home.view.html',
                    controller: 'HomeController',
                    controllerAs: 'homeCtrl',
                }
            }
        })
        .state({
            name: 'root.connection',
            url: '/connection',
            views: {
                'container@': {
                    templateUrl: 'src/connection/connection.view.html',
                    controller: 'connectionController',
                    controllerAs: 'connectionCtrl',
                }
            }
        })
        .state({
            name: 'root.list',
            url: '/list/:namelist/:id', //:id/:nameList

            views: {
                'container@': {
                    templateUrl: 'src/list/list.view.html',
                    controller: 'listController',
                    controllerAs: 'vm'
                }
            }
        })

    $urlRouterProvider.otherwise('/');

}

config.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider', '$sceDelegateProvider']
export default config