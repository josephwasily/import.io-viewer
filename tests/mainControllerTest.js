(function() {
    "use strict";


    describe("mainController", function() {
        /* dataGrabber service response data is mocked with this */
        var DATA = {
            outputProperties: [ { name: "one", type: "STRING" } ],
            results:          [ { one: "one value" } ]
        };

        var scope;
        var mainController;

        
        /* Load the module and configure the value from dataGrabber on which
           it depends */
        beforeEach(module("importIOViewerApp", function(_$provide_) {
            _$provide_.value("data", DATA);
        }));

        /* Create controller and it's scope */
        beforeEach(inject(function(_$controller_) {
            scope = {};
            mainController = _$controller_("mainController", { $scope: scope });
        }));


        it("should assign proper values to the scope",
           inject(function() {
               expect(scope.headers).toEqual(DATA.outputProperties);
               expect(scope.entries).toEqual(DATA.results);
        }));
    });
})();