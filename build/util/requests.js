"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getProjectsAvailable = getProjectsAvailable;
exports.getVersions = getVersions;
exports.getVersionsAvailable = getVersionsAvailable;
var _axios = _interopRequireDefault(require("axios"));
var _urls = _interopRequireDefault(require("./urls.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
async function getVersionsAvailable(project) {
  let res = await _axios.default.get(_urls.default.ProjectsAvailable + "/" + project);
  return res.data.versions.reverse();
}
async function getProjectsAvailable() {
  try {
    let res = await _axios.default.get(_urls.default.ProjectsAvailable);
    return res.data.projects;
  } catch (err) {
    console.error(err);
  }
}
async function getVersions({
  version,
  project
}) {
  verifyVersion(version, project);
  let res = await _axios.default.get(`https://papermc.io/api/v2/projects/${project}/versions/${version}`);
  return await res.data.builds.reverse();
}
async function verifyVersion(version, project) {
  if (!version) throw new Error('No version provied');
  if (!project) throw new Error('No project provied');
  const versions = await getVersionsAvailable(project);
  if (versions.indexOf(version) === -1) throw new Error("This version is not Available");
}