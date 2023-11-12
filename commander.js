#!/usr/bin/env node

// import {Command} from 'commander'; // (normal include)
// import {program} from 'commander';
// import { readFileSync } from 'node:fs';
// import _ from 'lodash';
const program = require('commander');
const fs = require('node:fs');
const Command = require('commander');
const _ = require('lodash');

function takeAndEcho(filepath1, filepath2) {
  const f1 = JSON.parse(fs.readFileSync(filepath1, "utf8"));
  const f2 = JSON.parse(fs.readFileSync(filepath2, "utf8"));
  const arrF1 = Object.keys(f1);
  const arrF2 = Object.keys(f2);
  let resultObj = {};
  for (let key of arrF1) {
    if(arrF2.includes(key)) {
      if(f1[key] == f2[key]) {
        resultObj[key] = f2[key];
      } else {
        resultObj[`- ${key}`] = f1[key];
        resultObj[`+ ${key}`] = f2[key];
      }
    } else {
      resultObj[`- ${key}`] = f1[key];
    }
  }
  for (let key of arrF2) {
    if (!arrF1.includes(key)) {
      resultObj[`+ ${key}`] = f2[key];
    }
  }
  console.log(JSON.stringify(resultObj));
  }

program
  .option('-V, --version', 'output the version number')
  .option('-f, --format <type>',  'output format')
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .action(takeAndEcho);
  

// program.parse(process.argv);

module.exports = takeAndEcho;