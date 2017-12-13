function HeaderController(tmdbService, $window, currentUserService, listsService, $stateParams, $state,$rootScope) {
    var vm = this;
    vm.temporaryToken;
    vm.isUserConnected = currentUserService.isUserConnected();
    vm.favoritesName = 'favorites';
    vm.watchlistName = 'watchlist';
    vm.archiveName = 'archive';

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
                    vm.resultsOrigin = listsService.keyChange(vm.resultsOrigin, vm.results, 'name', 'title');
                    vm.results = listsService.keyChange(vm.resultsOrigin, vm.results, 'first_air_date', 'release_date');
                })
        }
    };

    vm.disconnect = function () {
        tmdbService
            .disconnectUser($rootScope.userDatas.userToken)
            .then(function (response) {
            })
            .catch(function onError(response) {
                vm.responseError = response;
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