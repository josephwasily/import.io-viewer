(function() {
    "use strict";


    /* Register app module */
    var module = angular.module("importIOViewerApp", [
        "ngRoute"
    ]);

    
    module.config(["$routeProvider", function($routeProvider) {
        $routeProvider
            .when("/", {
                controller: "mainController",
                templateUrl: "templates/data-table.html",
                resolve: {
                    /* Data must be downloaded before the controller is run */
                    data: ["dataGrabberFactory", function(dataGrabber) {
                        return dataGrabber.promise;
                    }]
                }
            })
            .otherwise({
                redirectTo: "/"
            });
    }]);
})();