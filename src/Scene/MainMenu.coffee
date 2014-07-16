Scene = require "../../../vendor/iki-engine/src/Scene.coffee"


class MainMenuScene extends Scene
    init: ->
        @renderer = GraphicsManager.renderer


    activate: ->
        SceneManager.activate "game"


    deactivate: ->


module.exports = MainMenuScene