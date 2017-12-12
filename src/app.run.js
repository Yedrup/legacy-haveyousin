function run($stateParams, $state,currentUserService, $location, $trace, $transition, $rootScope) {
    console.log('en direct du run');


    // {
    //     userId: null,
    //     userToken: null,
    //     listId : {
    //         watchListId: null,
    //         archivesListId: null,
    //         favoritesListId: null
    //     }
    // }

    // if ($rootScope.userDatas.userId === null || undefined) {
    //     return true;
    // } else {
    //     return false
    // }



    var userId = localStorage.getItem("$rootScope.userDatas"); //if user (object) item $rootScope blabla
    if (!userId) { //if pas user
      $rootScope.userDatas = null;
    } else {
      $rootScope.userDatas = currentUserService.GetUserInfosFromLocalStorage("$rootScope.userDatas")
     console.log("j'ai des datas dans mon storage");
     console.log($rootScope.userDatas)
    }



    if ($rootScope.userDatas) {
        console.log('you re connected')
        
    } else {
        console.log('you are disconnected')
        
    }

    // Enregistrement d'un évènement pour le changement des states (pour vérifier si on est autorisé à en afficher certains)
  $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
    if (toParams.private &&  $rootScope.userDatas === null) {
      $state.go('root.connection');
      event.preventDefault();
    } else {
      console.log('no problemo you can be there');
    }
  });
    
  
//  {
//       id: null,
//       token: null,
//       listId : {
//           watchlistId: null,
//           archiveslistId : null,
//           favoriteslistId: null
//       }
//   }
}


    // $trace.enable('TRANSITION');

run.$inject = ['$stateParams', '$state','currentUserService', '$location', '$trace', '$transitions','$rootScope']
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