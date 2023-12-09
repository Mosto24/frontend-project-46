const deep = require('./formater/stylish.js');
const plain = require('./formater/plain.js');
const json = require('./formater/json.js');

function gendiff(filepath1, filepath2, formater = 'stylish') {
    if(formater == 'stylish') {
      deep(filepath1, filepath2);
    }
    if (formater == 'plain') {
      plain(filepath1, filepath2);
    }
    if (formater == 'json') {
      json(filepath1, filepath2);
    }
}

module.exports = gendiff;