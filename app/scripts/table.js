(function() {
    "use strict";


    var module = angular.module("importIOViewerApp");


    /* Converts outputProperties names in data returned from import.io API to
       human readable strings */
    module.filter("tableHeaderName", function() {
        return function(dataName) {
            /* Replace all underscores with spaces */
            return dataName.replace(/_/g, " ");
        };
    });


    /* Types of properties in data from import.io API are mapped onto data types
       in application representation. This function given a type in data
       representation returns a corresponding type in application
       representation. */
    module.filter("propertyType", function() {
        return function(dataType) {
            switch(dataType) {
                case "STRING":
                case "INT":
                case "DOUBLE":
                case "LANG":
                case "COUNTRY":
                case "BOOLEAN":
                case "HTML":
                case "MAP":
                    return "text";
                case "CURRENCY":
                    return "currency";
                case "URL":
                    return "url";
                case "IMAGE":
                    return "image";
                default:
                    throw new Error("Unsupported data type: " + dataType);
            }
        };
    });


    /* Returns HTML representation of a data property value */
    module.directive("tableProperty", function() {

        function link(scope, element) {
            /* Add CSS class that describes the type of property */
            element.addClass(scope.type);
        }

        return {
            restrict: "A",
            scope: {
                entry: "=",
                name:  "=",
                type:  "="
            },
            templateUrl: "templates/table-property.html",
            link: link
        };
    });

})();