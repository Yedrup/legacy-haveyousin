function connectionController($stateParams, $state, $window, currentUserService, listsService, tmdbService, $rootScope, $q, $timeout) {
    var vm = this;
  

    vm.isUserConnected = currentUserService.isUserConnected();
    vm.userToken = currentUserService.getUserdata().userAccountToken;
    vm.userAccountId = currentUserService.getUserdata().userAccountId;

    vm.messageButtonConnect = "Connect HaveYouSin";
    vm.messageButtonConnectTmdb = "Connect on The Movie Database Website";
    vm.messageButtonConnectTmdbClass = "btn waves-effect waves-light  c-button--connect-steps";

    vm.reload = function () {
        $state.reload('root');
    }

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
        var userAccountId;
        var userToken ;
        tmdbService
            .getAccessToken(vm.temporaryToken)
            .then(function (response) {
                vm.accessResponse = response;
                vm.accessToken = vm.accessResponse.access_token;
                userToken = vm.accessResponse.access_token;
                userAccountId = vm.accessResponse.account_id;
                vm.accessTokenStatus = vm.accessResponse.success;
                vm.accountId = vm.accessResponse.account_id;
                currentUserService.setProfile(userAccountId, userToken);
                // console.log(vm.accessResponse.success);
                // console.log(vm.accountId);
            }).catch(function onError(response) {
                vm.responseError = response;
                vm.messageButtonConnectTmdb = "Retry connecting TMDB";
                vm.messageButtonConnectTmdbClass = "btn waves-effect waves-light c-button--connect-steps";
            }).then(function () {
                listsService.setLists(userAccountId,userToken);
            }).then(function() {
                // listsService.storeListInStorage();                            
                listsService.initListService();
            }).finally(function() {
                
                vm.reload();               
            })
           
            
    }

}

export default connectionController