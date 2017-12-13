function connectionController($stateParams, $state, $window, currentUserService, listsService, tmdbService, $rootScope, $q, $timeout) {
    var vm = this;

    vm.isUserConnected = currentUserService.isUserConnected();

    vm.messageButtonConnect = "Connect HaveYouSin";
    vm.messageButtonConnectTmdb = "Connect on The Movie Database Website";
    vm.messageButtonConnectTmdbClass = "btn waves-effect waves-light  c-button--connect-steps";

    vm.reload = function (state) {
        $state.reload(state);
    }

    vm.createAccount = function () {
        tmdbService
            .getTemporaryToken()
            .then(function (response) {
                vm.responseTemporaryToken = response;
                vm.temporaryToken = vm.responseTemporaryToken.request_token;
                vm.temporaryTokenStatus = vm.responseTemporaryToken.success;
                $window.open('https://www.themoviedb.org/auth/access?request_token=' + vm.temporaryToken);
                vm.messageButtonConnectTmdbClass = 'btn c-button--connect-steps disabled';
            })
    };

    vm.confirmCreation = function () {
        var userAccountId;
        var userToken;
        tmdbService
            .getAccessToken(vm.temporaryToken)
            .then(function (response) {
                vm.accessResponse = response;
                userToken = vm.accessResponse.access_token;
                userAccountId = vm.accessResponse.account_id;
                vm.accessTokenStatus = vm.accessResponse.success;
                $rootScope.userDatas = {
                    userId: userAccountId,
                    userToken: userToken
                }

            }).catch(function onError(response) {
                vm.responseError = response;
                vm.messageButtonConnectTmdb = "Retry connecting TMDB";
                vm.messageButtonConnectTmdbClass = "btn waves-effect waves-light c-button--connect-steps";
            }).then(function () {
                return listsService.setLists();
                
            }).finally(function () {
                vm.reload('root');
            })


    }

}

export default connectionController
