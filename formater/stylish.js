const fs = require('node:fs');

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

function deep(file1, file2) {
    let [f1, f2] = formatFiles(file1, file2);
    const arrF1 = Object.keys(f1);
    const arrF2 = Object.keys(f2);
    let resultObj = {};
    for (let key of arrF1) {
      if(arrF2.includes(key)) {
        if(typeof f1[key] == 'object' && typeof f2[key] == 'object') {
          resultObj[key] = recurse(f1[key], f2[key]);
        } else if (f1[key] != f2[key]) {
          resultObj[`- ${key}`] = f1[key];
          resultObj[`+ ${key}`] = f2[key];
        } else {
          resultObj[key] = f2[key];
        }
      } else {
        resultObj[`- ${key}`] = f1[key];
      }
    }
    for(let key of arrF2) {
      if(!arrF1.includes(key)) {
        resultObj[`+ ${key}`] = f2[key];
      }
    }
    function recurse(obj1, obj2) {
      let iterValue = {};
      for (let key in obj1) {
        if (Object.hasOwn(obj2, key)) {
          if(typeof obj1[key] == 'object' && typeof obj2[key] == 'object') {
            iterValue[key] = recurse(obj1[key], obj2[key]);
          } else if (obj1[key] != obj2[key]) {
            iterValue[`- ${key}`] = obj1[key];
            iterValue[`+ ${key}`] = obj2[key];
          } else {
            iterValue[key] = obj2[key];
          }
        } else {
          iterValue[`- ${key}`] = obj1[key];
        }
      }
      for(let key in obj2) {
        if(!Object.hasOwn(obj1, key)) {
          iterValue[`+ ${key}`] = obj2[key];
        }
      }
      return iterValue;
    }
    resultObj = JSON.stringify(resultObj, null, 2);
    console.log(resultObj);
    return resultObj;
  }

module.exports = deep;