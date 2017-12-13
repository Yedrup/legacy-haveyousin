function CalendarController(tmdbService, currentUserService, $rootScope, listsService) {
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
                vm.suggestionTV.cardLimit = 20;

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
                vm.suggestionMovie.cardLimit = 20;
                return vm.suggestionMovie;
            });
    }();


}

export default CalendarController