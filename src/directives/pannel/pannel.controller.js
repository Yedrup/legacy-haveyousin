function PannelController($stateParams, $state, tmdbService, listsService, currentUserService) {
    var pannel = this;
    console.log('pannel directive ctrl ok');
    pannel.reload = function(){
        $state.reload();
    }
    pannel.userToken = currentUserService.getUserdata().userAccountToken;

    // console.log(detailCtrl);

    // pannel.contentInfoForPannel = {};
    // pannel.returnIdAndType = function (typeList, currentItemId, currentItemType) {
    //     console.log(currentItemId);
    //     console.log(currentItemType);
    //     pannel.contentInfoForPannel = {
    //         'typeList': typeList,
    //         "itemType": currentItemType,
    //         "itemId": currentItemId
    //     };
    //     console.log(pannel.contentInfoForPannel)

    //     // console.log(pannel.contentInfoForPannel.itemId)
    //     return pannel.contentInfoForPannel;
    // }

// console.log(pannel.contentId);

    pannel.listChangement = function (typeList, currentItemType, currentItemId) {
        if (typeList === 'watchlist') {
            var listToUpdateId = listsService.getListsInfo().watchlist.id;
            var secondaryListInvolvedId =  listsService.getListsInfo().favorites.id;
            var terceraryListInvolvedId =  listsService.getListsInfo().archive.id;

            
            tmdbService
            .addItem(listToUpdateId, currentItemType, currentItemId, pannel.userToken)
            .then(function (response) {
                console.log(response);
            })
            tmdbService
            .removeItem(secondaryListInvolvedId, currentItemType, currentItemId, pannel.userToken)
            .then(function (response) {
                console.log(response);
            })
            tmdbService
            .removeItem(terceraryListInvolvedId, currentItemType, currentItemId, pannel.userToken)
            .then(function (response) {
                console.log(response);
            }).finally(function() {
                pannel.reload();
            })
        } else if (typeList === 'favorites') {
            var listToUpdateId = listsService.getListsInfo().favorites.id;
            var secondaryListInvolvedId =  listsService.getListsInfo().watchlist.id;
            var terceraryListInvolvedId =  listsService.getListsInfo().archive.id;
            //le map sera ici pour renvoyer true false si item deja dans liste. S'il y est retirer de favoris seulement, s'il n'y est pas : mettre dans vu et dans favoris
            //sans conditions : retirer watchlist

            tmdbService
            .addItem(listToUpdateId, currentItemType, currentItemId, pannel.userToken)
            .then(function (response) {
                console.log(response);
            })
            tmdbService
            .removeItem(secondaryListInvolvedId, currentItemType, currentItemId, pannel.userToken)
            .then(function (response) {
                console.log(response);
            })
            tmdbService
            .addItem(terceraryListInvolvedId, currentItemType, currentItemId, pannel.userToken)
            .then(function (response) {
                console.log(response);
            }).finally(function() {
                pannel.reload();
            })

        } else if (typeList === 'archive') {
            var listToUpdateId = listsService.getListsInfo().archive.id;
            var secondaryListInvolvedId =  listsService.getListsInfo().watchlist.id;
            
            //le map sera ici pour renvoyer true false si item deja dans liste. S'il y est retirer de favoris et archives, s'il n'y est pas : mettre dans archive
            //sans conditions : retirer watchlist

            tmdbService
            .addItem(listToUpdateId, currentItemType, currentItemId, pannel.userToken)
            .then(function (response) {
                console.log(response);
            })
            tmdbService
            .removeItem(secondaryListInvolvedId, currentItemType, currentItemId, pannel.userToken)
            .then(function (response) {
                console.log(response);
            }).finally(function() {
                pannel.reload();
            })
        }
    }
    
    // console.log(listsService.getListsInfo().watchlist.id);
    
    
    // pannel.addItem = function() {
        //     pannel.returnIdAndType(pannel.contentInfoForPannel)
        
        // tmdbService
              //     .addItem(listToUpdateId, currentItemType, currentItemId, pannel.userToken)
              //     .then(function (response) {
              //         console.log(response);
              //     })      
    // }





}


export default PannelController