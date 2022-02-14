/* 
242. Valid Anagram
Given two strings s and t, return true if t is an anagram of s, and false otherwise.

An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once. 

Example 1:
Input: s = "anagram", t = "nagaram"
Output: true

Example 2: 
Input: s = "rat", t = "car"
Output: false

https://leetcode.com/problems/valid-anagram/
*/

const isAnagram = function (s, t) {
  if (s.length !== t.length) {
    return false;
  }
  let anagramTable = {};

  for (let i = 0; i < s.length; i++) {
    let currChar = s[i];
    if (!anagramTable[currChar]) {
      anagramTable[currChar] = 0;
    }
    anagramTable[currChar]++;
  }
  for (let j = 0; j < t.length; j++) {
    let currChar2 = t[j];
    if (!anagramTable[currChar2]) {
      //if value of key is zero then we are about to go to -1
      return false;
    }
    anagramTable[currChar2]--;
  }

  return true;
};
/* 
Time complexity: O(n)
•If s.length !== t.length then we promptly return false. Therefore can say that the runtime is O(2s) -> O(2n) -> O(n).
   * s.length === t.length 
        -This allows to say that s.length + t.length = 2s.length 
   * We are iteterating through every character in 2s, thus indicationg linear time.
   * n represents s 
   * 2n -> n (drop constants)

Space Complexity: 0(26) -> O(1)
•The hashTable could only have at most 26 entries
*/

/* 
Notes:
•If the final key-value pair of char is "a" is "a":0  then strS and strS both have the same amount of "a"'s
• anagramTable must have only value of zero by time we finish iterating through the second for loop
    *If this is not the case, then strT is not anagram of strS
•if (!anagramTable[currChar2]) returns false if:
    * currChar2 doesn't exist in anagramTable
    * currChar2 value in the anagramTable is about to be decremented to -1
*/
