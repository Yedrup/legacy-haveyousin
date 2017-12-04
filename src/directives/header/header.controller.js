function HeaderController(tmdbService) {
    const vm = this;
    console.log(vm.query);
    vm.search = function () {
        tmdbService
            .getSearchResult(vm.query)
            .then(function (response) {
                vm.resultsOrigin = response;
                vm.resultsOrigin.map(obj => {
                    if(obj.media_type ==='tv') {
                         obj.typeContent = "serie";
                         obj.icon = "television";
                    } else if (obj.media_type ==='movie') {
                         obj.typeContent = "movie";
                         obj.icon = "film";
                    } else if (obj.media_type ==='person'){
                         obj.typeContent= "people";
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

                
                console.log(vm.results);
            }
        
        
        
        )
    };
};

export default HeaderController