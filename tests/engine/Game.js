/* global global, describe, it, beforeEach, afterEach */
import chai from "chai";
import sinon from "sinon";
import sinonChai from "sinon-chai";
import proxyquire from "proxyquire";

proxyquire.noCallThru();
chai.should();
chai.use(sinonChai);


const GFXStub = {
    instance: {
        render: sinon.spy()
    }
};

const SceneStub = {
    update: sinon.spy()
};

const SceneManagerStub = {
    instance: {
        currentScene: false,
        stage: false
    }
};

const FpsMeterStub = class {
    tick() {}
};

const Game = proxyquire("../../src/assets/js/engine/Game", {
    "./GFX": GFXStub,
    "./SceneManager": SceneManagerStub,
    "./FpsMeter": FpsMeterStub
});


describe("Game", () => {
    let clock;
    let game;

    beforeEach(() => {
        clock = sinon.useFakeTimers();
        sinon.spy(FpsMeterStub.prototype, "tick");

        game = new Game();
    });

    afterEach(() => {
        GFXStub.instance.render.reset();
        SceneStub.update.reset();
        SceneManagerStub.instance.currentScene = false;
        SceneManagerStub.instance.stage = false;
        FpsMeterStub.prototype.tick.restore();
        clock.restore();
    });

    describe("#constructor", () => {
        it("initialises the frame skipping", () => {
            game.skipTicks.should.be.a.number;
        });

        it("initialises the timers", () => {
            game.nextUpdateTick.should.be.a.number;
            game.nextUpdateTick.should.equal(0);
            game.lastTime.should.be.a.number;
            game.lastTime.should.equal(0);
        });

        it("creates the meters", () => {
            game.fps.should.be.an.object;
            game.ups.should.be.an.object;
        });
    });

    describe("#_update", () => {
        it("updates the update meter", () => {
            game._update(2);
            FpsMeterStub.prototype.tick.should.have.been.called;
        });

        it("does not update the scene if there isn't one", () => {
            SceneManagerStub.instance.currentScene = false;
            game._update(3);
            SceneStub.update.should.not.have.been.called;
        });

        it("updates the scene if there is one", () => {
            SceneManagerStub.instance.currentScene = SceneStub;
            game._update(4);
            SceneStub.update.should.have.been.calledWith(4);
        });
    });

    describe("#_render", () => {
        it("updates the fps meter", () => {
            game._render(5);
            FpsMeterStub.prototype.tick.should.have.been.called;
        });

        it("does not update the scene if there isn't one", () => {
            SceneManagerStub.instance.stage = false;
            game._render(6);
            GFXStub.instance.render.should.not.have.been.called;
        });

        it("updates the scene if there is one", () => {
            let stage = {};
            SceneManagerStub.instance.stage = stage;
            game._render(7);
            GFXStub.instance.render.should.have.been.calledWith(stage);
        });
    });

    describe("#run", () => {});
});
