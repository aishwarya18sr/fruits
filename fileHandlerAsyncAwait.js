const fs = require('fs');

function readFileFruits() {
  return new Promise(function (fulfill, reject) {
    fs.readFile('./fruits.txt','utf-8' , (err, result) => {
      if (err) {
        reject(err.message);
      }
      fulfill(result);
    });
  });
}

async function getFruits() {
  let result = await readFileFruits();
  result = result.replace(/(\r)/g, '');
  const fruits = result.split('\n');
  return Promise.resolve(fruits);
}

getFruits();

module.exports = {
  getFruits,
  readFileFruits
};