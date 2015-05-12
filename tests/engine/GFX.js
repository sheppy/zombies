/* global global, describe, it, beforeEach, afterEach */
import chai from "chai";
import sinon from "sinon";
import sinonChai from "sinon-chai";
import proxyquire from "proxyquire";

proxyquire.noCallThru();
chai.should();
chai.use(sinonChai);

const PixiStub = {
    WebGLRenderer: class {
        constructor() {
            this.view = "view";
        }
    }
};

const GFX = proxyquire("../../src/assets/js/engine/GFX", {
    "pixi.js": PixiStub
});

describe("GFX", () => {
    beforeEach(() => {
        sinon.spy(PixiStub, "WebGLRenderer");
    });

    afterEach(() => {
        GFX.instance.renderer = null;
        GFX.instance.width = null;
        GFX.instance.height = null;

        PixiStub.WebGLRenderer.restore();
    });

    describe("#instance", () => {
        it("returns an instance", () => {
            GFX.instance.should.be.an.object;
        });

        it("can not be instantiated", () => {
            (() => new GFX()).should.throw();
        });
    });

    describe("#init", () => {
        let elementStub;

        beforeEach(() => {
            elementStub = { appendChild: sinon.spy() };
        });

        describe("always", () => {
            beforeEach(() => {
                GFX.instance.renderer = true;
                GFX.instance.init(elementStub, 10, 12);
            });

            it("sets the width", () => {
                GFX.instance.width.should.equal(10);
            });

            it("sets the height", () => {
                GFX.instance.height.should.equal(12);
            });
        });

        describe("when the renderer already exists", () => {
            it("returns false", () => {
                GFX.instance.renderer = true;
                GFX.instance.init(elementStub, 6, 5).should.equal(false);
            });
        });

        describe("when the renderer does not exist", () => {
            beforeEach(() => {
                GFX.instance.init(elementStub, 1, 2);
            });

            it("creates the renderer", () => {
                PixiStub.WebGLRenderer.should.have.been.calledWithNew;
                PixiStub.WebGLRenderer.should.have.been.calledWith(1, 2);
            });

            it("appends the renderer to the element", () => {
                elementStub.appendChild.should.have.been.calledWith("view");
            });
        });
    });

    describe("#render", () => {
        it("renders the stage", () => {
            let stage = {};

            GFX.instance.renderer = {
                render: sinon.spy()
            };

            GFX.instance.render(stage);

            GFX.instance.renderer.render.should.have.been.calledWith(stage);
        });
    });
});
