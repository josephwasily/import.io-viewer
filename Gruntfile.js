module.exports = function(grunt) {

    /* Project configuration */
    grunt.initConfig({

        /* Constants */
        STYLES_SRC:  "app/styles/src/",
        STYLES_DEST: "app/styles/",
        SCRIPTS_DIR: "app/scripts/",

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
            /* Most files are checked using default strict rules */
            strict: {
                src: ["<%= SCRIPTS_DIR %>**/*.js"]
            },
            /* Some files like Gruntfile need to be checked using much more
               lenient rules */
            lenient: {
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
                files: ["<%= STYLES_SRC %>"],
                tasks: ["sass"]
            },
            css: {
                files: ["<%= CSS_SRC %>**/*.css"],
                tasks: ["copy"]
            },
            js: {
                files: ["<%= SCRIPTS_DIR %>**/*.js"],
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