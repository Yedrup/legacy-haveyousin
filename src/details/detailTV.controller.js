function DetailTvController($stateParams, tmdbService) {
  var tv = this;
  var id = $stateParams.id;
  tv.message = 'page Detail d\'une série';
  tv.contentTitle = $stateParams.title;

   function init() {
      tmdbService
        .getDetailsTV(id,'credits,videos')
        .then(function (response) {
          tv.contentDetails = response;
          console.log(tv.contentDetails);
          
        });
      }
      init();
      
  console.log(tv.contentDetails);
  console.log("details of the id " + id + " , title: " + tv.contentTitle)
  
// tv.youtubeIframe = function(vid) {
//     var url = 'https://www.youtube.com/embed/'+ vid;
//      return $sce.trustAsHtml('<iframe width="420" height="315"  src="'+url+'" ></iframe>')
//   }
}
  export default DetailTvController