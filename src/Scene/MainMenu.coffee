Scene = require "../../vendor/iki-engine/src/Scene.coffee"
GraphicsManager = require "../../vendor/iki-engine/src/Manager/GraphicsManager.coffee"
SceneManager = require "../../vendor/iki-engine/src/Manager/SceneManager.coffee"


class MainMenuScene extends Scene
    init: ->
        @renderer = GraphicsManager.renderer


    activate: ->
        SceneManager.activate "game"


    deactivate: ->


module.exports = MainMenuScene