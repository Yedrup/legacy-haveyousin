function CardTvCtrl(tmdbService) {
    const cardTv = this;
    console.log('card tv ok');
    cardTv.suggestionsTV = {};
    cardTv.moreDetailsTV = {};
    cardTv.tvId = "1402";
    cardTv.query = "brad";

    cardTv.getSuggestionsTV = function () {
        tmdbService
            .discoverTV()
            .then(function (response) {
                cardTv.suggestionsTV = response;
                // console.table(cardTv.suggestionsTV);
            });
    };

    //fix me, I return undefined
    cardTv.getMoreDetailsTV = function () {
        tmdbService
            .getDetailsTV(cardTv.tvId)
            .then(function (response) {
                cardTv.moreDetailsTV = response;
                // console.log(cardTv.moreDetailsTV);
            });
    };

    cardTv.search = function () {
        tmdbService
            .searchInfo(cardTv.query)
            .then(function (dataSearched) {
                // console.log(dataSearched);
            })
    };

    cardTv.getSuggestionsTV();
    // cardTv.getMoreDetailsTV();
    // cardTv.search();
}


export default CardTvCtrl