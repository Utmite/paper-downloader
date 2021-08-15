#!/usr/bin/env node

import * as paper from './util/requests.js'
import * as dw from './util/downloads'

import './util/getMaxValue.js'
import inquirer  from "inquirer"

  const initParams = async () => {
    const qs = [{
        name: 'pathStr',
        type: 'input',
        message: 'Write separate by "," the paths: '
      },{
        name: 'version',
        type: 'list',
        message: 'Choose the version: ',
        choices: await paper.getVersionsAvailable()
      }
    ];
    return inquirer.prompt(qs);
  };
  const finalParams = async (version) => {
      const qs = [{
        name: 'relesa',
        type: 'list',
        message: 'Choose the release: ',
        choices: await paper.getVersions({version: version}),
      },{
        name: 'name',
        type: 'input',
        message: 'Write the name of file (default: papermc-${version}-${release}.jar): '
      }];
    return inquirer.prompt(qs);   
  };

  (async() => {
    const {pathStr, version} = await initParams()
    const {relesa,name} = await finalParams(version)
    dw.download({pathStr,version,relesa,name})
  })();
