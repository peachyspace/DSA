/* 
680. Valid Palindrome II
https://leetcode.com/problems/valid-palindrome-ii/
 */

/**
 * @param {string} s
 * @return {boolean}
 */
const validPalindrome = function (s) {
  let left = 0;
  let right = s.length - 1;
  while (left < right) {
    if (s[left] !== s[right]) {
      return isPal(left + 1, right, s) || isPal(left, right - 1, s);
    }
    left++;
    right--;
  }
  return true;
};

const isPal = function (left, right, s) {
  while (left < right) {
    if (s[left] !== s[right]) {
      return false;
    }
    left++;
    right--;
  }
  return true;
};
/*
Time: O(n)
• iterate through the whole string once if no character is taken out
• if one character has to be taken out then we iterate part of the string once and the remainder of the string twice. This will happen even when the input's size grows.

Space O(1)
• only pointers were used and they take up constant space
*/

/*
Using two pointers iterate through the string
• When the pointers don't match call a helper function to see if the string is palindrome when we take out one character
	◦ if we take out left
		‣ pass left+1 , right, string
	◦ if we take out right
		‣ pass left, right-1, string
	◦ if either is true then return true
	◦ if both are false then return false
when we get out of the while loop return true since the string is a valid palindrome

isPal(left, right, string)
• Iterate while l is less than right
	◦ if left and right don't match then return false
• return true
*/

//can delete at most 1 character
//- delete no char
//-delete one char
//"aba"
// ^ ^    odd length  and so loop end when l==r

//helper function
//"abca"
// ^  ^  if you take out b or the string is still palindrome
//"abc"
// ^ ^   if you take out a or c the string is not palindrome
