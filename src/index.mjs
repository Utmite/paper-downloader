#!/usr/bin/env node

import * as paper from './util/requests.mjs'
import * as dw from './util/downloads.mjs'
import inquirer  from "inquirer"
import commander from 'commander'

commander
  .option('-p, --proyect <proyect>', 'Specify the project')
  .option('-pa, --pathStr <pathStr>', 'Specify the paths separated by comma')
  .option('-v, --version <version>', 'Specify the version')
  .option('-r, --release <release>', 'Specify the release')
  .option('-n, --name <name>', 'Specify the name of the file')
  .parse(process.argv)

const choose = async () => {
  const qs = [{
    name: 'proyect',
    type: 'list',
    message: 'Choose a proyect: ',
    choices: await paper.getProjectsAvailable()
  }];
  return commander.proyect ? { proyect: commander.proyect } : inquirer.prompt(qs);
}

const initParams = async (proyect) => {
  let pathStr, version;
  if (commander.pathStr && commander.version) {
    pathStr = commander.pathStr;
    version = commander.version;
  } else {
    const qs = [{
        name: 'pathStr',
        type: 'input',
        message: 'Write separate by "," the paths: '
      },{
        name: 'version',
        type: 'list',
        message: 'Choose the version: ',
        choices: await paper.getVersionsAvailable(proyect)
      }
    ];
    const answers = await inquirer.prompt(qs);
    pathStr = answers.pathStr;
    version = answers.version;
  }
  return { pathStr, version };
};

const finalParams = async (version,proyect) => {
  let release, name;
  if (commander.release && commander.name) {
    release = commander.release;
    name = commander.name;
  } else {
    const qs = [{
        name: 'release',
        type: 'list',
        message: 'Choose the release: ',
        choices: await paper.getVersions({version: version,project: proyect}),
      },{
        name: 'name',
        type: 'input',
        message: `Write the name of file (default: ${proyect}-${version}-${release}.jar): `
      }
    ];
    const answers = await inquirer.prompt(qs);
    release = answers.release;
    name = answers.name || `${proyect}-${version}-${release}.jar`;
  }
  return { release, name };
};


(async() => {
  const {proyect} = await choose()
  const {pathStr, version} = await initParams(proyect)
  const {release,name} = await finalParams(version,proyect)

  dw.download({proyect,pathStr,version,release,name,proyect})
})();
