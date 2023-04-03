#!/usr/bin/env node
"use strict";

var paper = _interopRequireWildcard(require("./util/requests.js"));
var dw = _interopRequireWildcard(require("./util/downloads.js"));
var _inquirer = _interopRequireDefault(require("inquirer"));
var _commander = _interopRequireDefault(require("commander"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
_commander.default.option('-p, --proyect <proyect>', 'Specify the project', null).option('-P, --pathStr <pathStr>', 'Specify the paths separated by comma', null).option('-v, --version <version>', 'Specify the version, you can use: -r lasted', null).option('-r, --release <release>', 'Specify the release, you can use: -r lasted', null).option('-n, --name <name>', 'Specify the name of the file', null).parse(process.argv);
const choose = async () => {
  let proyect;
  if (_commander.default.proyect) {
    proyect = _commander.default.proyect;
  } else {
    const qs = [{
      name: 'proyect',
      type: 'list',
      message: 'Choose a proyect: ',
      choices: await paper.getProjectsAvailable()
    }];
    const answers = await _inquirer.default.prompt(qs);
    proyect = answers.proyect;
  }
  return proyect;
};
const initPathStr = async () => {
  let pathStr;
  if (_commander.default.pathStr) {
    pathStr = _commander.default.pathStr;
  } else {
    const qs = [{
      name: 'pathStr',
      type: 'input',
      message: 'Write separate by "," the paths: '
    }];
    const answers = await _inquirer.default.prompt(qs);
    pathStr = answers.pathStr;
  }
  return pathStr;
};
const initVersion = async proyect => {
  let version;
  if (_commander.default.version) {
    if (_commander.default.version == "lasted") {
      let aux = await paper.getVersionsAvailable(proyect);
      version = aux[0];
    } else {
      version = _commander.default.version;
    }
  } else {
    const choices = await paper.getVersionsAvailable(proyect);
    const qs = [{
      name: 'version',
      type: 'list',
      message: 'Choose the version: ',
      choices
    }];
    const answers = await _inquirer.default.prompt(qs);
    version = answers.version;
  }
  return version;
};
const getRelease = async (version, proyect) => {
  let release;
  if (_commander.default.release) {
    if (_commander.default.release == "lasted") {
      let aux = await paper.getVersions({
        version: version,
        project: proyect
      });
      release = aux[0];
    } else {
      release = _commander.default.release;
    }
  } else {
    const qs = [{
      name: 'release',
      type: 'list',
      message: 'Choose the release: ',
      choices: await paper.getVersions({
        version: version,
        project: proyect
      })
    }];
    const answers = await _inquirer.default.prompt(qs);
    release = answers.release;
  }
  return release;
};
const getName = async (proyect, version, release) => {
  let name;
  if (_commander.default.name) {
    name = _commander.default.name;
  } else {
    const qs = [{
      name: 'name',
      type: 'input',
      message: `Write the name of file (default: ${proyect}-${version}-${release}.jar): `
    }];
    const answers = await _inquirer.default.prompt(qs);
    name = answers.name || `${proyect}-${version}-${release}.jar`;
  }
  return name;
};
(async () => {
  const proyect = await choose();
  const pathStr = await initPathStr();
  const version = await initVersion(proyect);
  const release = await getRelease(version, proyect);
  const name = await getName(proyect, version, release);
  dw.download({
    proyect,
    pathStr,
    version,
    release,
    name,
    proyect
  });
})();