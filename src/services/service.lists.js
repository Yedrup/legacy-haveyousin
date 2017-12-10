function listsService() {
    
        var getListService = {
            //mettre dans une utility service
            SetObjectInLocalStorage: function (nameKey,object) {
                localStorage.setItem(nameKey, JSON.stringify(object));
            },
            getListsInfo: function () {
                var watchlist = JSON.parse(localStorage.getItem("watchlist"));
                var favorites = JSON.parse(localStorage.getItem("favorites"));
                var archive = JSON.parse(localStorage.getItem("archive"));
                var lists = {
                     watchlist : watchlist,
                     favorites:favorites,
                     archive:archive,
                }
                return lists
            }
        }





        return getListService
    }
    
    
    // currentUserService.$inject = [];
    
    export default listsService
