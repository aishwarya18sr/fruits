const {getFruits, readFileFruits} = require('../fileHandlerAsyncAwait.js');
const fs = require('fs');

describe('readFileFruits', function() {
  test('should return the fruits string if a proper input is given', () => {
    jest.spyOn(fs,'readFile').mockImplementation((path,encoding,callback) => {
      callback(null,'apple\norange');
    });
    return readFileFruits().then(data => {
      expect(data).toBe('apple\norange');
    });
  });
  test('should return the fruits string if a proper input is given', () => {
    jest.spyOn(fs,'readFile').mockImplementation((path,encoding,callback) => {
      callback(null,'Apple\nMango\nStawberry\nPineapple\nOrange\nWatermelon');
    });
    return readFileFruits().then(data => {
      expect(data).toStrictEqual('Apple\nMango\nStawberry\nPineapple\nOrange\nWatermelon');
    });
  });
  test('should throw an error when file not exists', () => {
    try {
      jest.spyOn(fs,'readFile').mockImplementation((path,encoding,callback) => {
        callback(new Error('file not exists'),'');
      });
    }
    catch (err) {
      expect(err.message).toBe('file not exists');
    }
  });
  test('should throw an error when file has no contents', () => {
    try {
      jest.spyOn(fs,'readFile').mockImplementation((path,encoding,callback) => {
        callback(new Error('empty file'),'');
      });
    }
    catch (err) {
      expect(err.message).toBe('empty file');
    }
  });
});

describe('getFruits', function() {
  test('should return the fruits array if a proper input is given', async () => {
    jest.spyOn(fs,'readFile').mockImplementation((path,encoding,callback) => {
      callback(null,'apple\norange');
    });
    await expect(getFruits()).resolves.toStrictEqual([ 'apple','orange']);
  });
  test('should return the fruits array if a proper input is given', async() => {
    jest.spyOn(fs,'readFile').mockImplementation((path,encoding,callback) => {
      callback(null,'Apple\nMango\nStawberry\nPineapple\nOrange\nWatermelon');
    });
    await expect(getFruits()).resolves.toStrictEqual([ 'Apple', 'Mango', 'Stawberry', 'Pineapple', 'Orange', 'Watermelon' ]);
  });
  test('should not return any other array if a proper input is given', async() => {
    jest.spyOn(fs,'readFile').mockImplementation((path,encoding,callback) => {
      callback(null,'Apple\nMango\nStawberry\nPineapple\nOrange\nWatermelon');
    });
    await expect(getFruits()).resolves.not.toStrictEqual([ 'Mango', 'Apple', 'Stawberry', 'Pineapple', 'Orange', 'Watermelon' ]);
  });
});