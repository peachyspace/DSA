/* 
647. Palindromic Substrings
https://leetcode.com/problems/palindromic-substrings/
*/

/**
 * @param {string} s
 * @return {number}
 */
const countSubstrings = function (s) {
  let totalPal = 0;
  for (let i = 0; i < s.length; i++) {
    totalPal += expandFromMid(i, i, s);
    totalPal += expandFromMid(i, i + 1, s);
  }
  return totalPal;
};

const expandFromMid = (left, right, s) => {
  let count = 0;
  while (left >= 0 && right < s.length && s[left] === s[right]) {
    count++;
    left--;
    right++;
  }
  return count;
};

/*
Time: O(n * 2n) -> O(n * n) -> O(n^2)
- iterating through every character in the string
    - we call expandFromMid twice during each iteration: O(2n)

Space:O(1)
- we used pointers and variables that doesn't take up more space as the input grows
    
*/

/*
totalPal = 0
iterate through the string and at each charcter
- call a function that expand from the middle for ODD and EVEN substrings
-add the returned values of these two function calls to the totalPal
return totalPal

expandFromMiddle
- count =0
-left and right are passed down
- expand from the middle of substring and make sure left and right pointer hold the same char
    -increment count
    -decrement left
    -increment right
return count
*/
