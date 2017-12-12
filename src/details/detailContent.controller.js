function detailContentController($stateParams, tmdbService,currentUserService, $rootScope) {
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
    // event.preventDefault();
    

    if (vm.type === "tv") {
      tmdbService
        .getDetailsTV(id, 'credits,videos')
        .then(function (response) {
          vm.message = 'page Detail d\'une série';
          vm.contentDetails = response;
          vm.mainCharacters = vm.contentDetails.credits.cast.splice(0, 9);
          vm.secondCharacters = vm.contentDetails.credits.cast.splice(0, vm.contentDetails.credits.cast.length);
          console.log(vm.contentDetails);
          
          // console.log(vm.mainCharacters);
          // console.log(vm.contentDetails);

        });
    } else if (vm.type === "movie") {
      tmdbService
        .getDetailsMovie(id, 'credits,videos')
        .then(function (response) {
          vm.message = "page Detail d\'un film";
          vm.contentDetails = response;
          vm.mainCharacters = vm.contentDetails.credits.cast.splice(0, 9);
          vm.secondCharacters = vm.contentDetails.credits.cast.splice(0, vm.contentDetails.credits.cast.length);
          console.log(vm.contentDetails);
        });
    } else {
      //people get people Detail
      tmdbService
        .getDetailsPeople(id, 'combined_credits')
        .then(function (response) {
          vm.message = "page Detail d\'un people";
          vm.contentDetails = response;
          vm.type = "people";
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
          vm.actoringOrigin = vm.contentDetails.combined_credits.cast;
          vm.actoringIn = vm.keyChange(vm.actoringOrigin, vm.actoringIn, 'first_air_date', 'release_date');
          vm.actoringIn = vm.keyChange(vm.actoringOrigin, vm.actoringIn, 'name', 'title');
          // console.log(vm.actoringIn);
          // console.log(vm.contentDetails);
          
        });

    }


  }();





  console.log("details of the id " + id + " , title: " + vm.contentTitle)

  // tv.youtubeIframe = function(vid) {
  //     var url = 'https://www.youtube.com/embed/'+ vid;
  //      return $sce.trustAsHtml('<iframe width="420" height="315"  src="'+url+'" ></iframe>')
  //   }
}
export default detailContentController