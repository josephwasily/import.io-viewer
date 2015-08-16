module.exports = function(grunt) {

    /* Project configuration */
    grunt.initConfig({

        /* Constants */
        STYLES_SRC:  "app/styles/src/",
        STYLES_DEST: "app/styles/",
        SCRIPTS_DIR: "app/scripts/",
        TESTS_DIR:   "tests/",

        /* Compile SASS stylesheets */
        sass: {
            dist: {
                options: {
                    style: "expanded"
                },
                expand: true,
                cwd:    "<%= STYLES_SRC %>",
                src:    [ "**/*.scss" ],
                dest:   "<%= STYLES_DEST %>",
                ext:    ".css"
            }
        },

        /* Copy all stylesheets in plain CSS (non-SASS) */
        copy: {
            main: {
                expand: true,
                cwd:    "<%= STYLES_SRC %>",
                src:    [ "**/*.css" ],
                dest:   "<%= STYLES_DEST %>"
            }
        },

        /* Validate JavaScript with JSHint */
        jshint: {
            /* Default stricter rules */
            options: {
                bitwise: true,
                browser: true,
                curly:   true,
                devel:   true,
                eqeqeq:  true,
                latedef: true,
                noarg:   true,
                strict:  true,
                undef:   true,
                unused:  true,
                globals: {
                    angular: false
                }
            },
            /* App scripts are checked using default strict rules */
            appScripts: {
                src: [ "<%= SCRIPTS_DIR %>**/*.js" ]
            },
            /* Test files need to have some more global values defined */
            test: {
                options: {
                    globals: {
                        describe:   false,
                        beforeEach: false,
                        it:         false,
                        expect:     false,
                        inject:     false,
                        module:     false
                    }
                },
                src: [ "<%= TESTS_DIR %>**/*.js" ]
            },
            /* Gruntfile needs to be checked using more lenient rules */
            gruntfile: {
                options: {
                    strict: false,
                    globals: {
                        module: false
                    }
                },
                src: ["Gruntfile.js"]
            }
        },

        /* Watch over stylesheets and scripts */
        watch: {
            scss: {
                files: ["<%= STYLES_SRC %>**/*.scss"],
                tasks: ["sass"]
            },
            css: {
                files: ["<%= CSS_SRC %>**/*.css"],
                tasks: ["copy"]
            },
            js: {
                files: [
                    "<%= SCRIPTS_DIR %>**/*.js",
                    "<%= TESTS_DIR %>**/*.js"
                ],
                tasks: ["jshint"]
            }
        }

    });


    /* Load plugins */
    grunt.loadNpmTasks("grunt-contrib-sass");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-watch");

    /* Register default tasks */
    grunt.registerTask("default", ["sass", "copy", "jshint"]);

};