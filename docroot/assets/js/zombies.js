(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var AssetManager, BootScene, GameScene, GraphicsManager, InputManager, MainMenuScene, PreLoadScene, Scene, SceneManager,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Scene = require("../../vendor/iki-engine/src/Scene.coffee");

SceneManager = require("../../vendor/iki-engine/src/Manager/SceneManager.coffee");

GraphicsManager = require("../../vendor/iki-engine/src/Manager/GraphicsManager.coffee");

InputManager = require("../../vendor/iki-engine/src/Manager/InputManager.coffee");

AssetManager = require("../../vendor/iki-engine/src/Manager/AssetManager.coffee");

PreLoadScene = require("./PreLoad.coffee");

MainMenuScene = require("./MainMenu.coffee");

GameScene = require("./Game.coffee");

BootScene = (function(_super) {
  __extends(BootScene, _super);

  function BootScene() {
    return BootScene.__super__.constructor.apply(this, arguments);
  }

  BootScene.prototype.init = function() {
    this.width = 1280;
    this.height = 720;
    GraphicsManager.renderer = GraphicsManager.createRenderer(this.width, this.height, document.body);
    this.sizeCanvas();
    window.addEventListener("resize", this.sizeCanvas.bind(this));
    InputManager.init(GraphicsManager.renderer.canvas);
    return this.initScenes();
  };

  BootScene.prototype.initScenes = function() {
    var gameScene, mainMenuScene, preLoadScene;
    preLoadScene = new PreLoadScene();
    SceneManager.add("preload", preLoadScene);
    preLoadScene.init();
    mainMenuScene = new MainMenuScene();
    SceneManager.add("main-menu", mainMenuScene);
    mainMenuScene.init();
    gameScene = new GameScene();
    SceneManager.add("game", gameScene);
    return gameScene.init();
  };

  BootScene.prototype.activate = function() {
    var loadAsset;
    console.log("Loading assets");
    loadAsset = AssetManager.load("assets/manifest/assets-boot.json");
    return loadAsset.then(function() {
      return SceneManager.activate("preload");
    });
  };

  BootScene.prototype.sizeCanvas = function() {
    var currentScreenRatio, gameHeight, gameWidth, optimalRatio, scaleToFitX, scaleToFitY;
    gameWidth = window.innerWidth;
    gameHeight = window.innerHeight;
    scaleToFitX = gameWidth / this.width;
    scaleToFitY = gameHeight / this.height;
    currentScreenRatio = gameWidth / gameHeight;
    optimalRatio = Math.min(scaleToFitX, scaleToFitY);
    if (currentScreenRatio >= 1.77 && currentScreenRatio <= 1.79) {
      GraphicsManager.renderer.canvas.style.width = gameWidth + "px";
      GraphicsManager.renderer.canvas.style.height = gameHeight + "px";
    } else {
      GraphicsManager.renderer.canvas.style.width = this.width * optimalRatio + "px";
      GraphicsManager.renderer.canvas.style.height = this.height * optimalRatio + "px";
    }
    InputManager.MOUSE_TRANSFORM_RECT = GraphicsManager.renderer.canvas.getBoundingClientRect();
    InputManager.MOUSE_TRANSFORM_WIDTH = GraphicsManager.renderer.canvas.width;
    InputManager.MOUSE_TRANSFORM_HEIGHT = GraphicsManager.renderer.canvas.height;
    InputManager.MOUSE_OFFSET_X = GraphicsManager.renderer.canvas.offsetLeft;
    return InputManager.MOUSE_OFFSET_Y = GraphicsManager.renderer.canvas.offsetTop;
  };

  return BootScene;

})(Scene);

module.exports = BootScene;


},{"../../vendor/iki-engine/src/Manager/AssetManager.coffee":7,"../../vendor/iki-engine/src/Manager/GraphicsManager.coffee":8,"../../vendor/iki-engine/src/Manager/InputManager.coffee":9,"../../vendor/iki-engine/src/Manager/SceneManager.coffee":10,"../../vendor/iki-engine/src/Scene.coffee":11,"./Game.coffee":2,"./MainMenu.coffee":3,"./PreLoad.coffee":4}],2:[function(require,module,exports){
var GameScene, Scene,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Scene = require("../../vendor/iki-engine/src/Scene.coffee");

GameScene = (function(_super) {
  __extends(GameScene, _super);

  function GameScene() {
    return GameScene.__super__.constructor.apply(this, arguments);
  }

  GameScene.prototype.init = function() {
    return console.log("Game init");
  };

  GameScene.prototype.activate = function() {
    return console.log("Game running");
  };

  GameScene.prototype.deactivate = function() {};

  return GameScene;

})(Scene);

module.exports = GameScene;


},{"../../vendor/iki-engine/src/Scene.coffee":11}],3:[function(require,module,exports){
var GraphicsManager, MainMenuScene, Scene, SceneManager,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Scene = require("../../vendor/iki-engine/src/Scene.coffee");

GraphicsManager = require("../../vendor/iki-engine/src/Manager/GraphicsManager.coffee");

SceneManager = require("../../vendor/iki-engine/src/Manager/SceneManager.coffee");

MainMenuScene = (function(_super) {
  __extends(MainMenuScene, _super);

  function MainMenuScene() {
    return MainMenuScene.__super__.constructor.apply(this, arguments);
  }

  MainMenuScene.prototype.init = function() {
    return this.renderer = GraphicsManager.renderer;
  };

  MainMenuScene.prototype.activate = function() {
    return SceneManager.activate("game");
  };

  MainMenuScene.prototype.deactivate = function() {};

  return MainMenuScene;

})(Scene);

module.exports = MainMenuScene;


},{"../../vendor/iki-engine/src/Manager/GraphicsManager.coffee":8,"../../vendor/iki-engine/src/Manager/SceneManager.coffee":10,"../../vendor/iki-engine/src/Scene.coffee":11}],4:[function(require,module,exports){
var AssetManager, GraphicsManager, PreLoadScene, Scene, SceneManager,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Scene = require("../../vendor/iki-engine/src/Scene.coffee");

SceneManager = require("../../vendor/iki-engine/src/Manager/SceneManager.coffee");

GraphicsManager = require("../../vendor/iki-engine/src/Manager/GraphicsManager.coffee");

AssetManager = require("../../vendor/iki-engine/src/Manager/AssetManager.coffee");

PreLoadScene = (function(_super) {
  __extends(PreLoadScene, _super);

  function PreLoadScene() {
    return PreLoadScene.__super__.constructor.apply(this, arguments);
  }

  PreLoadScene.prototype.init = function() {
    return this.renderer = GraphicsManager.renderer;
  };

  PreLoadScene.prototype.activate = function() {
    var loadAsset;
    console.log("Preload running");
    this.bar = {
      background: AssetManager.get("img/ui/loading-bar-bg.png"),
      fill: AssetManager.get("img/ui/loading-bar-fill.png"),
      x: (GraphicsManager.renderer.width / 2) - 94,
      y: (GraphicsManager.renderer.height / 2) - 22,
      width: 188,
      height: 22
    };
    this.bar.middle = this.bar.x + (this.bar.width / 2);
    this.renderer.ctx.fillStyle = "#000";
    this.renderer.ctx.fillRect(0, 0, this.renderer.width, this.renderer.height);
    this.renderLoadingBar(0);
    this.renderLoadingText("Loading...");
    AssetManager.onBeforeLoad = this.onProgress.bind(this);
    AssetManager.onProgress = this.onProgress.bind(this);
    AssetManager.onError = this.onError.bind(this);
    loadAsset = AssetManager.load("assets/manifest/assets-game.json");
    return loadAsset.then(function() {
      return SceneManager.activate("main-menu");
    });
  };

  PreLoadScene.prototype.onError = function(asset) {
    var text, textSize;
    text = "Error loading " + asset.file;
    this.renderer.ctx.fillStyle = "#000";
    this.renderer.ctx.fillRect(0, 0, this.renderer.width, this.renderer.height);
    this.renderer.ctx.fillStyle = "#ff4444";
    this.renderer.ctx.font = "14px Arial, sans-serif";
    this.renderer.ctx.textBaseline = "top";
    textSize = this.renderer.ctx.measureText(text);
    return this.renderer.ctx.fillText(text, this.bar.middle - (textSize.width / 2), this.bar.y + this.bar.height + 10);
  };

  PreLoadScene.prototype.onProgress = function(asset, group, loaded, total) {
    this.renderer.ctx.fillStyle = "#000";
    this.renderer.ctx.fillRect(0, 0, this.renderer.width, this.renderer.height);
    this.renderLoadingText("Loading " + group);
    return this.renderLoadingBar(loaded / total);
  };

  PreLoadScene.prototype.renderLoadingText = function(text) {
    var textSize;
    this.renderer.ctx.fillStyle = "#33B5E5";
    this.renderer.ctx.font = "14px Arial, sans-serif";
    this.renderer.ctx.textBaseline = "top";
    textSize = this.renderer.ctx.measureText(text);
    return this.renderer.ctx.fillText(text, this.bar.middle - (textSize.width / 2), this.bar.y + this.bar.height + 10);
  };

  PreLoadScene.prototype.renderLoadingBar = function(percent) {
    this.renderer.ctx.drawImage(this.bar.background, this.bar.x, this.bar.y);
    return this.renderer.ctx.drawImage(this.bar.fill, this.bar.x + 6, this.bar.y, (this.bar.width - 12) * percent, this.bar.height);
  };

  return PreLoadScene;

})(Scene);

module.exports = PreLoadScene;


},{"../../vendor/iki-engine/src/Manager/AssetManager.coffee":7,"../../vendor/iki-engine/src/Manager/GraphicsManager.coffee":8,"../../vendor/iki-engine/src/Manager/SceneManager.coffee":10,"../../vendor/iki-engine/src/Scene.coffee":11}],5:[function(require,module,exports){
var BootScene, Engine, game;

Engine = require("../vendor/iki-engine/src/Engine.coffee");

BootScene = require("./Scene/Boot.coffee");

game = new Engine;

game.start(new BootScene);


},{"../vendor/iki-engine/src/Engine.coffee":6,"./Scene/Boot.coffee":1}],6:[function(require,module,exports){
var Engine, SceneManager;

SceneManager = require("./Manager/SceneManager.coffee");

Engine = (function() {
  function Engine() {
    this.lastGameTick = Date.now();
  }

  Engine.prototype.start = function(scene) {
    SceneManager.add("boot", scene);
    scene.init();
    SceneManager.activate("boot");
    return this.mainLoop();
  };

  Engine.prototype.mainLoop = function() {
    requestAnimationFrame(this.mainLoop.bind(this));
    this.currentGameTick = Date.now();
    this.delta = this.currentGameTick - this.lastGameTick;
    this.lastGameTick = this.currentGameTick;
    this.update(this.delta);
    return null;
  };

  Engine.prototype.update = function(dt) {
    var scene, system, _i, _len, _ref;
    scene = SceneManager.current();
    _ref = scene.systems;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      system = _ref[_i];
      system.update(dt);
    }
    return null;
  };

  return Engine;

})();

module.exports = Engine;


},{"./Manager/SceneManager.coffee":10}],7:[function(require,module,exports){
var AssetManager, Util;

Util = require("../Util.coffee");

AssetManager = (function() {
  function AssetManager() {}

  AssetManager.assets = {};

  AssetManager.numAssets = 0;

  AssetManager.assetsLoaded = 0;

  AssetManager.load = function(manifest) {
    var promise;
    this.numAssets = 0;
    this.assetsLoaded = 0;
    promise = new Promise(function(resolve) {
      var loadManifest;
      loadManifest = Util.loadJSON(manifest);
      return loadManifest.then(function(json) {
        var a, asset, assetGroup, groupName, i, _i, _len, _ref, _ref1, _results;
        _ref = json.assets;
        for (i in _ref) {
          assetGroup = _ref[i];
          for (_i = 0, _len = assetGroup.length; _i < _len; _i++) {
            a = assetGroup[_i];
            AssetManager.numAssets++;
          }
        }
        _ref1 = json.assets;
        _results = [];
        for (groupName in _ref1) {
          assetGroup = _ref1[groupName];
          _results.push((function() {
            var _j, _len1, _results1;
            _results1 = [];
            for (_j = 0, _len1 = assetGroup.length; _j < _len1; _j++) {
              asset = assetGroup[_j];
              if (typeof AssetManager.onBeforeLoad === "function") {
                AssetManager.onBeforeLoad(asset, groupName, AssetManager.assetsLoaded, AssetManager.numAssets);
              }
              _results1.push((function(asset) {
                var assetLoad;
                if (asset.type === "image") {
                  assetLoad = Util.loadImage(json.root + asset.file);
                  assetLoad.then(function(img) {
                    return AssetManager.assetLoaded(asset, groupName, resolve, img);
                  });
                } else if (asset.type === "json") {
                  assetLoad = Util.loadJSON(json.root + asset.file);
                  assetLoad.then(function(json) {
                    return AssetManager.assetLoaded(asset, groupName, resolve, json);
                  });
                } else {
                  assetLoad = Util.load(json.root + asset.file);
                  assetLoad.then(function() {
                    return AssetManager.assetLoaded(asset, groupName, resolve);
                  });
                }
                return assetLoad["catch"](function() {
                  return AssetManager.onError(asset, groupName);
                });
              })(asset));
            }
            return _results1;
          })());
        }
        return _results;
      });
    });
    return promise;
  };

  AssetManager.assetLoaded = function(asset, groupName, resolve, data) {
    if (data) {
      AssetManager.assets[asset.file] = data;
    }
    AssetManager.assetsLoaded++;
    if (typeof AssetManager.onProgress === "function") {
      AssetManager.onProgress(asset, groupName, AssetManager.assetsLoaded, AssetManager.numAssets);
    }
    if (AssetManager.assetsLoaded === AssetManager.numAssets) {
      if (typeof AssetManager.onLoaded === "function") {
        AssetManager.onLoaded();
      }
      return resolve();
    }
  };

  AssetManager.onBeforeLoad = function(asset, group, loaded, total) {};

  AssetManager.onProgress = function(asset, group, loaded, total) {};

  AssetManager.onError = function(asset, group) {};

  AssetManager.onLoaded = function() {};

  AssetManager.get = function(asset) {
    return AssetManager.assets[asset];
  };

  return AssetManager;

})();

module.exports = AssetManager;


},{"../Util.coffee":12}],8:[function(require,module,exports){
var GraphicsManager;

GraphicsManager = (function() {
  function GraphicsManager() {}

  GraphicsManager.createCanvas = function(width, height, appendTo) {
    var canvas;
    canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    if (appendTo) {
      appendTo.appendChild(canvas);
    }
    return canvas;
  };

  GraphicsManager.createRenderer = function(width, height, appendTo) {
    var renderer;
    renderer = {};
    renderer.canvas = GraphicsManager.createCanvas(width, height, appendTo);
    renderer.ctx = renderer.canvas.getContext("2d");
    renderer.width = width;
    renderer.height = height;
    return renderer;
  };

  GraphicsManager.cloneRenderer = function(oldRenderer, appendTo) {
    return GraphicsManager.createRenderer(oldRenderer.canvas.width, oldRenderer.canvas.height, appendTo);
  };

  GraphicsManager.fillImage = function(ctx, image, imageWidth, imageHeight, destinationWidth, destinationHeight) {
    var height, ratioDestination, ratioImage, width;
    ratioImage = imageWidth / imageHeight;
    ratioDestination = destinationWidth / destinationHeight;
    width = destinationWidth;
    height = destinationHeight;
    if (ratioDestination > ratioImage) {
      height = destinationWidth / ratioImage;
    } else {
      width = destinationHeight * ratioImage;
    }
    return ctx.drawImage(image, 0, 0, imageWidth, imageHeight, 0, 0, width, height);
  };

  GraphicsManager.fitImage = function(ctx, image, imageWidth, imageHeight, destinationWidth, destinationHeight) {
    var height, ratioDestination, ratioImage, width;
    ratioImage = imageWidth / imageHeight;
    ratioDestination = destinationWidth / destinationHeight;
    width = destinationWidth;
    height = destinationHeight;
    if (ratioDestination > ratioImage) {
      width = imageWidth * destinationHeight / imageHeight;
      height = destinationHeight;
    } else {
      width = destinationWidth;
      height = imageHeight * destinationWidth / imageWidth;
    }
    return ctx.drawImage(image, 0, 0, imageWidth, imageHeight, 0, 0, width, height);
  };

  GraphicsManager.roundedRectStroke = function(ctx, x, y, w, h, radius) {
    var b, r;
    r = x + w;
    b = y + h;
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(r - radius, y);
    ctx.quadraticCurveTo(r, y, r, y + radius);
    ctx.lineTo(r, y + h - radius);
    ctx.quadraticCurveTo(r, b, r - radius, b);
    ctx.lineTo(x + radius, b);
    ctx.quadraticCurveTo(x, b, x, b - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    return ctx.stroke();
  };

  GraphicsManager.roundedRectFill = function(ctx, x, y, w, h, radius) {
    var b, r;
    r = x + w;
    b = y + h;
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(r - radius, y);
    ctx.quadraticCurveTo(r, y, r, y + radius);
    ctx.lineTo(r, y + h - radius);
    ctx.quadraticCurveTo(r, b, r - radius, b);
    ctx.lineTo(x + radius, b);
    ctx.quadraticCurveTo(x, b, x, b - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    return ctx.fill();
  };

  return GraphicsManager;

})();

module.exports = GraphicsManager;


},{}],9:[function(require,module,exports){
var InputManager;

InputManager = (function() {
  function InputManager() {}

  InputManager.CLICK_MOVE_THRESHOLD = 3;

  InputManager.MOUSE_TRANSFORM_RECT = false;

  InputManager.MOUSE_TRANSFORM_WIDTH = false;

  InputManager.MOUSE_TRANSFORM_HEIGHT = false;

  InputManager.MOUSE_OFFSET_X = false;

  InputManager.MOUSE_OFFSET_Y = false;

  InputManager.mouse = {
    x: 0,
    y: 0,
    down: false,
    downX: 0,
    downY: 0
  };

  InputManager.key = {
    up: false,
    down: false,
    left: false,
    right: false
  };

  InputManager.init = function(element) {
    if (element == null) {
      element = document;
    }
    element.addEventListener("click", InputManager.mouseClick);
    element.addEventListener("mousedown", InputManager.mouseDown);
    element.addEventListener("touchstart", InputManager.mouseDown);
    element.addEventListener("mouseup", InputManager.mouseUp);
    element.addEventListener("touchend", InputManager.mouseUp);
    element.addEventListener("mousemove", InputManager.mouseMove);
    element.addEventListener("touchmove", InputManager.mouseMove);
    document.addEventListener("keyup", InputManager.keyUp);
    return document.addEventListener("keydown", InputManager.keyDown);
  };

  InputManager.mouseClick = function(e) {
    var moveX, moveY, x, y;
    x = InputManager.transformMouseX(e.x);
    y = InputManager.transformMouseY(e.y);
    moveX = Math.abs(InputManager.mouse.downX - x);
    moveY = Math.abs(InputManager.mouse.downY - y);
    if (moveX < InputManager.CLICK_MOVE_THRESHOLD && moveY < InputManager.CLICK_MOVE_THRESHOLD) {
      return typeof InputManager.onMouseClick === "function" ? InputManager.onMouseClick({
        x: x,
        y: y
      }) : void 0;
    }
  };

  InputManager.mouseDown = function(e) {
    var x, y;
    if (e.changedTouches) {
      x = e.changedTouches[0].pageX;
      y = e.changedTouches[0].pageY;
    } else {
      x = e.x;
      y = e.y;
    }
    InputManager.mouse.x = InputManager.mouse.downX = InputManager.transformMouseX(x);
    InputManager.mouse.y = InputManager.mouse.downY = InputManager.transformMouseY(y);
    return InputManager.mouse.down = true;
  };

  InputManager.mouseUp = function(e) {
    var x, y;
    if (e.changedTouches) {
      x = e.changedTouches[0].pageX;
      y = e.changedTouches[0].pageY;
    } else {
      x = e.x;
      y = e.y;
    }
    InputManager.mouse.x = InputManager.transformMouseX(x);
    InputManager.mouse.y = InputManager.transformMouseY(y);
    return InputManager.mouse.down = false;
  };

  InputManager.mouseMove = function(e) {
    var x, y;
    if (e.changedTouches) {
      x = e.changedTouches[0].pageX;
      y = e.changedTouches[0].pageY;
    } else {
      x = e.x;
      y = e.y;
    }
    InputManager.mouse.x = x = InputManager.transformMouseX(x);
    InputManager.mouse.y = y = InputManager.transformMouseY(y);
    if (typeof InputManager.onMouseMove === "function") {
      InputManager.onMouseMove({
        x: x,
        y: y
      });
    }
    return e.preventDefault();
  };

  InputManager.keyUp = function(e) {
    if (e.keyCode === 38) {
      InputManager.key.up = false;
    }
    if (e.keyCode === 40) {
      InputManager.key.down = false;
    }
    if (e.keyCode === 37) {
      InputManager.key.left = false;
    }
    if (e.keyCode === 39) {
      InputManager.key.right = false;
    }
    return typeof InputManager.onKeyUp === "function" ? InputManager.onKeyUp(e) : void 0;
  };

  InputManager.keyDown = function(e) {
    if (e.keyCode === 38) {
      InputManager.key.up = true;
    }
    if (e.keyCode === 40) {
      InputManager.key.down = true;
    }
    if (e.keyCode === 37) {
      InputManager.key.left = true;
    }
    if (e.keyCode === 39) {
      InputManager.key.right = true;
    }
    return typeof InputManager.onKeyDown === "function" ? InputManager.onKeyDown(e) : void 0;
  };

  InputManager.onMouseClick = function(e) {};

  InputManager.onMouseMove = function(e) {};

  InputManager.onKeyUp = function(e) {};

  InputManager.onKeyDown = function(e) {};

  InputManager.transformMouseX = function(x) {
    if (InputManager.MOUSE_TRANSFORM_RECT && InputManager.MOUSE_TRANSFORM_WIDTH) {
      x = (x / InputManager.MOUSE_TRANSFORM_RECT.right) * InputManager.MOUSE_TRANSFORM_WIDTH;
    }
    if (InputManager.MOUSE_OFFSET_X) {
      x -= InputManager.MOUSE_OFFSET_X;
    }
    return x;
  };

  InputManager.transformMouseY = function(y) {
    if (this.MOUSE_TRANSFORM_RECT && this.MOUSE_TRANSFORM_HEIGHT) {
      y = (y / this.MOUSE_TRANSFORM_RECT.bottom) * this.MOUSE_TRANSFORM_HEIGHT;
    }
    if (InputManager.MOUSE_OFFSET_Y) {
      y -= InputManager.MOUSE_OFFSET_Y;
    }
    return y;
  };

  return InputManager;

})();

module.exports = InputManager;


},{}],10:[function(require,module,exports){
var SceneManager,
  __slice = [].slice;

SceneManager = (function() {
  function SceneManager() {}

  SceneManager.currentScene = "boot";

  SceneManager.scenes = {};

  SceneManager.add = function(name, scene) {
    SceneManager.scenes[name] = scene;
    return null;
  };

  SceneManager.current = function() {
    return SceneManager.scenes[SceneManager.currentScene];
  };

  SceneManager.activate = function() {
    var args, name, old, _ref;
    name = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
    old = SceneManager.current();
    if (old) {
      old.deactivate();
    }
    SceneManager.currentScene = name;
    SceneManager.onActivate(name);
    if ((_ref = SceneManager.current()) != null) {
      _ref.activate.apply(SceneManager.current(), args);
    }
    return null;
  };

  SceneManager.onActivate = function(name) {};

  return SceneManager;

})();

module.exports = SceneManager;


},{}],11:[function(require,module,exports){
var Scene;

Scene = (function() {
  function Scene() {
    this.systems = [];
  }

  Scene.prototype.addSystem = function(system) {
    this.systems.push(system);
    return system;
  };

  Scene.prototype.init = function() {};

  Scene.prototype.activate = function() {};

  Scene.prototype.deactivate = function() {};

  return Scene;

})();

module.exports = Scene;


},{}],12:[function(require,module,exports){
var Util;

Util = (function() {
  function Util() {}

  Util.loadJSON = function(url) {
    return Util.load(url).then(JSON.parse);
  };

  Util.load = function(url) {
    var promise;
    promise = new Promise(function(resolve, reject) {
      var xhr;
      xhr = new XMLHttpRequest();
      xhr.open("GET", url, true);
      xhr.addEventListener("readystatechange", function() {
        var _ref;
        if (xhr.readyState === 4) {
          if ((_ref = xhr.status) === 200 || _ref === 304) {
            return resolve(xhr.responseText);
          } else {
            return reject("error");
          }
        }
      });
      return xhr.send();
    });
    return promise;
  };

  Util.loadImage = function(src) {
    var promise;
    promise = new Promise(function(resolve, reject) {
      var image;
      image = new Image();
      image.addEventListener("load", function() {
        return resolve(this);
      });
      image.addEventListener("error", function() {
        return reject("error");
      });
      image.src = src;
      if (image.complete) {
        return resolve(image);
      }
    });
    return promise;
  };

  Util.pluralise = function(word) {
    var l1, l2, len;
    len = word.length;
    l1 = word.substr(-1);
    l2 = word.substr(-2);
    if (l1 === "y") {
      word = word.substr(0, len - 1) + "ies";
    } else if (l1 === "s" || l1 === "x" || l2 === "ch" || l2 === "sh" || l2 === "es") {
      word = word + "es";
    } else {
      word = word + "s";
    }
    return word;
  };

  Util.isPointInRect = function(x, y, rx, ry, rw, rh) {
    return x >= rx && x <= rx + rw && y >= ry && y <= ry + rh;
  };

  return Util;

})();

module.exports = Util;


},{}]},{},[5]);