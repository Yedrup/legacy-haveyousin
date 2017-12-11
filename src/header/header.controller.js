function HeaderController(tmdbService, $window, currentUserService, listsService, $stateParams, $state) {
    var vm = this;
    vm.watchlist = listsService.getListsInfo().watchlist();
    vm.favorites = listsService.getListsInfo().favorites();
    vm.archive = listsService.getListsInfo().archive();
    vm.calendar = listsService.getListsInfo().calendar();
    vm.temporaryToken;
    var userToken = currentUserService.getUserdata().userAccountToken;
    vm.isUserConnected = currentUserService.isUserConnected();
    vm.userToken = currentUserService.getUserdata().userAccountToken;
    vm.userAccountId = currentUserService.getUserdata().userAccountId;
    // console.log(currentUserService);
    console.log(currentUserService.isUserConnected());
    console.log(currentUserService.getUserdata().userAccountId);
    console.log(userToken);
    console.log(listsService.getListsInfo().watchlist());

    vm.reload = function () {
        $state.reload('root');
    }
    vm.search = function () {
        if (vm.query.length > 0) {
            tmdbService
                .getSearchResult(vm.query)
                .then(function (response) {
                    vm.resultsOrigin = response;
                    vm.resultsOrigin.map(obj => {
                        if (obj.media_type === 'tv') {
                            obj.typeContent = "tv";
                            obj.icon = "television";
                        } else if (obj.media_type === 'movie') {
                            obj.typeContent = "movie";
                            obj.icon = "film";
                        } else if (obj.media_type === 'person') {
                            obj.typeContent = "people";
                            obj.icon = "user";
                        }
                    });
                    vm.keyChange = function (arrayOrigin, arrayNew, keyOrigin, keyNew) {
                        return arrayNew = arrayOrigin.map(function (item) {
                            if (keyOrigin in item) {
                                var mem = item[keyOrigin];
                                delete item[keyOrigin];
                                item[keyNew] = mem;
                            }
                            return item;
                        });
                    }
                    vm.resultsOrigin = vm.keyChange(vm.resultsOrigin, vm.results, 'name', 'title');
                    vm.results = vm.keyChange(vm.resultsOrigin, vm.results, 'first_air_date', 'release_date');
                    // console.log(vm.results);
                })
        }
    };

    vm.disconnect = function () {
        var token = localStorage.getItem("token");
        tmdbService
            .disconnectUser(token)
            .then(function (response) {
                console.log(response);
                // localStorage.removeItem("userId");
                // localStorage.removeItem("token");
                console.log("GREAT GAME BORDEL")
            })
            .catch(function onError(response) {
                currentUserService.getUserdata();
                vm.responseError = response;
                console.log('plan de secours');
                $window.localStorage.removeItem("userId");
                $window.localStorage.removeItem("token");
                $window.localStorage.removeItem("watchlist");
                $window.localStorage.removeItem("favorites");
                $window.localStorage.removeItem("archive");
                $window.localStorage.removeItem("calendar");
            })
            .finally(function () {
                vm.reload();
            })
    }

};
HeaderController.$inject = ['tmdbService', '$window', 'currentUserService', 'listsService', '$stateParams', '$state'];


export default HeaderController