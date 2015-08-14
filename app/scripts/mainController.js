(function() {
    "use strict";


    var module = angular.module("importIOViewerApp");


    /* Main controller for application. Attach data from API to scope. */
    module.controller("mainController", ["$scope", "data",
        function($scope, data) {
            $scope.data = data;
        }]);
})();