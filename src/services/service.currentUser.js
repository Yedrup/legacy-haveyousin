function currentUserService($window) {

    var getAllDatas = {
        isUserConnected: function () {
            var userId = $window.localStorage.getItem("userId");
            var userToken = $window.localStorage.getItem("token");
            if (userId && $window.localStorage.key("userId")) {
                return true;
            } else {
                return false
            }
        },
        setProfile: function (userId, userToken) {
            var userId = userId;
            var userToken = userToken;
            $window.localStorage.setItem("userId", userId);
            $window.localStorage.setItem("token", userToken);
        },
        getUserdata: function () {
            var userId = $window.localStorage.getItem("userId");
            var userToken = $window.localStorage.getItem("token");
            if (userId && $window.localStorage.key("userId")) {
                var userInfos = {
                    userAccountId: userId,
                    userAccountToken: userToken,
                }
                return userInfos;
            } else {
                return "user is not connected"
            }

        }

    }
    return getAllDatas
}


// currentUserService.$inject = [];

export default currentUserService


// this.$watch('isUserConnected', function(newVal, oldVal){
//     console.log('changed');
// }, true);