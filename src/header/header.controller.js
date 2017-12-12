function HeaderController(tmdbService, $window, currentUserService, listsService, $stateParams, $state,$rootScope) {
    var vm = this;
    vm.temporaryToken;
    vm.isUserConnected = currentUserService.isUserConnected();
    console.log(vm.isUserConnected);
    vm.favoritesName = 'favorites';
    vm.watchlistName = 'watchlist';
    vm.archiveName = 'archive';
    console.log($rootScope.userDatas.archive);

    vm.reload = function (state) {
        $state.reload(state);
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
                })
        }
    };

    vm.disconnect = function () {
        tmdbService
            .disconnectUser($rootScope.userDatas.userToken)
            .then(function (response) {
                console.log(response);
                console.log("GREAT GAME BORDEL")
            })
            .catch(function onError(response) {
                vm.responseError = response;
                console.log('plan de secours');
                $window.localStorage.removeItem("$rootScope.userDatas");
                $rootScope.userDatas = null;
            })
            .finally(function () {
                $rootScope.userDatas = null;
                $state.go('root.connection');   
                event.preventDefault();                
                vm.reload();
                
            })
    }

};
HeaderController.$inject = ['tmdbService', '$window', 'currentUserService', 'listsService', '$stateParams', '$state', '$rootScope'];


export default HeaderController