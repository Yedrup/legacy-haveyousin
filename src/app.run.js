function run($stateParams, $state,currentUserService, $location, $trace, $transition) {
    console.log('en direct du run');
    var userId = localStorage.getItem("userId");
    if (!userId) {
        $state.go('connection');
        console.log('pas cooco');
    }

    // $trace.enable('TRANSITION');


}

run.$inject = ['$stateParams', '$state','currentUserService', '$location', '$trace', '$transitions'];

export default run



// if(!userId || userId === null) {
//     StateService.go('connection');
// }
// console.log(userToken);
// console.log(userId);
// console.log(currentUserService);
// $timeout(currentUserService.getUserdata(), 2000);  

// $transitions.onStart({ }, function(trans) {
//     var currentUserService = trans.injector().get('currentUserService');
//     SpinnerService.transitionStart();
//     trans.promise.finally(SpinnerService.transitionEnd);
//   });
// $transitions.onStart({ }, function(trans) {
//     var currentUserService = trans.injector().get('currentUserService');
//     currentUserService.transitionStart();
//     trans.promise.finally(currentUserService.transitionEnd)
//   });

// $transitions.onStart({ to: "connection", from: "*"  }, function(trans) {
//     var auth = trans.injector().get('currentUserService');
//     if (!auth.userInfos.isUserConnected) {
//       // User isn't authenticated. Redirect to a new Target State
//       return trans.router.stateService.target('connection');
//     } else {
//         console.log('je passe par là')
//     }
//   });

// function verifyAuth(trans) {
//     let nextState = trans.to();
//     let nextParams = trans.params();
//     if (Auth.verify(nextState.authGroup) === -1) {      
//       return $state.go('connect', { nextState: nextState.name, nextParams: nextParams});
//     }
//   }