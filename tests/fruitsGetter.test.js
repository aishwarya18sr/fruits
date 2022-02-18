const getFruits = require('../fruitsGetter.js');

describe('getFruits', function() {
  test('should return the fruits array', () => {
    return getFruits().then(data => {
      expect(data).toStrictEqual([ 'Apple', 'Mango', 'Stawberry', 'Pineapple', 'Orange', 'Watermelon' ]);
    });
  });
  test('should not return any other array', () => {
    return getFruits().then(data => {
      expect(data).not.toStrictEqual([ 'Mango', 'Apple', 'Stawberry', 'Pineapple', 'Orange', 'Watermelon' ]);
    });
  });
});