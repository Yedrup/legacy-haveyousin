function HomeController(tmdbService) {
//   const home = this;
//   //todo : home.query needs to take the value of input search
//   home.query = "brad"; 
//   // home.message = 'home controller ok !';
  
//   home.suggestionsTV ={};
//   home.suggestionsMovie ={};
//   home.AllSuggestions ={};

//   home.getSuggestionsTV = function () {
//     tmdbService
//       .discoverTV()
//       .then(function (dataSuggestionsTV) {
//         home.suggestionsTV = dataSuggestionsTV;
//         console.table(home.suggestionsTV);
//       });
//   };
  
//   home.getSuggestionsMovie = function () {
//       tmdbService
//       .discoverMovie()
//       .then(function (dataSuggestionsMovie) {
//         home.suggestionsMovie = dataSuggestionsMovie;
//         console.log(home.suggestionsMovie);
//       });
//   };

//   home.search = function () {
//     tmdbService
//       .searchInfo(home.query)
//       .then(function (dataSearched) {
//         // console.log(dataSearched);
//       })
//   }


//   // home.getSuggestionsMovie();  
//   home.getSuggestionsTV();  
  
//   // home.search();

}

export default HomeController