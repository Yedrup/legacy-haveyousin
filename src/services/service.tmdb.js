 let envFile = require("../../config-"+process.env.NODE_ENV);

function tmdbService($http, $filter, $rootScope) {

    var API_ENDPOINT_3 = 'https://api.themoviedb.org/3/';
    var API_ENDPOINT_4 = 'https://api.themoviedb.org/4/';

    var API_KEY = envFile.configuration.API_KEY;
    var API_AUTH_READ = envFile.configuration.API_AUTH_READ;

    var today = new Date();
    var startingDateMovie = today.setMonth(today.getMonth() - 2);
    var maxDateMovie = today.setMonth(today.getMonth() + 3);

    var startingDateTv = today.setMonth(today.getMonth() - 6);
    var maxDateTv = today.setMonth(today.getMonth() + 3);
    
    startingDateTv = $filter('date')(startingDateTv, 'yyyy-MM-dd');
    maxDateTv = $filter('date')(maxDateTv, 'yyyy-MM-dd');

    startingDateMovie = $filter('date')(startingDateMovie, 'yyyy-MM-dd');
    maxDateMovie = $filter('date')(maxDateMovie, 'yyyy-MM-dd');

    var api = {
        "getDetailsTV": getDetailsTV,
        "getSearchResult": getSearchResult,
        "getDetailsMovie": getDetailsMovie,
        "getDetailsPeople": getDetailsPeople,
        "discoverTV": discoverTV,
        "discoverMovie": discoverMovie,
        "discoverMovieByYear": discoverMovieByYear,
        "getTemporaryToken": getTemporaryToken,
        "getAccessToken": getAccessToken,
        "disconnectUser": disconnectUser,
        "getAllLists": getAllLists,
        "createList": createList,
        "getOneList": getOneList,
        "addItem": addItem,
        "removeItem": removeItem,


    }
    return api;


    //DETAILS - tv
    function getDetailsTV(id, params) {
        return $http
            .jsonp(API_ENDPOINT_3 + "tv/" + id + "?" + "api_key=" + API_KEY + '&append_to_response=' + params)
            .then(function (data) {
                return data.data;
            })
    }
    //TMDB LIST - discover tv upcomming (today -x/+x months 
    function discoverTV() {
        return $http
            .jsonp(API_ENDPOINT_3 + "discover/tv?" + "api_key=" + API_KEY + "&first_air_date.gte=" + startingDateTv + "&air_date.lte=" + maxDateTv)
            .then(function (data) {
                return data.data.results;
            })
    }
    //TMDB LIST - discover movie upcomming (today -x/+x months )
    function discoverMovie() {
        return $http
            .jsonp(API_ENDPOINT_3 + "discover/movie?" + "api_key=" + API_KEY + "&primary_release_date.gte=" + startingDateMovie + "&primary_release_date.lte=" + maxDateMovie)
            .then(function (data) {
                return data.data.results;
            })
    }
    //TMDB LIST - discover movie best of x year
    function discoverMovieByYear(year) {
        return $http
            .jsonp(API_ENDPOINT_3 + "discover/movie?" + "api_key=" + API_KEY + "&primary_release_year=" + year)
            .then(function (data) {
                return data.data.results;
            })
    }
    //TMDB LIST - upcoming movie
    function upcomingMovie() {
        return $http
            .jsonp(API_ENDPOINT_3 + "discover/upcoming?" + "api_key=" + API_KEY)
            .then(function (data) {
                return data.data.results;
            })
    }
    //DETAILS - movie
    function getDetailsMovie(id, params) {
        return $http
            .jsonp(API_ENDPOINT_3 + "movie/" + id + "?" + "api_key=" + API_KEY + '&append_to_response=' + params)
            .then(function (data) {
                return data.data;
            })
    }
    //DETAILS - people
    function getDetailsPeople(id, params) {
        return $http
            .jsonp(API_ENDPOINT_3 + "person/" + id + "?" + "api_key=" + API_KEY + '&append_to_response=' + params)
            .then(function (data) {
                return data.data;
            })
    }
    //SEARCH
    function getSearchResult(query) {
        return $http
            .jsonp(API_ENDPOINT_3 + "search/multi?" + "api_key=" + API_KEY + "&query=" + query)
            .then(function (data) {
                return data.data.results;
            })
    }
    //CREATE A LIST
    function createList(listName, userToken) {
        return $http({
                method: 'POST',
                url: API_ENDPOINT_4 + "list",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + userToken,
                },
                data: {
                    'name': listName,
                    "iso_639_1": "en",
                    "description": "created on HaveYouSin"
                }
            })
            .then(function (data) {
                return data.data;
            })
    }
    //GET ALL LISTS
    function getAllLists(accountId) {
        return $http({
                method: 'GET',
                url: API_ENDPOINT_4 + 'account/' + accountId + "/lists",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + API_AUTH_READ
                }
            })
            .then(function (data) {
                return data.data.results;
            })
    }
    //GET ONE LIST DETAIL
    function getOneList(listId) {
        return $http({
                method: 'GET',
                url: API_ENDPOINT_4 + "list/" + listId,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + API_AUTH_READ
                }
            })
            .then(function (data) {
                return data.data.results;
            })
    }
    //ITEM - add item to list
    function addItem(listId, contentType, contentId, userToken) {
        return $http({
                method: 'POST',
                url: API_ENDPOINT_4 + "list/" + listId + "/items",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + userToken
                },
                data: {
                    "items": [{
                        'media_type': contentId,
                        'media_id': contentType,
                    }]
                }
            })
            .then(function (data) {
                return data.data.results;
            })
    }
    //ITEM - remove item from list
    function removeItem(listId, contentType, contentId, userToken) {
        return $http({
                method: 'DELETE',
                url: API_ENDPOINT_4 + "list/" + listId + "/items",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + userToken
                },
                data: {
                    "items": [{
                        'media_type': contentId,
                        'media_id': contentType,
                    }]
                }
            })
            .then(function (data) {
                return data.data.results;
            })
    }
    //CONNECT - create a new temporary token request
    function getTemporaryToken() {
        return $http({
                method: 'POST',
                url: API_ENDPOINT_4 + 'auth/request_token',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + API_AUTH_READ,
                }
            })
            .then(function (data) {
                return data.data;
            })
    }
    //CONNECT - create an acces token request
    function getAccessToken(temporaryToken) {
        return $http({
                method: 'POST',
                url: API_ENDPOINT_4 + 'auth/access_token',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + API_AUTH_READ,
                },
                data: {
                    'request_token': temporaryToken,
                }
            })
            .then(function (data) {
                return data.data;
            })
    }
    //DISCONNECT 
    function disconnectUser(token) {
        return $http({
                method: 'DELETE',
                url: API_ENDPOINT_4 + 'auth/access_token/',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
                data: {
                    "access_token": token,
                }
            })
            .then(function (data) {
                return data.data;
            })
    }

}
tmdbService.$inject = ['$http', '$filter'];

export default tmdbService