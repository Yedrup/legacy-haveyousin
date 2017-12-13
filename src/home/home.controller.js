function HomeController(tmdbService, currentUserService,listsService) {
    var vm = this;
    vm.isUserConnected = currentUserService.isUserConnected();
    

    vm.getSuggestionsTV = function () {
        tmdbService
            .discoverTV()
            .then(function (response) {
                vm.suggestionTVOrigin = response;
                vm.suggestionTV = listsService.keyChange(vm.suggestionTVOrigin, vm.suggestionTV, 'name', 'title');
                vm.suggestionTV = listsService.keyChange(vm.suggestionTVOrigin, vm.suggestionTV, 'first_air_date', 'release_date');
                vm.suggestionTV.map(obj => obj.typeContent = "tv");
                vm.suggestionTV.map(obj => obj.icon = "television");       
                vm.suggestionTV.cardLimit = 8;
                
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
                vm.suggestionMovie.cardLimit = 8;
                return vm.suggestionMovie;
            });
    }();
    
    vm.getSuggestionsMovieByYear = function () {
        tmdbService
            .discoverMovieByYear("2016")
            .then(function (response) {
                vm.suggestionMovieByYear16 = response;
                vm.suggestionMovieByYear16.map(obj => obj.typeContent = "movie");
                vm.suggestionMovieByYear16.map(obj => obj.icon = "film");
                vm.suggestionMovieByYear16.cardLimit = 8;
                return vm.suggestionMovieByYear16;
            });
    }();

    vm.getSuggestionsMovieByYear = function () {
        tmdbService
            .discoverMovieByYear("2015")
            .then(function (response) {
                vm.suggestionMovieByYear15 = response;
                vm.suggestionMovieByYear15.map(obj => obj.typeContent = "movie");
                vm.suggestionMovieByYear15.map(obj => obj.icon = "film");
                vm.suggestionMovieByYear15.cardLimit = 8;
                return vm.suggestionMovieByYear15;
            });
    }();

}

export default HomeController