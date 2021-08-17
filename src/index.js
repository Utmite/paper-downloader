#!/usr/bin/env node

import * as paper from './util/requests.js'
import * as dw from './util/downloads'

import './util/getMaxValue.js'
import inquirer  from "inquirer"


  const choose = async () => {
      const qs = [{
        name: 'proyect',
        type: 'list',
        message: 'Choose a proyect: ',
        choices: await paper.getProjectsAvailable()
      }
    ];
    return inquirer.prompt(qs);

  }

  const initParams = async (proyect) => {
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
    return inquirer.prompt(qs);
  };
  const finalParams = async (version,proyect) => {
      const qs = [{
        name: 'relesa',
        type: 'list',
        message: 'Choose the release: ',
        choices: await paper.getVersions({version: version,project: proyect}),
      },{
        name: 'name',
        type: 'input',
        message: 'Write the name of file (default: ${proyect}-${version}-${release}.jar): '
      }];
    return inquirer.prompt(qs);   
  };

  (async() => {
    const {proyect} = await choose()
    const {pathStr, version} = await initParams(proyect)
    const {relesa,name} = await finalParams(version,proyect)
    dw.download({project: proyect,pathStr,version,relesa,name,proyect})
  })();
