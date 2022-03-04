/* 
14. Longest Common Prefix
https://leetcode.com/problems/longest-common-prefix/
*/

/**
 * @param {string[]} strs
 * @return {string}
 */
const longestCommonPrefix = function (strs) {
  let prefix = "";
  if (strs === null || strs.length === 0) {
    return prefix;
  }

  for (let i = 0; i < strs[0].length; i++) {
    //iterating through the columns(sub)
    let letter = strs[0][i]; //strs[row][column]
    for (let j = 1; j < strs.length; j++) {
      //iterating through the rows(array)
      if (strs[j].length <= i || strs[j][i] !== letter) {
        return prefix;
      }
    }
    prefix = prefix + letter;
  }
  return prefix;
  //strs[j].length >= i  checks if 'i'is has passed the end of the string
  //strings are 0 indexed
};

/*
Time: O(m * n):
• At the worst case iterate all the elements in the array(O(n)) and each of those element are of length m (O(m))
Space: O(1)
• We only used constant space

*/

//[
//"flower",
//"flow",
//"flight"
//]

//[
//"dog",
//"racecar",
//"car"
//]
/*
Create prefix variable
Edge case:
• null is passed
• string is empty

Outer loop iterates through the columns(a subarray)
• set letter to the character at index i
Inner loop iterates through the rows(an array)
• if the length of the current subarray is less than or equal to ' i ' or the letter at  index ' i ' in the current subarray doesn't equal letter
	◦ return the current prefix
Once out of the inner loop add letter to prefix and increment index

Once out of the outer loop return the prefix

Note: In matrix array: # of rows is array.length while # of columns is array[0].length  (subarray)
*/
