function listsService(tmdbService, currentUserService, $q, $window, $state, $timeout, $rootScope) {

    function reloadRoot() {
        $state.reload('root');
    }
    var getListService = function () {
        var listService = {
            SetObjectInLocalStorage: function (nameKey, object) {
                $window.localStorage.setItem(nameKey, JSON.stringify(object));
            },

            createListIfNotExists: function (arrayListFromApi, listName, userId, userToken) {
                var isListExists = arrayListFromApi.some(list => list.name === listName);
                if (isListExists === false) {
                    return tmdbService
                        .createList(listName, userToken)
                        .then(function (response) {
                            console.log(response);
                            console.log(listName + ' created');
                            return response;
                        });
                } else {
                    console.log(listName + "already exists");
                    // return "toto";
                }
            },
            setLists: function () {
                var userToken = $rootScope.userDatas.userToken;
                var userAccountId = $rootScope.userDatas.userId;
                var listsBeforeSetting = [];
                return tmdbService
                    .getAllLists(userAccountId)
                    .then(function (response) {
                        console.log(response);
                        listsBeforeSetting = response;
                        return listsBeforeSetting;
                    }).then(function (response) {
                        return Promise.all([
                            getListService.createListIfNotExists(listsBeforeSetting, "watchlist", userAccountId, userToken),
                            getListService.createListIfNotExists(listsBeforeSetting, "favorites", userAccountId, userToken),
                            getListService.createListIfNotExists(listsBeforeSetting, "archive", userAccountId, userToken),
                            getListService.createListIfNotExists(listsBeforeSetting, "calendar", userAccountId, userToken)
                        ]);
                    })
                    .then(function() {
                        tmdbService.getAllLists(userAccountId)
                            .then(function (response) {
                                console.log("tmdbService.getAllList a renvoyé", response);
                                var lists = response;
                                var userList = lists.reduce(function (obj, item) {
                                    var listName = item.name.replace(" ", "");
                                    obj[listName] = item.id;
                                    return obj;
                                }, {});
                                $rootScope.userDatas.listId = userList;
                                return $rootScope.userDatas.listId ;

                            }).then(function (response) {
                                currentUserService.SetUserInfosInLocalStorage("$rootScope.userDatas", $rootScope.userDatas);
                                console.log($rootScope.userDatas.listId);
                                console.log($rootScope.userDatas.listId.archive);
                                console.log($rootScope.userDatas);

                            })
                        });
            },

        }
        return listService

    }();

    return getListService
}


listsService.$inject = ['tmdbService', 'currentUserService', '$q', '$window', '$state', '$timeout', '$rootScope'];

export default listsService

