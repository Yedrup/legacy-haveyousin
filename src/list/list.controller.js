function listController(tmdbService, currentUserService,listsService, $stateParams, $state, $rootScope) {
    var vm = this;
    vm.listname = $stateParams.namelist;
    vm.listid = $stateParams.id;
    
    vm.isUserConnected = currentUserService.isUserConnected();

    vm.reload = function () {
        $state.reload($state.current);
    }
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


    console.log($rootScope.userDatas.archive);
    

    vm.removeItemFromList = function(typeList, currentItemType, currentItemId) {
        if (typeList === 'watchlist') {
            var listToUpdateId = $rootScope.userDatas.listId.watchlist;
        } else if (typeList === 'favorites') {
            var listToUpdateId = $rootScope.userDatas.listId.favorites;
        } else if (typeList === 'archive') {
            var listToUpdateId = $rootScope.userDatas.listId.archive;
        }
        tmdbService
        .removeItem(listToUpdateId, currentItemType, currentItemId, $rootScope.userDatas.userToken)
        .then(function (response) {
            console.log(response)
        }).finally(function () {
            vm.reload();
        })
    }

    vm.init = function () {
        tmdbService
        .getOneList(vm.listid)
        .then(function(response) {
            console.log(response);
            vm.contentOrigin = response;
            vm.contentOrigin.map(obj => {
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
            vm.contentOrigin = vm.keyChange(vm.contentOrigin, vm.content, 'name', 'title');
            vm.content = vm.keyChange(vm.contentOrigin, vm.content, 'first_air_date', 'release_date');
        })
    }();
}




export default listController