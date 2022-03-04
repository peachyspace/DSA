/* 
13. Roman to Integer
https://leetcode.com/problems/roman-to-integer/
*/
/**
 * @param {string} s
 * @return {number}
 */
const romanToInt = function (s) {
  let table = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };
  if (s.length === 1) {
    return table[s[0]];
  }
  let number = 0;
  for (let i = 0; i < s.length; i++) {
    let left = s[i];
    let right = s[i + 1];
    if (table[left] < table[right] && i + 1 < s.length) {
      //within the bounds of string
      number -= table[left];
    } else {
      //last roman numeral is always added since nothing is positioned in its right side
      number += table[left];
    }
  }
  return number;
};

//given a roman numeral
//return the number value

//"III"
//3

//"LVIII"
//58

//MCMXCIV
//1994

/*
Time: O(1)
• We iterated through the every character in the string once
• There is a finite set of roman numerals (max numbers is 3999)
• However we don't take that into consideration the the time complexity is O(n)
Space: O(1)
• The amount of entries in the hash table will always be 7
*/

/*
Normally: left to right in largest to smallest order
Edge Case:  a small number comes before a large number 
• you are basically subtracting the small# from the large#
• so the smaller# is a negative number that is added to the sum

Pseudo code
• largest to smallest  : add them up
• small before large: subtract smaller
• last roman numeral is always added because nothing is postponed in its right side
*/
