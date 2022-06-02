/* 
91. Decode Ways
https://leetcode.com/problems/decode-ways/
*/

/**
 * @param {string} s
 * @return {number}
 */

const numDecodings = function (s) {
  if (s[0] === 0) return 0;
  const table = Array(s.length + 1).fill(0);
  table[0] = 1;
  table[1] = s[0] !== "0" ? 1 : 0;

  for (let i = 2; i <= s.length; i++) {
    let oneDigit = Number(s[i - 1]);
    if (oneDigit !== 0) table[i] += table[i - 1];
    //substirng method takes O(n) time
    //'n' is the length of the substring
    //in this case the substring always has a length of 2
    //O(n) -> O(2) -> O(1)
    let twoDigit = Number(s.substring(i - 2, i));
    if (10 <= twoDigit && twoDigit <= 26) table[i] += table[i - 2];
  }

  return table[s.length];
};

/*
Time: O(n) + O(2) -> O(n) 'n', is the length of the given string
- We iterated for the length of the string
- when we created a substring that took O(2) time since this method iterates through the string twice inorder to create a substring of length 2

Space:  O(n)
- Created a table of length n 
*/

/*
one digit !== 0 because 10 can be interpertd as 01 and 01 !== 1
10 >= two digit <= 26 because 'A' === 1, 'B' === 2.... 'Z' === 26
- no uppercase character can be decoded to a negative #
- no uppercase character can be decoded to a number GREATER than 26

table[0] = 1 because an empty string can only be decoded as an empty string.

table[1] = s[0] !== '0' ? 1 : 0 because if a substring has a length of 1 and is a '0' then there is no way to decode it since leading zeros are can't be decoded. '06' !== '6'

total ways to decode a string of length 2 = depends on total ways the last two substrinsg were decoded 
- table[0] + table[1]  = 1+1 =2
- 12: '12'  and  '21'

s = '226'
___________________________________________________________
length 0 |  length 1  |  length 2  |       length 3
    1          1         2                     3
    ''        '2'      '2 2' '22'     '2 26' '22 6' '226'
___________________________________________________________



*/
