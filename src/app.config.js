function config($stateProvider, $locationProvider, $urlRouterProvider, $sceDelegateProvider) {
    //remove ! from utl
    $locationProvider.hashPrefix('')
    const isProduction = process.env.NODE_ENV === 'production';
    if(isProduction) $locationProvider.html5Mode(true); //remove # from url

    $sceDelegateProvider.resourceUrlWhitelist([
        'self',
        '*://api.themoviedb.org/**',
        'https://www.youtube.com/**',
        'https://www.themoviedb.org/**',
        'localhost:9000/**',
        'localhost:8888/**',
        "http://purdeychambraud.com/legacy-haveyousin/**"
    ]);

    $stateProvider
        .state('root', {
            url: '',
            abstract: false,
            views: {
                'header@': {
                    templateUrl: './src/header/header.view.html',
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
                    templateUrl: './src/details/detail.view.html',
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
                    templateUrl: './src/home/home.view.html',
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
                    templateUrl: './src/connection/connection.view.html',
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
                    templateUrl: './src/list/list.view.html',
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
                    templateUrl: './src/calendar/calendar.view.html',
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