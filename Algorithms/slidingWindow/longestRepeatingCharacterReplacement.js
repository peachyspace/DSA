/* 
424. Longest Repeating Character Replacement
https://leetcode.com/problems/longest-repeating-character-replacement/

*/
var characterReplacement = function (s, k) {
  let charTable = {};
  let left = 0;
  let mostFreq = 0;
  let maxLength = 0;
  for (let right = 0; right < s.length; right++) {
    let currChar = s[right];
    // if(!(currChar in charTable)){
    //     charTable[currChar]=0
    // }
    // charTable[currChar]++
    charTable[currChar] = charTable[currChar] + 1 || 1; //creates new entry to table or updates
    mostFreq = Math.max(mostFreq, charTable[currChar]); //which char is the most freq in table
    while (right - left + 1 - mostFreq > k) {
      //calc. total amt of replacements
      charTable[s[left]]--; //decreasing currChar's value in table
      left++;
    }
    maxLength = Math.max(maxLength, right - left + 1); //Comparing window size to maxLength
  }
  return maxLength;
};

/**
Time: O(n)
    *For loop iterates through the whole string once
    *While loop iterates through the whole string once at worst case
    
Space: O(26) O(1)
    *The max amount of entries the hashTable can have is 26
        •Only A-Z characters that are only uppercase

 */

// no need to store indices
//just returning Num of length of longest substr that has k replacements
// the replacements can happen anywhere as long it does not exceed k replacements

//create a hashTable, 2 pointers,
//mostFreq(most repeated char in window), maxLength of valid substr
//During each iteration move right pointer:
//  *Create or update the currChar entry in charTable
//  *Calculate mostFreq by comparing mostFreq to frequency of right pointers char
//      •The frequency is related to the window(substr) not the whole string
//  *While the total amt of the replacements is greater than k
//      •Update frequency of left pointers char(decrement by 1)
//      •Move left pointer to the right(increment by 1)
//  *Update maxLength
//      •compare maxLength to the current length of window(substring)
