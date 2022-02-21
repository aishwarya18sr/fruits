const fs = require('fs');

const getFruits = () => {
  return new Promise(function (fulfill, reject) {
    fs.readFile('./fruits.txt','utf-8' , (err, result) => {
      if (err) {
        console.error(err);
        reject(err.message);
      }
      result = result.replace(/(\r)/g, '');
      const fruits = result.split('\n');
      fulfill(fruits);
    });});
};

module.exports = getFruits;