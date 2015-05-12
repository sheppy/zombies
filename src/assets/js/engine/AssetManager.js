import PIXI from "pixi.js";

let singleton = Symbol();
let singletonEnforcer = Symbol();

/**
 * @class
 */
class AssetManager {
    /**
     * @constructor
     */
    constructor(enforcer) {
        if (enforcer !== singletonEnforcer) {
            throw "Cannot construct singleton";
        }

        /**
         * @name AssetManager#_assetQueue
         * @type {Array}
         */
        this._assetQueue = [];
    }

    /**
     * @static
     * @returns {AssetManager}
     */
    static get instance() {
        if (!this[singleton]) {
            this[singleton] = new AssetManager(singletonEnforcer);
        }
        return this[singleton];
    }

    /**
     * @param {String} image
     */
    addImage(image) {
        this._assetQueue.push(image);
    }

    /**
     * @param {function=} onComplete
     * @param {function=} onProgress
     */
    load(onComplete, onProgress) {
        //var loader = new PIXI.JsonLoader(url);
        // Load images
        let loader = new PIXI.AssetLoader(this._assetQueue, true);

        if (onComplete) {
            loader.addEventListener("onComplete", onComplete);
        }

        if (onProgress) {
            loader.addEventListener("onProgress", onProgress);
        }

        loader.load();

        // Clear current queue
        this._assetQueue = [];
    }
}

export default AssetManager;
