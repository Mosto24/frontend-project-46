#!/usr/bin/env node

// import {Command} from 'commander'; // (normal include)
import {program} from 'commander';

program
  .option('-V, --version', 'output the version number')
  .option('-f, --format <type>',  'output format')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .description('Compares two configuration files and shows a difference.');
  

program.parse(process.argv);