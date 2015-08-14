(function() {
    "use strict";


    describe("mainController", function() {
        /* dataGrabber service response data is mocked with this */
        var DATA = { test: "test" };

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
               expect(scope.data).toEqual(DATA);
        }));
    });
})();