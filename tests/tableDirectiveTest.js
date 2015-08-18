(function() {
    "use strict";

    
    /* Load the module */
    beforeEach(module("importIOViewerApp"));


    describe("tableProperty directive", function() {

        /* Populate scope with given values */
        function populateScope(scope, name, type, entry) {
            scope.name  = name;
            scope.type  = type;
            scope.entry = entry;
        }


        var DIRECTIVE_HTML = "<td table-property entry='entry' name='name' type='type'></td>";
        
        var $compile;
        var $scope;


        /* Load the templates */
        beforeEach(module("templates"));

        /* Inject needed dependencies */
        beforeEach(inject(function(_$compile_, _$rootScope_) {
            $compile = _$compile_;
            $scope   = _$rootScope_.$new();
        }));


        it("should properly compile with 'text' type property", function() {
            populateScope($scope, "album", "text",
                          { artist: "R.E.M.", album: "Murmur" });

            var template = $compile(DIRECTIVE_HTML)($scope);
            $scope.$digest();

            expect(template.html()).toContain("Murmur");
        });


        it("should properly compile with 'currency' type property", function() {
            populateScope($scope, "price", "currency",
                          { "price": "42", "price/_currency": "PLN" });

            var template = $compile(DIRECTIVE_HTML)($scope);
            $scope.$digest();

            expect(template.html()).toContain("42 PLN");
        });


        it("should properly compile with 'url' type property", function() {
            populateScope($scope, "homepage", "url",
                          { "homepage": "http://www.ruskikeczap.tumblr.com",
                            "homepage/_title": "Ruski keczap",
                            "homepage/_text": "Divinely smelling blonde's boredom filler"});

            var template     = $compile(DIRECTIVE_HTML)($scope);
            $scope.$digest();
            var templateHTML = template.html();

            expect(templateHTML).toContain("<a");
            expect(templateHTML).toContain("</a>");
            expect(templateHTML).toEqual(jasmine.stringMatching(/href=[\'\"]http:\/\/www.ruskikeczap.tumblr.com[\'\"]/));
            expect(templateHTML).toEqual(jasmine.stringMatching(/title=[\'\"]Ruski keczap[\'\"]/));
            expect(templateHTML).toContain("Divinely smelling blonde's boredom filler");
        });


        it("should properly compile with 'image' type property", function() {
            populateScope($scope, "oldPhoto", "image",
                          { "oldPhoto": "http://www.weirdphotos.com/horseman.jpg",
                            "oldPhoto/_alt": "Man with a horse head" });

            var template     = $compile(DIRECTIVE_HTML)($scope);
            $scope.$digest();
            var templateHTML = template.html();

            expect(templateHTML).toContain("<img");
            expect(templateHTML).toEqual(jasmine.stringMatching(/src=[\'\"]http:\/\/www.weirdphotos.com\/horseman.jpg[\'\"]/));
            expect(templateHTML).toEqual(jasmine.stringMatching(/alt=[\'\"]Man with a horse head[\'\"]/));
        });

    });

})();