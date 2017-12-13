function detailContentController($stateParams, tmdbService,currentUserService, listsService, $rootScope) {
  var vm = this;
  var id = $stateParams.id;
  vm.contentId = $stateParams.id;
  vm.type = $stateParams.type;
  vm.contentTitle = $stateParams.title;
  vm.reload = function(){
    $state.reload();
}
  vm.init = function () {
    vm.isUserConnected = currentUserService.isUserConnected();
    
    if (vm.type === "tv") {
      tmdbService
        .getDetailsTV(id, 'credits,videos')
        .then(function (response) {
          vm.contentDetails = response;
          vm.mainCharacters = vm.contentDetails.credits.cast.splice(0, 9);
          vm.secondCharacters = vm.contentDetails.credits.cast.splice(0, vm.contentDetails.credits.cast.length);
        });
    } else if (vm.type === "movie") {
      tmdbService
        .getDetailsMovie(id, 'credits,videos')
        .then(function (response) {
          vm.contentDetails = response;
          vm.mainCharacters = vm.contentDetails.credits.cast.splice(0, 9);
          vm.secondCharacters = vm.contentDetails.credits.cast.splice(0, vm.contentDetails.credits.cast.length);
        });
    } else {
      //people 
      tmdbService
        .getDetailsPeople(id, 'combined_credits')
        .then(function (response) {
          vm.contentDetails = response;
          vm.type = "people";
          vm.actoringOrigin = vm.contentDetails.combined_credits.cast;
          vm.actoringIn = listsService.keyChange(vm.actoringOrigin, vm.actoringIn, 'first_air_date', 'release_date');
          vm.actoringIn = listsService.keyChange(vm.actoringOrigin, vm.actoringIn, 'name', 'title');          
        });

    }
  }();


}
export default detailContentController