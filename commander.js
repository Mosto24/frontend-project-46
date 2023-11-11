#!/usr/bin/env node

// import {Command} from 'commander'; // (normal include)
import {program} from 'commander';
import { readFileSync } from 'node:fs';

program
  .option('-V, --version', 'output the version number')
  .option('-f, --format <type>',  'output format')
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .action((filepath1, filepath2) => {
    let f1 = readFileSync(filepath1, "utf8");
    console.log(JSON.parse(f1));
    let f2 = readFileSync(filepath2, "utf8");
    console.log(JSON.parse(f2));
  });
  

program.parse(process.argv);