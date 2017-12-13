function currentUserService($window, $rootScope) {

    var getAllDatas = {
        isUserConnected: function () {
            if ($rootScope.userDatas !== null) {
                return true;
            } else {
                return false
            }
        },
        SetUserInfosInLocalStorage: function (nameKey, object) {
            return $window.localStorage.setItem(nameKey, JSON.stringify(object));
        },
        GetUserInfosFromLocalStorage: function (nameKeyOject) {
            return JSON.parse($window.localStorage.getItem(nameKeyOject));
        },
    }
    return getAllDatas
}

currentUserService.$inject = ['$window', '$rootScope'];
export default currentUserService