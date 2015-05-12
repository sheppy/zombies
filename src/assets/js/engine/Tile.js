import PIXI from "pixi.js";
import Color from "./Color";

class Tile extends PIXI.Sprite {
    constructor(frameId) {
        // TODO: Get asset by name from AssetManager
        // AssetManager.getTexture(...);
        var texture = PIXI.TextureCache[frameId];
        super(texture);

        // Tile data such as walkable etc
        this.data = {};
    }

    setLightData(light) {
        this.tint = Color.applyIntensity(light.color, light.intensity);
    }
}

export default Tile;
