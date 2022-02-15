/* 
3. Longest Substring Without Repeating Characters
https://leetcode.com/problems/longest-substring-without-repeating-characters/
 */

const lengthOfLongestSubstring = function (s) {
  let charSet = new Set();
  let left = 0;
  let longest = 0;
  for (let right = 0; right < s.length; right++) {
    let currChar = s[right];
    while (charSet.has(currChar)) {
      //takes out repeating char
      charSet.delete(s[left]);
      left++;
    }
    charSet.add(currChar); // add once we make sure that currChar is not in the set
    longest = Math.max(longest, right - left + 1);
  }
  return longest;
};
/**
Time Complexity: O(2n) ->  O(n)
    • For loop iterates through string once O(n)
    • While loop iterates through string once O(n)
        * Only runs when currChar is in the table
        * Doesnt iterate through the whole string during each iteration
        * Iterates from start index to i index
        
Space Complexity: O(n)
    •"n" represents the size of the set
        *potentially all the characters can be unique and thus we can have "n" elements in the set
        *the characters don't just includes a-z lowercase 
 */

//Iterate through the string
//  The while loop will only be excuted when the currChar is in the set.
//      •If true then in each of the while loops iteration
//          * decrement s[left] value in the table
//          * increment left by one
//          - allows us to find the repeating char in the substring
//  During each iteration :
//   We will add the currChar to the set
//  Update longest and compare longest to i - start + 1
//      *length of current substr = i -start + 1

//Why i - start + 1?
//"pcapjklmotckx"
//    ^       ^
//    3       11
//       ^    ^
//       6    11    11-6 = 5(wrong length) ->  11- 6 + 1 =6
//"lmotck"  length of 6
//1 2 3 4 5 6 7 8 9 10 11
//1 2 3 4 5 6 |____5____|
//excluedes 6 from the length
//subtracting excludes the number you are decreasing by.
//When finding length we want to include the number we
//are decreasing by.
