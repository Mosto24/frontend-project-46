/* eslint-disable no-undef */
const deep = require('../commander.js');


let testDiffFilesWithoutRecurse = {
    "- 1": 1,
    "2": 2,
    "+ 3": 3
}
let testDiffFilesWithRecurse = {
    a: {
        "- b": 'be',
        "+ b": 'd',
        "- c": 'c',
        "+ c": {
            "x": "x"
        }
    },
    "- d": "d",
    "+ d": "x"
}

test('testRecurse', () => {
    expect(deep('file5.json', 'file6.json')).toEqual(testDiffFilesWithoutRecurse);
    expect(deep('file7.yml', 'file8.yml')).toEqual(testDiffFilesWithoutRecurse);
    expect(deep('file9.json', 'file10.json')).toEqual(testDiffFilesWithRecurse);
    expect(deep('file11.yml', 'file12.yml')).toEqual(testDiffFilesWithRecurse);
});