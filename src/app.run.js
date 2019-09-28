function run($stateParams, $state,currentUserService, $location, $trace, $transition, $rootScope) {
    $rootScope.isProduction = process.env.NODE_ENV === 'production';
    $rootScope.environment = process.env.NODE_ENV;
    var userId = localStorage.getItem("$rootScope.userDatas"); 
    if (!userId) {
      $rootScope.userDatas = null;
    } else {
      $rootScope.userDatas = currentUserService.GetUserInfosFromLocalStorage("$rootScope.userDatas")
    }

  $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
    if (toParams.private &&  $rootScope.userDatas === null) {
      $state.go('root.connection');
      event.preventDefault();
    } 
  });
}


    // $trace.enable('TRANSITION');

run.$inject = ['$stateParams', '$state','currentUserService', '$location', '$trace', '$transitions','$rootScope']
export default run

