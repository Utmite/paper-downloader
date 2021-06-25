#!/usr/bin/env node

import * as paper from './util/requests.js'
import './util/getMaxValue.js'
import inquirer  from "inquirer"

  const initParams = () => {
    const qs = [{
        name: 'pathStr',
        type: 'input',
        message: 'Write separate by "," the paths: '
      },{
        name: 'version',
        type: 'list',
        message: 'Choose the version: ',
        choices: [
          '1.17',
          '1.16.5',
          '1.15.2'
        ]
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
      }];
    return inquirer.prompt(qs);   
  };

  (async() => {
    const {pathStr, version} = await initParams()
    const {relesa} = await finalParams(version)
    paper.download({pathStr,version,relesa})
  })();
