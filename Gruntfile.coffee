module.exports = (grunt) ->
    require("load-grunt-tasks")(grunt)

    FILES =
        DOCROOT: "docroot"
        GAME:
            SRC: "src/zombies.coffee"
            ALL: "src/**/*.coffee"


    grunt.initConfig
        pkg: grunt.file.readJSON "package.json"


        coffeelint:
            options:
                configFile: "coffeelint.json"
            gruntfile:
                files: [{src: "Gruntfile.coffee"}]
            game:
                files: [
                    {src: FILES.GAME.ALL}
                ]


        browserify:
            options:
                debug: true
                extension: [".coffee", ".js"]
                transform: ["coffeeify"]
            game:
                files:
                    "docroot/assets/js/zombies.js": [ FILES.GAME.SRC ]


        watch:
            game:
                files: [FILES.GAME.ALL]
                tasks: ["coffeelint:game", "browserify:game"]


    grunt.registerTask "test", ["coffeelint"]
    grunt.registerTask "default", ["test", "browserify"]