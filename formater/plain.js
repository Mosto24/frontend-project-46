// const deep = require('./formater/stylish.js');

// function plain(filepath1, filepath2) {
//     let obj = deep(filepath1, filepath2);

// }

const fs = require('node:fs');
const yaml = require('js-yaml');
const { has, property } = require('lodash');

function formatFiles(filepath1, filepath2) {
    let f1;
    let f2;
      if (filepath1.endsWith('.json')) {
        f1 = JSON.parse(fs.readFileSync(filepath1, "utf8"));
      }
      if (filepath2.endsWith('.json')) {
        f2 = JSON.parse(fs.readFileSync(filepath2, "utf8"));
      }
      if (filepath1.endsWith('.yml')) {
        f1 = yaml.load(fs.readFileSync(filepath1));
      }
      if (filepath2.endsWith('.yml')) {
        f2 = yaml.load(fs.readFileSync(filepath2));
      }
      return [f1, f2];
  }

function plain(file1, file2) {
    let [f1, f2] = formatFiles(file1, file2);
    const arrF1 = Object.keys(f1);
    const arrF2 = Object.keys(f2);
    let resultObj = '';
    for (let key of arrF1) {
      if(arrF2.includes(key)) {
        if(typeof f1[key] == 'object' && typeof f2[key] == 'object') {
          recurse(f1[key], f2[key], `Property ${key}`);
        } else if (f1[key] != f2[key]) {
          resultObj += `Proprerty ${key} was updated. From ${f1[key]} to ${f2[key]} \n`;
        } 
        // else {
        //   resultObj += `${key} was added with value: ${f2[key]}`;
        // }
      } else {
        resultObj += `Proprerty ${key} was removed \n`;
      }
    }
    for(let key of arrF2) {
      if(!arrF1.includes(key)) {
        resultObj += `Proprerty ${key} was added with value: ${f2[key]} \n`;
      }
    }
    function recurse(obj1, obj2, nowIterKey) {
        for (let key in obj1) {
            let resultObjCopy = resultObj;
            resultObj += `${nowIterKey}.`;
            let nowIterKeyCopy = nowIterKey;
            if(Object.hasOwn(obj2, key)) {
              if(typeof obj1[key] == 'object' && typeof obj2[key] == 'object') {
                // resultObj += `${key}.`;
                nowIterKey += `.${key}`;
                resultObj = resultObjCopy;
                recurse(obj1[key], obj2[key], nowIterKey);
              } else if (obj1[key] != obj2[key]) {
                resultObj += `${key} was updated. From ${obj1[key]} to ${obj2[key]} \n`;
                nowIterKey = nowIterKeyCopy;
              } 
              else {
                resultObj = resultObjCopy;
                nowIterKey = nowIterKeyCopy;
              }
            } else {
              resultObj += `${key} was removed \n`;
              nowIterKey = nowIterKeyCopy;
            }
            nowIterKey = nowIterKeyCopy;
          }
          for(let key in obj2) {
            if(!Object.hasOwn(obj1, key)) {
              resultObj += `${nowIterKey}.${key} was added with value: ${obj2[key]} \n`;
            }
          }
    }
    resultObj = resultObj.replaceAll('[object Object]', '[complex value]');
    console.log(resultObj);
    return resultObj;
  }

module.exports = plain;