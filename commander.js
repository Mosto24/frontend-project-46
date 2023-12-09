#!/usr/bin/env node
/* eslint-disable no-prototype-builtins */

// import {Command} from 'commander'; // (normal include)
// import {program} from 'commander';
// import { readFileSync } from 'node:fs';
// import _ from 'lodash';
const { Command } = require('commander');
const fs = require('node:fs');
const _ = require('lodash');
const yaml = require('js-yaml');
const deep = require('./formater/stylish.js');
const plain = require('./formater/plain.js');
const json = require('./formater/json.js');
const gendiff = require('./gendiff.js');

const program = new Command();

program
  .option('-V, --version', 'output the version number')
  .option('-f, --format <type>',  'output format')
  .arguments('[filepath1] [filepath2] [formater]')
  .description('Compares two configuration files and shows a difference.')
  .action(gendiff);

program.parse();

module.exports = deep;