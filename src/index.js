#!/usr/bin/env node

import * as paper from './util/requests.js'
import * as dw from './util/downloads.js'
import inquirer  from "inquirer"
import commander from 'commander'

commander
  .option('-p, --proyect <proyect>', 'Specify the project', null)
  .option('-P, --pathStr <pathStr>', 'Specify the paths separated by comma', null)
  .option('-v, --version <version>', 'Specify the version, you can use: -r lasted', null)
  .option('-r, --release <release>', 'Specify the release, you can use: -r lasted', null)
  .option('-n, --name <name>', 'Specify the name of the file', null)
  .parse(process.argv)

const choose = async () => {
  let proyect

  if (commander.proyect){
    proyect = commander.proyect
  } else {
    const qs = [{
      name: 'proyect',
      type: 'list',
      message: 'Choose a proyect: ',
      choices: await paper.getProjectsAvailable()
    }];

    const answers = await inquirer.prompt(qs);
    proyect = answers.proyect;
  }
  return proyect
}

const initPathStr = async () => {
  let pathStr;
  if (commander.pathStr) {
    pathStr = commander.pathStr;
  } else {
    const qs = [{
      name: 'pathStr',
      type: 'input',
      message: 'Write separate by "," the paths: '
    }];
    const answers = await inquirer.prompt(qs);
    pathStr = answers.pathStr;
  }
  return pathStr;
};

const initVersion = async (proyect) => {
  let version;
  if (commander.version) {

      if(commander.version == "lasted"){
        let aux  = await paper.getVersionsAvailable(proyect)
        version = aux[0]
        
      }else{
        version = commander.version;
      }
    } else {

    const choices = await paper.getVersionsAvailable(proyect);

    const qs = [{
      name: 'version',
      type: 'list',
      message: 'Choose the version: ',
      choices
    }];
    const answers = await inquirer.prompt(qs);
    version = answers.version;
  }
  return version;
};


const getRelease = async (version, proyect) => {
  let release;
  if (commander.release) {

    if(commander.release == "lasted"){

      let aux  = await paper.getVersions({version: version ,project: proyect})
      
      release = aux[0]
      
    }else{
      release = commander.release;
    }
  } else {
    const qs = [{
        name: 'release',
        type: 'list',
        message: 'Choose the release: ',
        choices: await paper.getVersions({version: version,project: proyect}),
      }
    ];
    const answers = await inquirer.prompt(qs);
    release = answers.release;
  }
  return release;
};

const getName = async (proyect, version, release) => {
  let name;
  if (commander.name) {
    name = commander.name;
  } else {
    const qs = [{
        name: 'name',
        type: 'input',
        message: `Write the name of file (default: ${proyect}-${version}-${release}.jar): `
      }
    ];
    const answers = await inquirer.prompt(qs);
    name = answers.name || `${proyect}-${version}-${release}.jar`;
  }
  return name;
};

(async() => {
  const proyect = await choose()
  const pathStr = await initPathStr()

  const version = await initVersion(proyect)
  const release = await getRelease(version, proyect)
  const name = await getName(proyect, version, release)

  dw.download({proyect,pathStr,version,release,name,proyect})
})();
