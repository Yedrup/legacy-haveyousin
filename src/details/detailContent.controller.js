function detailContentController($stateParams, tmdbService) {
  var vm = this;
  var id = $stateParams.id;
  vm.type = $stateParams.type;
  vm.contentTitle = $stateParams.title;

  vm.init= function() {
    if (vm.type === "serie") {
      tmdbService
        .getDetailsTV(id, 'credits,videos')
        .then(function (response) {
          vm.message = 'page Detail d\'une série';          
          vm.contentDetails = response;
          console.log(vm.contentDetails);
          vm.mainCharacters = vm.contentDetails.credits.cast.splice(0,10);
          vm.secondCharacters = vm.contentDetails.credits.cast.splice(0,vm.contentDetails.credits.cast.length);
        });
    } 
    else if (vm.type === "movie") {
      tmdbService
        .getDetailsMovie(id, 'credits,videos')
        .then(function (response) {
          vm.message = "page Detail d\'un film";
          vm.contentDetails = response;
          vm.mainCharacters = vm.contentDetails.credits.cast.splice(0,10);
          vm.secondCharacters = vm.contentDetails.credits.cast.splice(0,vm.contentDetails.credits.cast.length);
          console.log(vm.contentDetails);
        });
    }


  }




  vm.init();

  console.log("details of the id " + id + " , title: " + vm.contentTitle)

  // tv.youtubeIframe = function(vid) {
  //     var url = 'https://www.youtube.com/embed/'+ vid;
  //      return $sce.trustAsHtml('<iframe width="420" height="315"  src="'+url+'" ></iframe>')
  //   }
}
export default detailContentController