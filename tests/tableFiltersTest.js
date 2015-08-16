(function() {
    "use strict";

    
    /* Load the module */
    beforeEach(module("importIOViewerApp"));


    describe("tableHeaderName filter", function() {

        /* Filter function */
        var tableHeaderName;


        /* Inject needed dependencies */
        beforeEach(inject(function(_$filter_) {
            tableHeaderName = _$filter_("tableHeaderName");
        }));


        it("should accept empty strings", function() {
            expect(tableHeaderName("")).toEqual("");
        });

        it("should convert underscores to spaces", function() {
            expect(tableHeaderName("Talking_Heads")).toEqual("Talking Heads");
            expect(tableHeaderName("Wire's_Pink_Flag"))
                .toEqual("Wire's Pink Flag");
            expect(tableHeaderName("_Find myself a_city to_live in___"))
                .toEqual(" Find myself a city to live in   ");
        });

        it("should accept strings of underscores only", function() {
            expect(tableHeaderName("___")).toEqual("   ");
        });

        it("should not change strings without any underscores", function() {
            expect(tableHeaderName("R.E.M.")).toEqual("R.E.M.");
        });
    });


    describe("propertyType filter", function() {
        
        /* Filter function */
        var propertyType;

        
        beforeEach(inject(function(_$filter_) {
            propertyType = _$filter_("propertyType");
        }));

        
        it("should return 'text' for 'STRING', 'INT'. 'DOUBLE', 'LANG', 'COUNTRY', 'BOOLEAN', 'HTML' and 'MAP'", function() {
            var textExpectedType = "text";

            expect(propertyType("STRING")).toEqual(textExpectedType);
            expect(propertyType("INT")).toEqual(textExpectedType);
            expect(propertyType("DOUBLE")).toEqual(textExpectedType);
            expect(propertyType("LANG")).toEqual(textExpectedType);
            expect(propertyType("COUNTRY")).toEqual(textExpectedType);
            expect(propertyType("BOOLEAN")).toEqual(textExpectedType);
            expect(propertyType("HTML")).toEqual(textExpectedType);
            expect(propertyType("MAP")).toEqual(textExpectedType);
        });

        it("should return 'currency' for 'CURRENCY", function() {
            expect(propertyType("CURRENCY")).toEqual("currency");
        });

        it("should return 'url' for 'URL", function() {
            expect(propertyType("URL")).toEqual("url");
        });

        it("should return 'image' for 'IMAGE", function() {
            expect(propertyType("IMAGE")).toEqual("image");
        });

        it("should throw an error for unsupported values", function() {

            /* Wrapper function as expect() calls testing throwing an error
               need to get a function to call instead of function result */
            function propertyTypeFunc(type) {
                return function() {
                    propertyType(type);
                };
            }

            expect(propertyTypeFunc("Silent Flower Observers")).toThrowError();
            expect(propertyTypeFunc("")).toThrowError();
            expect(propertyTypeFunc(" ")).toThrowError();
        });
    });

})();