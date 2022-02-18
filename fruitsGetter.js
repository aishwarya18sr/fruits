require('es6-promise');

const fs = require('fs');

const fsPromises = require('fs').promises;

const getFruits = () => {
  return fsPromises.readFile('./fruits.txt','utf-8')
  .then(function(result) {
    result = result.replace(/(\r)/g, "");
    const fruits = result.split("\n");
    return Promise.resolve(fruits);
  })
  .catch(function(error) {
    console.log(error);
  })
};

module.exports = getFruits;