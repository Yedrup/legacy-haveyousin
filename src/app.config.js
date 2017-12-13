function config($stateProvider, $locationProvider, $urlRouterProvider, $sceDelegateProvider) {
    $locationProvider.hashPrefix('')
    $sceDelegateProvider.resourceUrlWhitelist([
        'self',
        '*://api.themoviedb.org/**',
        'https://www.youtube.com/**',
        'https://www.themoviedb.org/**',
        'localhost:9000/**',
    ]);

    $stateProvider
        .state('root', {
            url: '',
            abstract: false,
            views: {
                'header@': {
                    templateUrl: 'src/header/header.view.html',
                    controller: 'HeaderController',
                    controllerAs: 'headerCtrl'
                }
            },
            params: {
                private: false
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
            params: {
                private: true
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
            },
            params: {
                private: false
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
            },
            params: {
                private: false
            }
        })
        .state({
            name: 'root.list',
            url: '/list/:namelist/:id', 
            views: {
                'container@': {
                    templateUrl: 'src/list/list.view.html',
                    controller: 'listController',
                    controllerAs: 'vm'
                }
            },
            params: {
                private: true
            }
        })
        .state({
            name: 'root.calendar',
            url: '/calendar', 
            views: {
                'container@': {
                    templateUrl: 'src/calendar/calendar.view.html',
                    controller: 'CalendarController',
                    controllerAs: 'calendarCtrl'
                }
            },
            params: {
                private: true
            }
        })

    $urlRouterProvider.otherwise('/');

}

config.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider', '$sceDelegateProvider']
export default config