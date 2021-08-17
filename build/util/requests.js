"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getVersionsAvailable = getVersionsAvailable;
exports.getProjectsAvailable = getProjectsAvailable;
exports.getVersions = getVersions;

var _axios = _interopRequireDefault(require("axios"));

var _urls = _interopRequireDefault(require("./urls"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function getVersionsAvailable(_x) {
  return _getVersionsAvailable.apply(this, arguments);
}

function _getVersionsAvailable() {
  _getVersionsAvailable = _asyncToGenerator(function* (project) {
    var res = yield _axios.default.get(_urls.default.ProjectsAvailable + "/" + project);
    return res.data.versions.reverse();
  });
  return _getVersionsAvailable.apply(this, arguments);
}

function getProjectsAvailable() {
  return _getProjectsAvailable.apply(this, arguments);
}

function _getProjectsAvailable() {
  _getProjectsAvailable = _asyncToGenerator(function* () {
    try {
      var res = yield _axios.default.get(_urls.default.ProjectsAvailable);
      return res.data.projects;
    } catch (err) {
      console.error(err);
    }
  });
  return _getProjectsAvailable.apply(this, arguments);
}

function getVersions(_x2) {
  return _getVersions.apply(this, arguments);
}

function _getVersions() {
  _getVersions = _asyncToGenerator(function* (_ref) {
    var {
      version,
      project
    } = _ref;
    verifyVersion(version, project);
    var res = yield _axios.default.get("https://papermc.io/api/v2/projects/".concat(project, "/versions/").concat(version));
    return yield res.data.builds.reverse();
  });
  return _getVersions.apply(this, arguments);
}

function verifyVersion(_x3, _x4) {
  return _verifyVersion.apply(this, arguments);
}

function _verifyVersion() {
  _verifyVersion = _asyncToGenerator(function* (version, project) {
    if (!version) throw new Error('No version provied');
    if (!project) throw new Error('No project provied');
    var versions = yield getVersionsAvailable(project);
    if (versions.indexOf(version) === -1) throw new Error("This version is not Available");
  });
  return _verifyVersion.apply(this, arguments);
}