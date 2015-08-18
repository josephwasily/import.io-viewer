(function() {
    "use strict";

    
    var module = angular.module("importIOViewerApp");


    /* Service to grab data from import.io API */
    module.factory("dataGrabberFactory", ["$http", "$q",
        function($http, $q) {
            /* URL from which the data is fetched */
            var DATA_URL = "https://api.import.io/store/data/2a6e4562-1ec5-40d8-876b-5a9d6ad0bd6e/_query?input/webpage/url=http%3A%2F%2Fwww.ikea.com%2Fus%2Fen%2Fsearch%2F%3Fquery%3Dchair&_user=b81b82d5-5dc6-4c91-9791-3c4279727744&_apikey=b81b82d55dc64c9197913c42797277446e16bb52081e38838e61bfced0460ef53fec7dc8c4818e762e8004039e2739716b0ca23bd7bff1efd3c0dabd7b2fab335aa2f8420df378bd247d8386e2bd3ad8";
            
            /* Create a deffered object */
            var deferred = $q.defer();

            $http.get(DATA_URL)
                .success(function(response) {
                    /* Pass data on success */
                    deferred.resolve(response);
                })
                .error(function(response) {
                    /* Send friendly error message on failure */
                    deferred.reject("Error while fetching the data from API: " +
                                    response);
                });

            /* Return promise object */
            return {
                promise: deferred.promise
            };
        }]);
})();