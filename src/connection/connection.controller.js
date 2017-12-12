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
                console.log(vm.temporaryToken);
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

                console.log($rootScope.userDatas.listId);
                console.log($rootScope.userDatas.userId);
                console.log($rootScope.userDatas.userToken);


            }).catch(function onError(response) {
                vm.responseError = response;
                vm.messageButtonConnectTmdb = "Retry connecting TMDB";
                vm.messageButtonConnectTmdbClass = "btn waves-effect waves-light c-button--connect-steps";
            }).then(function () {
                return listsService.setLists();
                
            }).finally(function () {
                console.log($rootScope.userDatas.listId);
                console.log($rootScope.userDatas.userId);
                vm.reload('root');
            })


    }

}

export default connectionController

// console.log(vm.accessResponse.success);
// console.log(vm.accountId);
// vm.userToken = $rootScope.userDatas.userToken;
// vm.userAccountId = $rootScope.userDatas.userId;

// currentUserService.setProfile($rootScope.userDatas.userId, $rootScope.userDatas.userToken);
// currentUserService.SetUserInfosInLocalStorage("$rootScope.userDatas", $rootScope.userDatas);




// vm.isUserConnected = currentUserService.isUserConnected();
// vm.userToken = currentUserService.getUserdata().userAccountToken;
// vm.userAccountId = currentUserService.getUserdata().userAccountId;
// console.log($rootScope.userDatas.listId);
// console.log($rootScope.userDatas.userId);
// console.log($rootScope.userDatas.userToken);

// .finally(function() {
//     tmdbService
//     .getAllLists(userAccountId)
//     .then(function (response) {
//         var lists = response;  
//         // var userList =
//         // lists.map(obj =>  
//         //     {obj.name + ' : ' + obj.id } );

//         var userList = lists.reduce(function(obj, item) {
//             var listName = item.name.replace(" ", "");
//             obj[listName] = item.id;
//             return obj;
//     }, {});
//         $rootScope.userDatas.listId = userList;


//         currentUserService.SetUserInfosInLocalStorage("$rootScope.userDatas", $rootScope.userDatas);     
//         console.log($rootScope.userDatas.listId);
//         console.log($rootScope.userDatas.listId.archive);
//         console.log($rootScope.userDatas);
//     })
//     // .then(function() {
//     //     // lists.map(obj =>
//     //         // getListService.SetObjectInLocalStorage(obj.name, obj));
//     // }) .finally(function () {
//     //    // $window.location.reload();                                                      
//     // })

// })

// .then(function() {
//     // listsService.storeListInStorage();                            
//     listsService.initListService();
// })