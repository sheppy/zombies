Scene = require "../../vendor/iki-engine/src/Scene.coffee"


class GameScene extends Scene
    init: ->
        console.log "Game init"

    activate: ->
        console.log "Game running"

    deactivate: ->
    

module.exports = GameScene