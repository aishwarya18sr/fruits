const getFruits = require('../fruitsGetterPromise.js');
const fs = require('fs');

describe('getFruits', function() {
  test('should return the fruits array', () => {
    jest.spyOn(fs,'readFile').mockImplementation((path,encoding,callback) => {
      callback(null,'apple\norange');
    });
    return getFruits().then(data => {
      expect(data).toStrictEqual([ 'apple','orange']);
    });
  });
  test('should return the fruits array', () => {
    jest.spyOn(fs,'readFile').mockImplementation((path,encoding,callback) => {
      callback(null,'Apple\nMango\nStawberry\nPineapple\nOrange\nWatermelon');
    });
    return getFruits().then(data => {
      expect(data).toStrictEqual([ 'Apple', 'Mango', 'Stawberry', 'Pineapple', 'Orange', 'Watermelon' ]);
    });
  });
  test('should not return any other array', () => {
    jest.spyOn(fs,'readFile').mockImplementation((path,encoding,callback) => {
      callback(null,'Apple\nMango\nStawberry\nPineapple\nOrange\nWatermelon');
    });
    return getFruits().then(data => {
      expect(data).not.toStrictEqual([ 'Mango', 'Apple', 'Stawberry', 'Pineapple', 'Orange', 'Watermelon' ]);
    });
  });
});