(function() {
    "use strict";


    describe("dataGrabber", function() {
        /* URL from which the data is fetched */
        var DATA_URL = "https://api.import.io/store/data/2a6e4562-1ec5-40d8-876b-5a9d6ad0bd6e/_query?input/webpage/url=http%3A%2F%2Fwww.ikea.com%2Fus%2Fen%2Fsearch%2F%3Fquery%3Dchair&_user=b81b82d5-5dc6-4c91-9791-3c4279727744&_apikey=b81b82d55dc64c9197913c42797277446e16bb52081e38838e61bfced0460ef53fec7dc8c4818e762e8004039e2739716b0ca23bd7bff1efd3c0dabd7b2fab335aa2f8420df378bd247d8386e2bd3ad8";
        /* Response for data GET request */
        var RESPONSE = {
            offset: 0,
            results: [{ prodimg_image: "http://www.ikea.com/PIAimages/0277428_PE416417_S2.JPG" }],
            outputProperties: [{ name: "prodimg_image", type: "IMAGE" }]
        };

        var $httpBackend;
        var dataGrabberFactory;
    
        /* Load the module */
        beforeEach(module("importIOViewerApp"));

        /* Inject needed dependencies */
        beforeEach(inject(function(_$httpBackend_, _dataGrabberFactory_){
            $httpBackend       = _$httpBackend_;
            dataGrabberFactory = _dataGrabberFactory_;
        }));


        it("should grab data and return it", function() {
            var actualResponse;

            /* Mock $http GET response */
            $httpBackend.expectGET(DATA_URL).respond(RESPONSE);

            dataGrabberFactory.promise.then(function(response) {
                actualResponse = response;
            });

            /* Flush backend to execute request */
            $httpBackend.flush();

            expect(actualResponse).toEqual(RESPONSE);
        });

    });
})();