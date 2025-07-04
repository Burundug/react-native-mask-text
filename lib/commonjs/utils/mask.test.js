"use strict";

var _mask = require("./mask");

test('should mask with number digit pattern', () => {
  const expected = '342.934.480-80';
  const received = (0, _mask.mask)('34293448080', '###.###.###-##');
  expect(received).toBe(expected);
});
test('should mask with alpha pattern', () => {
  const expected = 'react-native';
  const received = (0, _mask.mask)('react native', 'AAAAA-AAAAAA');
  expect(received).toBe(expected);
});
test('should mask with alphanumeric pattern', () => {
  const expected = 'rct-777';
  const received = (0, _mask.mask)('rct 777', 'AAA-999');
  expect(received).toBe(expected);
});
test('should mask with currency mask', () => {
  const expected = '$59.99';
  const received = (0, _mask.mask)('5999', '', 'currency', {
    prefix: '$',
    decimalSeparator: '.',
    groupSeparator: ',',
    precision: 2
  });
  expect(received).toBe(expected);
});
test('should unMask text', () => {
  const expected = '34293448080';
  const received = (0, _mask.unMask)('342.934.480-80');
  expect(received).toBe(expected);
});
test('should unMask currency', () => {
  const expected = '5999';
  const received = (0, _mask.unMask)('$59.99', 'currency');
  expect(received).toBe(expected);
});
//# sourceMappingURL=mask.test.js.map