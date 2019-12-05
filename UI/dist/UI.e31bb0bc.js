// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"index.js":[function(require,module,exports) {
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var state = {
  roles: []
};
var roles_table = document.querySelector("#roles-table");
var start_btn = document.querySelector("#start-btn");
var display = document.querySelector("#display");
var input_func = document.querySelector("#input-function");
var delay = document.querySelector("#delay");
var input, output, rules;

function disableUserInteractions() {
  var inputs = document.querySelectorAll("input");
  var button = document.querySelector("button").disabled = true;
  inputs.forEach(function (input) {
    return input.disabled = true;
  });
}

function enableUserInteractions() {
  console.log("enable");
  var inputs = document.querySelectorAll("input");
  console.log(inputs);
  document.querySelector("button").disabled = false;
  inputs.forEach(function (input) {
    return input.disabled = false;
  });
}

start_btn.addEventListener('click', function (evt) {
  disableUserInteractions();
  var input_function = input_func.value;
  display.innerHTML = "<div class=\"header\">".concat(input_function, "</div>");
  input_function = input_function.replace('(', '').replace(')', '');
  input_function = input_function.split(',');
  input = input_function[0];
  output = input_function[1];
  rules = input_function[2];
  rules = rules.replace("ε", "");
  solverLoop();
});
window.solverLoop = solverLoop;

function solverLoop() {
  var index = getRuleCellIndex(getNextChar(input), getNextChar(output));
  var rule = getRule(index);

  switch (rule) {
    case "pop":
      input = input.substr(getNextChar(input).length);
      output = output.substr(getNextChar(output).length);
      break;

    case "elfogad":
      display.innerHTML += '<div class="success">✔ elfogad</div>';
      enableUserInteractions();
      return;

    default:
      output = output.substr(getNextChar(output).length);

      if (rule.rule !== "ε") {
        output = rule.rule + output;
      }

      rules = rules + rule.rule_number;
      break;
  }

  showOnDisplay(rule);
  setTimeout(solverLoop, Number(delay.value));
}

function getNextChar(text) {
  if (text.length > 2 && text[1] === "'") {
    return text[0] + text[1];
  } else {
    return text[0];
  }
}

function getRuleCellIndex(x, y) {
  var x_headers = roles_table.querySelectorAll("thead > tr > th");

  var x_index = _toConsumableArray(x_headers).findIndex(function (head) {
    return head.innerHTML === x;
  });

  if (x_index === -1) {
    display.innerHTML += "<div class=\"warning\">\u26A0 invalid karakter: ".concat(x, "</div>");
    enableUserInteractions();
    throw "not found x value";
  }

  var y_headers = roles_table.querySelectorAll("tbody > tr > td:first-child");

  var y_index = _toConsumableArray(y_headers).findIndex(function (head) {
    return head.innerHTML === y;
  });

  if (y_index === -1) {
    display.innerHTML += "<div class=\"warning\">\u26A0 invalid karakter: ".concat(y, "</div>");
    enableUserInteractions();
    throw "not found y value";
  }

  return {
    x: x_index + 1,
    y: y_index + 1
  };
}

function getRule(_ref) {
  var x = _ref.x,
      y = _ref.y;
  var rule = roles_table.querySelector("tbody tr:nth-child(".concat(y, ") > td:nth-child(").concat(x, ")"));
  var previusUsedCell = roles_table.querySelector(".use");

  if (previusUsedCell) {
    previusUsedCell.classList.remove("use");
  }

  rule.classList.add("use");
  rule = rule.querySelector("input").value;

  if (rule !== "") {
    if (rule !== "pop" && rule !== "elfogad") {
      rule = rule.split(',');
      return {
        rule: rule[0].replace('(', ''),
        rule_number: rule[1].replace(')', '')
      };
    } else {
      return rule;
    }
  } else {
    display.innerHTML += '<div class="wrong">✖ elutasít</div>';
    enableUserInteractions();
    throw "empty rule cell";
  }
}

function showOnDisplay(rule) {
  var tempRule = rule !== "pop" ? "<span class=\"coral-highlight\">(".concat(rule.rule, ", ").concat(rule.rule_number, ")</span>") : "<span class=\"pop-highlight\">".concat(rule, "</span>");
  display.insertAdjacentHTML('beforeend', "\n    <div class=\"row\">\n        <div class=\"rule\">\n            ".concat(tempRule, "\n        </div>\n        <div class=\"output\">\n            <div class=\"column\">\n                (\n            </div>\n            <div class=\"column\">\n                <span>").concat(input, ",</span>\n            </div>\n            <div class=\"column\">\n                ").concat(output, ",\n            </div>\n            <div class=\"column\">\n                ").concat(rules, "\n            </div>\n            <div class=\"column\">\n                )\n            </div>\n        </div>\n    </div>\n    "));
}
},{}],"../../../Users/tinzik/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "53999" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../Users/tinzik/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/UI.e31bb0bc.js.map