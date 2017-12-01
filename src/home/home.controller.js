function HomeController(tmdbService) {
    const vm = this;
    console.log('home ok');

    vm.getSuggestionsTV = function () {
        tmdbService
            .discoverTV()
            .then(function (response) {
                console.log(response);
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
                vm.suggestionTV.map(obj => obj.typeContent = "serie");
                vm.suggestionTV.map(obj => obj.icon = "television");
                                
                console.log(vm.suggestionTV);
                return vm.suggestionTV;
            });
    }();


    vm.getSuggestionsMovie = function () {
        tmdbService
            .discoverMovie()
            .then(function (response) {
                console.log(response);
                vm.suggestionMovie = response;
                vm.icon ="film";                          
                vm.suggestionMovie.map(obj => obj.typeContent = "movie");
                vm.suggestionMovie.map(obj => obj.icon = "film");
                return vm.suggestionMovie;
                
                
            });
    }();


}

export default HomeController