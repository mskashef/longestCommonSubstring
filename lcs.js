(function (exports) {
  'use strict';
  exports.lcs = (function () {
    
    /**
     * @private
     * @param {string} str string to shift
     * @return {string} The String after shift (apple --shift--> eappl)
     */
    function circularShift(str) {
      return str[str.length - 1] + str.slice(0, str.length - 1);
    }

    /**
     * This function returns the longest coincident char sequence of two strings.
     * 
     * Complexity: O (|shortString|)
     * 
     * @private
     * @param {string} shortString The shorter string (No difference if strings have equal length)
     * @param {string} longString The longer string (No difference if strings have equal length)
     * @param {number} numberOfShifts The number of shifts of the long string
     * @returns {string} The longest coincident char sequence of two strings.
     */
    function lscOfThisRound(shortString, longString, numberOfShifts) {
      let str = '', maxStr = '';
      for (let i = 0; i < shortString.length; i++) {
        if (shortString[i] === longString[i]) {
          if (i === numberOfShifts) { // if is end of the short string
            str = shortString[i];
          } else {
            str += shortString[i];
          }
        } else {
          str = '';
        }
        if (str.length > maxStr.length) {
          maxStr = str;
        }
      }
      return maxStr;
    }

    /**
     * This function returns the LCS of two strings.
     * 
     * Complexity: O(MN) 
     * [M: |str1|, N: |str2|]
     * 
     * @private
     * @param {string} str1 First string
     * @param {string} str2 Second string
     * @returns {string} The LCS of two strings.
     */
    function getLCS(str1, str2) {
      let shortString = str2, longString = str1;
      let maxLCSLength = 0, numberOfShifts = 0, returnLCS = '';

      if (str1.length <= str2.length) {
        shortString = str1;
        longString = str2;
      }
      
      for (let i = 0; i < longString.length; i++) {
        const lcs = lscOfThisRound(shortString, longString, numberOfShifts);
        if (lcs.length > maxLCSLength) {
          maxLCSLength = lcs.length;
          returnLCS = lcs;
        }
        longString = circularShift(longString);
        numberOfShifts++;
      }

      return returnLCS;
    }

    /**
     * Algorithm from dynamic programming. It finds the longest
     * common substring of two strings.
     * For example for strings 'The Cooling System' and 'Cool water',
     * the longest common substring is 'Cool'.
     * 
     * @example
     * var {lcs} = require('path-to-lcs/' + 'lcs');
     * console.log(lcs('apple', 'purple')); // 'ple'
     *
     * @public
     * @module searching/lcs
     * @param {String} first input string.
     * @param {String} second input string.
     * @return {Array} Longest common substring.
     */
    return function (first, second) {
      return getLCS(first, second);
    };
  })();

})(typeof window === 'undefined' ? module.exports : window);