function CardTvCtrl (tmdbService) {
    const cardTv = this;
    console.log('card tv ok');   
    cardTv.suggestionsTV ={};
    cardTv.getSuggestionsTV = function () {
        tmdbService
          .discoverTV()
          .then(function (dataSuggestionsTV) {
            cardTv.suggestionsTV = dataSuggestionsTV;
            console.table(cardTv.suggestionsTV);
          });
      };
      cardTv.getSuggestionsTV();  
 } 

export default CardTvCtrl