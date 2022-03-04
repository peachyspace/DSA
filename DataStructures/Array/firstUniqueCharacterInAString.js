/* 
387. First Unique Character in a String
https://leetcode.com/problems/first-unique-character-in-a-string/
*/
/**
 * @param {string} s
 * @return {number}
 */

const firstUniqChar = function (s) {
  let table = {};
  for (let i = 0; i < s.length; i++) {
    let current = s[i];
    if (!(current in table)) {
      table[current] = 0;
    }
    table[current]++;
  }

  for (let j = 0; j < s.length; j++) {
    if (table[s[j]] === 1) {
      return j;
    }
  }
  return -1;
};

//leetcode
//^
//

//loveleetcode
//l:-1
//

/*
Time: O(n)
• Iterated through the whole string once

Space: O(n)
• Created a hash table that in worst case will have 'n' amount of entries,  if each character in the string is unique
*/
/*
Create a hashtable and update the key by one every time you see a letter. Then iterate the string again and the first character who's key is 1 is the 1st unique char. return 'i'
*/
