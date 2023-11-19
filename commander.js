#!/usr/bin/env node
/* eslint-disable no-prototype-builtins */

// import {Command} from 'commander'; // (normal include)
// import {program} from 'commander';
// import { readFileSync } from 'node:fs';
// import _ from 'lodash';
const program = require('commander');
const fs = require('node:fs');
const Command = require('commander');
const _ = require('lodash');
const yaml = require('js-yaml');
const deep = require('./formater/stylish.js');






program
  .option('-V, --version', 'output the version number')
  .option('-f, --format <type>',  'output format')
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .action(deep);
  

program.parse(process.argv);

module.exports = deep;