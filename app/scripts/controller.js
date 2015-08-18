(function() {
    "use strict";


    var module = angular.module("importIOViewerApp");


    /* How many data entries are displayed on one page. String type used instead
       of Integer to match the select option values so that initially one of
       them is already selected. */
    var DEFAULT_ENTRIES_PER_PAGE = "10";


    /* Main controller for application. Attach data from API to scope. */
    module.controller("mainController", [ "$scope", "data",
        function($scope, data) {
            $scope.headers        = data.outputProperties;
            $scope.entries        = data.results;
            $scope.currentPage    = 1;
            $scope.entriesTotal   = data.results.length;
            $scope.entriesPerPage = DEFAULT_ENTRIES_PER_PAGE;
        }]);
})();