(function() {
    "use strict";


    /* Load the module */
    beforeEach(module("importIOViewerApp"));


    describe("isOnDisplayedPage filter", function() {

        /* Filter function */
        var isOnDisplayedPage;
        

        /* Inject needed dependencies */
        beforeEach(inject(function(_$filter_) {
            isOnDisplayedPage = _$filter_("isOnDisplayedPage");
        }));


        it("should return true for indexes in the middle of current page",
           function() {
               expect(isOnDisplayedPage(4, 1, 10)).toBe(true);
               expect(isOnDisplayedPage(18, 19, 1)).toBe(true);
               expect(isOnDisplayedPage(5578, 56, 100)).toBe(true);
               expect(isOnDisplayedPage(160, 13, 13)).toBe(true);
           });

        it("should return true for first index on current page", function() {
            expect(isOnDisplayedPage(0, 1, 10)).toBe(true);
            expect(isOnDisplayedPage(66, 3, 33)).toBe(true);
            expect(isOnDisplayedPage(7, 8, 1)).toBe(true);
            expect(isOnDisplayedPage(108, 10, 12)).toBe(true);
        });

        it("should return true for last index on current page", function() {
            expect(isOnDisplayedPage(9, 1, 10)).toBe(true);
            expect(isOnDisplayedPage(199, 8, 25)).toBe(true);
            expect(isOnDisplayedPage(22, 23, 1)).toBe(true);
            expect(isOnDisplayedPage(699, 7, 100)).toBe(true);
        });

        it("should return false for indexes in the middle of other pages",
           function() {
               expect(isOnDisplayedPage(29, 1, 10)).toBe(false);
               expect(isOnDisplayedPage(8, 7, 34)).toBe(false);
               expect(isOnDisplayedPage(2839, 9, 1)).toBe(false);
               expect(isOnDisplayedPage(34, 4, 19)).toBe(false);
           });

        it("should return false for first index on next page", function() {
            expect(isOnDisplayedPage(10, 1, 10)).toBe(false);
            expect(isOnDisplayedPage(350, 7, 50)).toBe(false);
            expect(isOnDisplayedPage(9, 9, 1)).toBe(false);
            expect(isOnDisplayedPage(76, 4, 19)).toBe(false);
        });

        it("should return false for last index on previous page", function() {
            expect(isOnDisplayedPage(9, 2, 10)).toBe(false);
            expect(isOnDisplayedPage(149, 11, 15)).toBe(false);
            expect(isOnDisplayedPage(23, 25, 1)).toBe(false);
            expect(isOnDisplayedPage(56, 4, 19)).toBe(false);
        });

    });


    describe("pageRange filter", function() {

        /* Filter function */
        var pageRange;

        
        /* Inject needed dependencies */
        beforeEach(inject(function(_$filter_) {
            pageRange = _$filter_("pageRange");
        }));


        it("should produce a valid range when every page is full", function() {
            expect(pageRange([], 100, 10))
                .toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

            expect(pageRange([], 7, 1)).toEqual([1, 2, 3, 4, 5, 6, 7]);
            
        });

        it("should produce a valid range when last page is not full",
           function() {
               expect(pageRange([], 700, 82))
                   .toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
           });


        it("should produce a valid range when last page has only 1 entry",
           function() {
               expect(pageRange([], 91, 16)).toEqual([1, 2, 3, 4, 5, 6]);
           });

    });


})();