function CardContentCtrl(tmdbService) {
    const content = this;
    console.log('card content ok');
    content.isSerie;
    content.dataToBind={};
    content.number = 4;
    
    // content.getSuggestionsTV = function () {
    //     tmdbService
    //         .discoverTV()
    //         .then(function (response) {
    //             // console.log(response);
    //             content.dataToBind = response;
    //             content.isSerie = true;
    //         });
            
    // }();


    content.getSuggestionsMovie = function () {
        tmdbService
            .discoverMovie()
            .then(function (response) {
                console.log(response);
                content.dataToBind = response;
                content.isSerie = false;
            });  
    }();

    // cardTv.getMoreDetailsTV = function () {
    //     tmdbService
    //         .getDetailsTV(cardTv.tvId)
    //         .then(function (response) {
    //             cardTv.moreDetailsTV = response;
    //             // console.log(cardTv.moreDetailsTV);
    //         });
    // };

    // cardTv.search = function () {
    //     tmdbService
    //         .searchInfo(cardTv.query)
    //         .then(function (dataSearched) {
    //             // console.log(dataSearched);
    //         })
    // };

    // cardTv.getMoreDetailsTV();
    // cardTv.search();
}


export default CardContentCtrl