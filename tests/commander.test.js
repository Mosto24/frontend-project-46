/* eslint-disable no-undef */
const takeAndEcho = require('../commander.js');

test('test1', () => {
    expect(takeAndEcho('file1.json', 'file2.json')).toEqual(undefined);
});