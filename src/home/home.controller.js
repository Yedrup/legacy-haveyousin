function HomeController(tmdbService, currentUserService) {
    var vm = this;
    vm.isUserConnected = currentUserService.isUserConnected();
    

    vm.getSuggestionsTV = function () {
        tmdbService
            .discoverTV()
            .then(function (response) {
                vm.suggestionTVOrigin = response;
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
                vm.suggestionTV = vm.keyChange(vm.suggestionTVOrigin, vm.suggestionTV, 'name', 'title');
                vm.suggestionTV = vm.keyChange(vm.suggestionTVOrigin, vm.suggestionTV, 'first_air_date', 'release_date');
                vm.suggestionTV.map(obj => obj.typeContent = "tv");
                vm.suggestionTV.map(obj => obj.icon = "television");       
                // console.log(vm.suggestionTV);
                vm.suggestionTV.cardLimit = 5;
                
                return vm.suggestionTV;
            });
    }();


    vm.getSuggestionsMovie = function () {
        tmdbService
            .discoverMovie()
            .then(function (response) {
                vm.suggestionMovie = response;
                vm.suggestionMovie.map(obj => obj.typeContent = "movie");
                vm.suggestionMovie.map(obj => obj.icon = "film");
                // console.log(vm.suggestionMovie);   
                vm.suggestionMovie.cardLimit = 5;
                return vm.suggestionMovie;
            });
    }();


}

export default HomeController