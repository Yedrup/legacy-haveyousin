function connectionController($stateParams, $state, $window, currentUserService, listsService, tmdbService, $timeout) {
    var vm = this;
    vm.isUserConnected = currentUserService.isUserConnected();
    vm.userToken = currentUserService.getUserdata().userAccountToken;
    vm.userAccountId = currentUserService.getUserdata().userAccountId;
    vm.reload = function () {
        $state.reload('root');
    }
    // $timeout(currentUserService.getUserdata(), 2000);  

    vm.messageButtonConnect = "Connect HaveYouSin";
    vm.messageButtonConnectTmdb = "Connect on The Movie Database Website";
    vm.messageButtonConnectTmdbClass = "btn waves-effect waves-light  c-button--connect-steps";


    console.log("here I am connection piece of shit");


    vm.createAccount = function () {
        tmdbService
            .getTemporaryToken()
            .then(function (response) {
                vm.responseTemporaryToken = response;
                vm.temporaryToken = vm.responseTemporaryToken.request_token;
                vm.temporaryTokenStatus = vm.responseTemporaryToken.success;
                console.log(vm.temporaryToken);
                $window.open('https://www.themoviedb.org/auth/access?request_token=' + vm.temporaryToken);
                vm.messageButtonConnectTmdbClass = 'btn c-button--connect-steps disabled';
            })
    };

    vm.confirmCreation = function () {
        tmdbService
            .getAccessToken(vm.temporaryToken)
            .then(function (response) {
                vm.accessResponse = response;
                vm.accessToken = vm.accessResponse.access_token;
                vm.accessTokenStatus = vm.accessResponse.success;
                vm.accountId = vm.accessResponse.account_id;
                currentUserService.setProfile(vm.accountId, vm.accessToken);

                // console.log(vm.accessResponse.success);
                // console.log(vm.accountId);
            }).then(function () {
                tmdbService
                    .getAllLists(vm.accountId)
                    .then(function (response) {
                        console.log(response);
                        vm.lists = response;
                        vm.iswatchlist = vm.lists.some(list => list.name === "watchlist");
                        vm.isFavoritesList = vm.lists.some(list => list.name === "favorites");
                        vm.isArchiveList = vm.lists.some(list => list.name === "archive");
                        console.log(vm.iswatchlist);
                        console.log(vm.isFavoritesList);
                        console.log(vm.isArchiveList);
                    })
                    .catch(function onError(response) {
                        vm.responseError = response;
                        vm.messageButtonConnectTmdb = "Retry connecting TMDB";
                        vm.messageButtonConnectTmdbClass = "btn waves-effect waves-light c-button--connect-steps";
                    }).finally(function () {
                        if (!vm.iswatchlist) {
                            tmdbService.createList("watchlist", vm.accessToken);
                            console.log('watchlist created');
                        }
                        if (!vm.isFavoritesList) {
                            tmdbService.createList("favorites", vm.accessToken);
                            console.log('favorite created');
                        }
                        if (!vm.isArchiveList) {
                            tmdbService.createList("archives", vm.accessToken);
                            console.log('archive created');
                        }
                        tmdbService.getAllLists(vm.accountId).then(function(response) {
                            vm.lists = response;
                            vm.lists.map(obj => listsService.SetObjectInLocalStorage(obj.name, obj))
                            console.log(vm.lists);
                        });
                        vm.reload();                        
                        console.log(vm.accessToken)
                    }).catch(function onError(response) {
                        console.log(reponse);
                    })
            })
    }

// vm.isFirstConnection = function () {
//     tmdbService.getTemporaryToken()
//         .then(function (response) {
//             vm.temporaryTokenToCreatewatchlist = response.request_token;
//             $window.open('https://www.themoviedb.org/auth/access?request_token=' + vm.temporaryTokenToCreatewatchlist);
//         }).then(function () {
//             tmdbService.createList("watchlist", vm.accessToken)
//         }).catch(function onError(response) {
//             console.log(reponse);
//         })
// }
}

export default connectionController