function listsService(tmdbService, currentUserService,$window, $state, $rootScope) {

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
                            return response;
                        });
                }
            },
            keyChange: function (arrayOrigin, arrayNew, keyOrigin, keyNew) {
                return arrayNew = arrayOrigin.map(function (item) {
                    if (keyOrigin in item) {
                        var mem = item[keyOrigin];
                        delete item[keyOrigin];
                        item[keyNew] = mem;
                    }
                    return item;
                });
            },
            setLists: function () {
                var userToken = $rootScope.userDatas.userToken;
                var userAccountId = $rootScope.userDatas.userId;
                var listsBeforeSetting = [];
                return tmdbService
                    .getAllLists(userAccountId)
                    .then(function (response) {
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
                    .then(function () {
                        tmdbService.getAllLists(userAccountId)
                            .then(function (response) {
                                var lists = response;
                                var userList = lists.reduce(function (obj, item) {
                                    var listName = item.name.replace(" ", "");
                                    obj[listName] = item.id;
                                    return obj;
                                }, {});
                                $rootScope.userDatas.listId = userList;
                                return $rootScope.userDatas.listId;

                            }).then(function (response) {
                                currentUserService.SetUserInfosInLocalStorage("$rootScope.userDatas", $rootScope.userDatas);
                            })
                    });
            },

        }
        return listService

    }();

    return getListService
}


listsService.$inject = ['tmdbService', 'currentUserService','$window', '$state', '$rootScope'];

export default listsService