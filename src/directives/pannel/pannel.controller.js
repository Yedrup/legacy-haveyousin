function PannelController($stateParams, $state, tmdbService, listsService, currentUserService, $rootScope) {
    var pannel = this;
    pannel.reload = function(){
        $state.reload($state.current);
    }

    pannel.listChangement = function (typeList, currentItemType, currentItemId) 
    {
        
        if (typeList === 'watchlist') {
            var listToUpdateId = $rootScope.userDatas.listId.watchlist ;
            var secondaryListInvolvedId = $rootScope.userDatas.listId.favorites;
            var terceraryListInvolvedId = $rootScope.userDatas.listId.archive ;
            
            tmdbService
            .addItem(listToUpdateId, currentItemType, currentItemId, $rootScope.userDatas.userToken)
            .then(function (response) {
            })
            tmdbService
            .removeItem(secondaryListInvolvedId, currentItemType, currentItemId, $rootScope.userDatas.userToken)
            .then(function (response) {
            })
            tmdbService
            .removeItem(terceraryListInvolvedId, currentItemType, currentItemId, $rootScope.userDatas.userToken)
            .then(function (response) {
            }).finally(function() {
                pannel.reload();
            })
        } else if (typeList === 'favorites') {
            var listToUpdateId = $rootScope.userDatas.listId.favorites;
            var secondaryListInvolvedId = $rootScope.userDatas.listId.watchlist;
            var terceraryListInvolvedId =  $rootScope.userDatas.listId.archive;


            tmdbService
            .addItem(listToUpdateId, currentItemType, currentItemId, $rootScope.userDatas.userToken)
            .then(function (response) {
            })
            tmdbService
            .removeItem(secondaryListInvolvedId, currentItemType, currentItemId, $rootScope.userDatas.userToken)
            .then(function (response) {
            })
            tmdbService
            .addItem(terceraryListInvolvedId, currentItemType, currentItemId, $rootScope.userDatas.userToken)
            .then(function (response) {
            }).finally(function() {
                pannel.reload();
            })

        } else if (typeList === 'archive') {

            var listToUpdateId = $rootScope.userDatas.listId.archive ;
            var secondaryListInvolvedId =  $rootScope.userDatas.listId.watchlist;

            tmdbService
            .addItem(listToUpdateId, currentItemType, currentItemId, $rootScope.userDatas.userToken)
            .then(function (response) {
            })
            tmdbService
            .removeItem(secondaryListInvolvedId, currentItemType, currentItemId, $rootScope.userDatas.userToken)
            .then(function (response) {
            }).finally(function() {
                pannel.reload();
            })
        }
    }
}

export default PannelController