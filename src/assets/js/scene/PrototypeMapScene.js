import Scene from "../engine/Scene";
import TileMap from "../engine/TileMap";

/**
 * @class
 * @extends Scene
 */
class PrototypeMapScene extends Scene {
    initMap() {
        this.map = new TileMap();
        this.addChild(this.map);
    }

    renderMap() {
        this.map.renderTilesToSprite();
    }

    _onActivate() {
        super._onActivate();

        this.initMap();
        this.map.generate();
        this.renderMap();
    }
}

export default PrototypeMapScene;
