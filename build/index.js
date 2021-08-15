#!/usr/bin/env node
"use strict";

var paper = _interopRequireWildcard(require("./util/requests.js"));

var dw = _interopRequireWildcard(require("./util/downloads"));

require("./util/getMaxValue.js");

var _inquirer = _interopRequireDefault(require("inquirer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var initParams = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* () {
    var qs = [{
      name: 'pathStr',
      type: 'input',
      message: 'Write separate by "," the paths: '
    }, {
      name: 'version',
      type: 'list',
      message: 'Choose the version: ',
      choices: yield paper.getVersionsAvailable()
    }];
    return _inquirer.default.prompt(qs);
  });

  return function initParams() {
    return _ref.apply(this, arguments);
  };
}();

var finalParams = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (version) {
    var qs = [{
      name: 'relesa',
      type: 'list',
      message: 'Choose the release: ',
      choices: yield paper.getVersions({
        version: version
      })
    }, {
      name: 'name',
      type: 'input',
      message: 'Write the name of file (default: papermc-${version}-${release}.jar): '
    }];
    return _inquirer.default.prompt(qs);
  });

  return function finalParams(_x) {
    return _ref2.apply(this, arguments);
  };
}();

_asyncToGenerator(function* () {
  var {
    pathStr,
    version
  } = yield initParams();
  var {
    relesa,
    name
  } = yield finalParams(version);
  dw.download({
    pathStr,
    version,
    relesa,
    name
  });
})();