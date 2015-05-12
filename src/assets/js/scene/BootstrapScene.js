import PIXI from "pixi.js";

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
        SceneManager.instance.stage.setBackgroundColor("#000");

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
        AssetManager.instance.addImage("null.png");
        AssetManager.instance.addImage("tiles.json");
        AssetManager.instance.load(this.onAssetsLoaded.bind(this), this._onAssetLoad);
    }

    _onAssetLoad(e) {
        let itemsRemaining = e.content.content.loadCount;
        let totalItems = e.content.content.assetURLs.length;
        let percent = (1 - (itemsRemaining / totalItems)) * 100;

        console.log("Loading assets:", percent, itemsRemaining, totalItems);
    }

    onAssetsLoaded() {
        SceneManager.instance.createScene("prototype-map", PrototypeMapScene);
        SceneManager.instance.goToScene("prototype-map");
    }
}

export default BootstrapScene;
