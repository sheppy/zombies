import PIXI from "pixi.js";

import GFX from "../engine/GFX";
import Scene from "../engine/Scene";
import AssetManager from "../engine/AssetManager";
import SceneManager from "../engine/SceneManager";


import PrototypeMapScene from "./PrototypeMapScene";

/**
 * @class
 * @extends Scene
 */
class BootstrapScene extends Scene {
    _init() {
        GFX.instance.renderer.backgroundColor = 0x000000;

        // Add loading text...
        let text = new PIXI.Text("Loading", { font: "50px Arial", fill: "#fff" });
        this.addChild(text);
    }

    _onActivate() {
        console.clear();
        super._onActivate();

        this.loadAssets();
    }

    loadAssets() {
        AssetManager.instance.addImage("null", "null.png");
        AssetManager.instance.addImage("assets/tiles/tiles.json");
        AssetManager.instance.load(this.onAssetsLoaded.bind(this), this._onAssetLoad);
    }

    _onAssetLoad(loader) {
        let itemsRemaining = loader._numToLoad;
        let percent = loader.progress;
        //console.log("Loading assets:", percent, itemsRemaining);
    }

    onAssetsLoaded() {
        console.log("Assets have been loaded");
        SceneManager.instance.createScene("prototype-map", PrototypeMapScene);
        SceneManager.instance.goToScene("prototype-map");
    }
}

export default BootstrapScene;
