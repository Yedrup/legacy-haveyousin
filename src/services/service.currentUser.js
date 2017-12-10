function currentUserService() {

    var getAllDatas = {
        isUserConnected: function () {
            var userId = localStorage.getItem("userId");
            var userToken = localStorage.getItem("token");
            if (userId && localStorage.key("userId")) {
                return true;
            } else {
                return false
            }
        },
        setProfile: function (userId, userToken) {
            var userId = userId;
            var userToken = userToken;
            localStorage.setItem("userId", userId);
            localStorage.setItem("token", userToken);
        },
        getUserdata: function () {
            var userId = localStorage.getItem("userId");
            var userToken = localStorage.getItem("token");
            if (userId && localStorage.key("userId")) {
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