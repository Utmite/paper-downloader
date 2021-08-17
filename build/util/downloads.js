"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.download = download;

var _fs = _interopRequireDefault(require("fs"));

require("colors");

var _path = _interopRequireDefault(require("path"));

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var dirname = _fs.default.realpathSync('.');

var PREFIX = "[Paper-Downloader] ->".bgWhite.black.italic;

function download(_x) {
  return _download.apply(this, arguments);
}

function _download() {
  _download = _asyncToGenerator(function* (_ref) {
    var {
      pathStr = "",
      project = "paper",
      version = "1.17",
      relesa,
      name = "paper-".concat(version, "-").concat(relesa, ".jar")
    } = _ref;
    if (pathStr.length <= 0) throw new Error("No have a path/s");
    if (name.length <= 1) name = "".concat(project, "-").concat(version, "-").concat(relesa, ".jar");
    var paths = pathStr.split(",");
    var promises = [];
    console.log("          NOT CLOSE          ".bgYellow.red.bold);
    createFiles(project, version, relesa, paths, name, promises);
    return promises;
  });
  return _download.apply(this, arguments);
}

function getLinkDownload(_x2, _x3, _x4) {
  return _getLinkDownload.apply(this, arguments);
}

function _getLinkDownload() {
  _getLinkDownload = _asyncToGenerator(function* (project, version, release) {
    console.log(PREFIX + " Get Files from: https://papermc.io/api/v2/projects/".concat(project, "/versions/").concat(version, "/builds/").concat(release, "/downloads/").concat(project, "-").concat(version, "-").concat(release, ".jar").green);
    return "https://papermc.io/api/v2/projects/".concat(project, "/versions/").concat(version, "/builds/").concat(release, "/downloads/").concat(project, "-").concat(version, "-").concat(release, ".jar");
  });
  return _getLinkDownload.apply(this, arguments);
}

function createFiles(_x5, _x6, _x7, _x8, _x9, _x10) {
  return _createFiles.apply(this, arguments);
}

function _createFiles() {
  _createFiles = _asyncToGenerator(function* (project, version, relesa, paths, name, promises) {
    var _loop = function* _loop(i) {
      var sym = _path.default.resolve(dirname, paths[i], name);

      var writer = yield createWriteStream(sym);
      var res = yield getStreamPaper(project, version, relesa);
      yield res.data.pipe(writer);
      console.log(PREFIX + " The N-".concat(i + 1, " is starting download").green);
      promises.push(new Promise((resolve, reject) => {
        writer.on('finish', () => console.log(PREFIX + " The N-".concat(i + 1, " is ready on ").concat(sym).cyan));
        writer.on('error', reject => console.log(PREFIX + " Error N-".concat(i + 1, " info ").concat(reject).red));
      }));
    };

    for (var i = 0; i < paths.length; i++) {
      yield* _loop(i);
    }
  });
  return _createFiles.apply(this, arguments);
}

function createWriteStream(_x11) {
  return _createWriteStream.apply(this, arguments);
}

function _createWriteStream() {
  _createWriteStream = _asyncToGenerator(function* (sym) {
    var writer = yield _fs.default.createWriteStream(sym);
    return writer;
  });
  return _createWriteStream.apply(this, arguments);
}

function getStreamPaper(_x12, _x13, _x14) {
  return _getStreamPaper.apply(this, arguments);
}

function _getStreamPaper() {
  _getStreamPaper = _asyncToGenerator(function* (project, version, relesa) {
    var res = yield (0, _axios.default)({
      url: yield getLinkDownload(project, version, relesa),
      method: "GET",
      onDownloadProgress: evt => {
        console.log("hola");
      },
      responseType: "stream"
    });
    return res;
  });
  return _getStreamPaper.apply(this, arguments);
}