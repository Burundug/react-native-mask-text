"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _constants = require("./constants");

var _addPlaceholder = _interopRequireDefault(require("./addPlaceholder"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * function toPattern
 * @param {number | string} value
 * @param {string | OptionPattern} optionPattern
 * @returns {string}
 */
function toPattern(value, optionPattern) {
  const pattern = typeof optionPattern === 'object' ? optionPattern.pattern : optionPattern;
  const patternChars = pattern.replace('#', '');
  const output = pattern.split('');
  const values = value.toString().replace('#', '');
  const charsValues = values.replace('#', '');
  const placeholder = typeof optionPattern === 'object' ? optionPattern.placeholder : undefined;
  let charCounter = 0;
  let index;
  const outputLength = output.length;

  for (index = 0; index < outputLength; index++) {
    console.log(values[charCounter]); // Reached the end of input

    if (charCounter >= values.length) {
      if (patternChars.length === charsValues.length) {
        return output.join('');
      }

      if (placeholder !== undefined && patternChars.length > charsValues.length) {
        return (0, _addPlaceholder.default)(output, index, placeholder).join('');
      }

      break;
    } else if (output[index] === _constants.DIGIT && values[charCounter].match(/[0-9]/) || output[index] === _constants.ALPHA && values[charCounter].match(/[a-zA-Z]/) || output[index] === _constants.ALPHANUM && values[charCounter].match(/[0-9a-zA-Z]/) || output[index] === _constants.HOURS && values[charCounter].match(/[0-23]/) || output[index] === _constants.MINUTES && values[charCounter].match(/[0-59]/) || output[index] === _constants.SECONDS && values[charCounter].match(/[0-59]/)) {
      output[index] = values[charCounter++];
    } else if (output[index] === _constants.DIGIT || output[index] === _constants.ALPHA || output[index] === _constants.ALPHANUM || output[index] === _constants.HOURS || output[index] === _constants.MINUTES || output[index] === _constants.SECONDS) {
      if (placeholder !== undefined) {
        return (0, _addPlaceholder.default)(output, index, placeholder).join('');
      }

      return output.slice(0, index).join(''); // exact match for a non-magic character
    } else if (output[index] === values[charCounter]) {
      charCounter++;
    }
  }

  return output.join('').substr(0, index);
}

var _default = toPattern;
exports.default = _default;
//# sourceMappingURL=toPattern.js.map