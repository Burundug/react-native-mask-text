import { DIGIT, ALPHA, ALPHANUM } from './constants';
/**
 * function addPlaceholder
 * @param {string[]} output
 * @param {number} index
 * @param {string} placeholder
 * @returns {string[]}
 */

function addPlaceholder(output, index, placeholder) {
  for (let newIndex = index; newIndex < output.length; newIndex++) {
    if (output[newIndex] === DIGIT || output[newIndex] === ALPHA || output[newIndex] === ALPHANUM) {
      // eslint-disable-next-line no-param-reassign
      output[newIndex] = placeholder;
    }
  }

  return output;
}

export default addPlaceholder;
//# sourceMappingURL=addPlaceholder.js.map