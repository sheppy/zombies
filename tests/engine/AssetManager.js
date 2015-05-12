/* global global, describe, it, beforeEach, afterEach */
import chai from "chai";
import sinon from "sinon";
import sinonChai from "sinon-chai";
import proxyquire from "proxyquire";

proxyquire.noCallThru();
chai.should();
chai.use(sinonChai);


const PixiStub = {
    AssetLoader: class {
        load() {}
        addEventListener() {}
    }
};

const AssetManager = proxyquire("../../src/assets/js/engine/AssetManager", {
    "pixi.js": PixiStub
});


describe("AssetManager", () => {
    beforeEach(() => {
        sinon.spy(PixiStub, "AssetLoader");
        sinon.spy(PixiStub.AssetLoader.prototype, "load");
        sinon.spy(PixiStub.AssetLoader.prototype, "addEventListener");
    });

    afterEach(() => {
        // Clear the asset queue
        AssetManager.instance._assetQueue = [];

        PixiStub.AssetLoader.restore();
        PixiStub.AssetLoader.prototype.load.restore();
        PixiStub.AssetLoader.prototype.addEventListener.restore();
    });

    describe("#instance", () => {
        it("returns an instance", () => {
            AssetManager.instance.should.be.an.object;
        });

        it("can not be instantiated", () => {
            (() => new AssetManager()).should.throw();
        });
    });

    describe("#addImage", () => {
        it("adds an image to the asset queue", () => {
            AssetManager.instance.addImage("test1");
            AssetManager.instance._assetQueue.length.should.equal(1);
            AssetManager.instance._assetQueue[0].should.equal("test1");

            AssetManager.instance.addImage("test2");
            AssetManager.instance._assetQueue.length.should.equal(2);
            AssetManager.instance._assetQueue[1].should.equal("test2");
        });
    });

    describe("#load", () => {
        it("loads the assets in the asset queue", () => {
            AssetManager.instance.load();
            PixiStub.AssetLoader.should.have.been.calledWithNew;
            PixiStub.AssetLoader.should.have.been.calledWith(AssetManager.instance._assetQueue);
            PixiStub.AssetLoader.prototype.load.should.have.been.called;
        });

        it("adds an onComplete handler", () => {
            let onComplete = sinon.spy();
            AssetManager.instance.load(onComplete);
            PixiStub.AssetLoader.prototype.addEventListener.should.have.been.calledWith("onComplete", onComplete);
        });

        it("adds an onProgress handler", () => {
            let onProgress = sinon.spy();
            AssetManager.instance.load(null, onProgress);
            PixiStub.AssetLoader.prototype.addEventListener.should.have.been.calledWith("onProgress", onProgress);
        });

        it("adds both onComplete and onProgress handlers", () => {
            let onComplete = sinon.spy();
            let onProgress = sinon.spy();
            AssetManager.instance.load(onComplete, onProgress);
            PixiStub.AssetLoader.prototype.addEventListener.should.have.been.calledWith("onComplete", onComplete);
            PixiStub.AssetLoader.prototype.addEventListener.should.have.been.calledWith("onProgress", onProgress);
        });

        it("clears the asset queue", () => {
            AssetManager.instance._assetQueue = [1,2,3];
            AssetManager.instance.load();
            AssetManager.instance._assetQueue.length.should.equal(0);
        });
    });
});
