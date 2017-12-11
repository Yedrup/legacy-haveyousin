function listController(tmdbService, currentUserService,listsService, $stateParams, $state) {
    var vm = this;
    vm.listname = $stateParams.namelist;
    vm.listid = $stateParams.id;
    
    vm.isUserConnected = currentUserService.isUserConnected();
    vm.userToken = currentUserService.getUserdata().userAccountToken;
    vm.userAccountId = currentUserService.getUserdata().userAccountId;

    // console.log('coucou listcontroller');
    // console.log(vm.listname);
    // console.log(vm.listid);
    vm.reload = function () {
        $state.reload('root');
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

    vm.removeItemFromList = function(typeList, currentItemType, currentItemId) {
        if (typeList === 'watchlist') {
            var listToUpdateId = listsService.getListsInfo().watchlist().id;
        } else if (typeList === 'favorites') {
            var listToUpdateId = listsService.getListsInfo().favorites().id;
        } else if (typeList === 'archive') {
            var listToUpdateId = listsService.getListsInfo().archive().id;
        }
        tmdbService
        .removeItem(listToUpdateId, currentItemType, currentItemId, vm.userToken)
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