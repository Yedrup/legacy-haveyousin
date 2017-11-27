function detailContentController($stateParams, tmdbService) {
  var content = this;
  var id = $stateParams.id;
  content.message = 'page Detail d\'une série';
  content.contentTitle = $stateParams.title;

   function init() {
      tmdbService
        .getDetailsTV(id,'credits,videos')
        .then(function (response) {
          content.contentDetails = response;
          console.log(content.contentDetails);
          
        });
      }
      init();
      
  console.log(content.contentDetails);
  console.log("details of the id " + id + " , title: " +content.contentTitle)
  
// tv.youtubeIframe = function(vid) {
//     var url = 'https://www.youtube.com/embed/'+ vid;
//      return $sce.trustAsHtml('<iframe width="420" height="315"  src="'+url+'" ></iframe>')
//   }
}
  export default detailContentController