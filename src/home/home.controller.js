function HomeController(tmdbService) {
    const vm = this;
    console.log('home ok');

    vm.getSuggestionsTV = function () {
        tmdbService
            .discoverTV()
            .then(function (response) {
                console.log(response);
                vm.suggestionTV = response;
                return vm.suggestionTV;    
                        
            });
    }();


    vm.getSuggestionsMovie = function () {
        tmdbService
            .discoverMovie()
            .then(function (response) {
                console.log(response);
                return vm.suggestionMovie = response;
            });
    }();
    

}

export default HomeController