/* global global, describe, it, beforeEach, afterEach */
import chai from "chai";
import sinon from "sinon";
import sinonChai from "sinon-chai";
import proxyquire from "proxyquire";

proxyquire.noCallThru();
chai.should();
chai.use(sinonChai);


const PixiStub = {
    Sprite: class {},
    TextureCache: ["texture-1", "texture-2", "texture-3"]
};

const ColorStub = {
    applyIntensity: sinon.stub()
};

const Tile = proxyquire("../../src/assets/js/engine/Tile", {
    "pixi.js": PixiStub,
    "./Color": ColorStub
});


describe("Tile", () => {
    beforeEach(() => {
        sinon.spy(PixiStub.Sprite.prototype, "constructor");
    });

    afterEach(() => {
        PixiStub.Sprite.prototype.constructor.restore();
    });

    describe("#constructor", () => {
        it("calls the parent constructor with the texture", () => {
            new Tile(1);
            PixiStub.Sprite.prototype.constructor.should.have.been.calledWith(PixiStub.TextureCache[1]);
        });

        it("sets the tile data", () => {
            let tile = new Tile();
            tile.data.should.be.an.object;
            tile.data.should.be.empty;
        });
    });

    describe("#setLightData", () => {
        beforeEach(() => {
            ColorStub.applyIntensity.returns(0x7F7F7F);
        });

        it("sets the tile tint", () => {
            let tile = new Tile();
            tile.setLightData({color: 0xFFFFFF, intensity: 0.5});
            tile.tint.should.equal(0x7F7F7F);
        });
    });
});
