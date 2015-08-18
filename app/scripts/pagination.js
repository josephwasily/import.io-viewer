(function() {
    "use strict";


    var module = angular.module("importIOViewerApp");


    /* Creates pagination controls - changing the page and specifying how many
       entries should be displayed per page */
    module.directive("paginationControls", function() {
        function controller($scope) {
            /* Reset page to 1, when changing the entriesPerPage value */
            $scope.$watch(
                function(scope) {
                    return scope.entriesPerPage;
                },
                function() {
                    $scope.currentPage = 1;
                });
        }

        return {
            restrict: "E",
            scope: {
                currentPage:    "=",
                entriesTotal:   "=",
                entriesPerPage: "="
            },
            controller: controller,
            templateUrl: "templates/pagination-controls.html"
        };
    });


    /* Returns if the given index (indexed from 0) of the item is on the
       currently displayed page. Other arguments are page number (1..totalPages)
       and how many items are displayed on one page. */
    module.filter("isOnDisplayedPage", function() {
        return function(index, currentPage, entriesPerPage) {
            /* Calculate indexes of first and last items on the page */
            var firstItem = entriesPerPage * (currentPage - 1);
            var lastItem  = (entriesPerPage * currentPage) - 1;

            return (firstItem <= index) && (index <= lastItem);
        };
    });


    /* Given empty array and number of pages, returns that array populated with
       consecutive numbers from 1 to "number of pages". That range is to be used
       with ng-repeat, to iterate it "number of pages" times. */
    module.filter("pageRange", function() {
        return function(array, entriesTotal, entriesPerPage) {
            var pagesTotal = Math.ceil(parseInt(entriesTotal) /
                                       parseInt(entriesPerPage));

            for (var pageNo = 1; pageNo <= pagesTotal; pageNo++) {
                array.push(pageNo);
            }

            return array;
        };
    });

})();