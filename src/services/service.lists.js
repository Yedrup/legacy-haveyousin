function listsService(tmdbService, currentUserService, $q, $window, $rootScope, $state,$timeout) {
    // var isUserConnected = currentUserService.isUserConnected();
    // var userToken = currentUserService.getUserdata().userAccountToken;
    // var userAccountId = currentUserService.getUserdata().userAccountId;
    

    function reloadRoot() {
        $state.reload('root');
    }
    var getListService = function () {

        var listService = {
            SetObjectInLocalStorage: function (nameKey, object) {
                $window.localStorage.setItem(nameKey, JSON.stringify(object));
            },
            initListService : function () {
                return getListService;
            },
            getListsInfo: function () {
                var lists = {
                    watchlist: function () {
                        return JSON.parse($window.localStorage.getItem("watchlist"));
                    },
                    favorites: function () {
                        return JSON.parse($window.localStorage.getItem("favorites"));
                    },
                    archive: function () {
                        return JSON.parse($window.localStorage.getItem("archive"));
                    },
                    calendar: function () {
                        return JSON.parse($window.localStorage.getItem("calendar"));
                    },
                }
                return lists
            },
            createListIfNotExists: function (arrayListFromApi, listName, userId, userToken) {
                var isListExists = arrayListFromApi.some(list => list.name === listName);
                if (isListExists === false) {
                    tmdbService
                        .createList(listName, userToken)
                        .then(function (response) {
                            console.log(response);
                            console.log(listName + ' created');
                        })
                } else {
                    console.log(listName + "already exists");
                }
            },
            setLists: function (userAccountId,userToken) {
                var userToken = userToken;
                var userAccountId = userAccountId; 
                var lists = [];
                tmdbService
                    .getAllLists(userAccountId)
                    .then(function (response) {
                        console.log(response);
                        lists = response;
                    }).then(function () {
                        getListService.createListIfNotExists(lists, "watchlist", userAccountId, userToken);
                        getListService.createListIfNotExists(lists, "favorites", userAccountId, userToken);
                        getListService.createListIfNotExists(lists, "archive", userAccountId, userToken);
                        getListService.createListIfNotExists(lists, "calendar", userAccountId, userToken);
                    }).then(function() {
                        tmdbService
                        .getAllLists(userAccountId)
                        .then(function (response) {
                            var lists = response;                 
                             return lists;
                        }).then(function() {
                            lists.map(obj => getListService.SetObjectInLocalStorage(obj.name, obj));
                        }) .finally(function () {
                            $window.location.reload();                                                      
                        })
                        
                    })

            },
            // storeListInStorage: function () {
                
                        
            //              return lists;
                        
            //         })
                    // .then(function () {
            //         // })
            // }
        }
        return listService

    }();

    return getListService
}


// currentUserService.$inject = [];

export default listsService


// listsService.SetObjectInLocalStorage("watchlist", response)

// var isWatchlist = lists.some(list => list.name === "watchlist");
// var isFavoritesList = lists.some(list => list.name === "favorites");
// var isArchiveList = lists.some(list => list.name === "archive");
// var isCalendarList = lists.some(list => list.name === "calendar");
// console.log(isWatchlist);
// console.log(isFavoritesList);
// console.log(isArchiveList);
// console.log(isCalendarList);

// if (!isWatchlist || !isFavoritesList || !isArchiveList || !isCalendarList) {
//     $rootScope.initializedLists = false;
//     console.log($rootScope.initializedLists);
// } else {
//     $rootScope.initializedLists = true;
//     console.log($rootScope.initializedLists);
// }

// if (!isWatchlist) {
//     tmdbService
//         .createList("watchlist", userToken)
//         .then(function (response) {
//             console.log('watchlist createds');
//         })
// }
// if (!isFavoritesList) {
//     tmdbService
//         .createList("favorites", userToken)
//         .then(function (response) {

//             console.log('favorite createds');
//         })
// }
// if (!isArchiveList) {
//     tmdbService
//         .createList("archive", userToken)
//         .then(function (response) {
//             console.log('archive createds');
//         })
// }
// if (!isCalendarList) {
//     tmdbService
//         .createList("calendar", userToken)
//         .then(function (response) {
//             console.log('calendar createds');
//         })
// }

// return $rootScope.initializedLists;