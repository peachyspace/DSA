/* 
125. Valid Palindrome
https://leetcode.com/problems/valid-palindrome/
*/
const isPalindrome = function (s) {
  let left = 0;
  let right = s.length - 1;
  while (left < right) {
    while (left < right && !isAlphaNum(s.charCodeAt(left))) {
      left++;
    }
    while (left < right && !isAlphaNum(s.charCodeAt(right))) {
      right--;
    }
    if (s[left].toLowerCase() !== s[right].toLowerCase()) {
      return false;
    }
    left++;
    right--;
  }
  return true;
};

const isAlphaNum = function (code) {
  if (
    (code >= 48 && code <= 57) ||
    (code >= 65 && code <= 90) ||
    (code >= 97 && code <= 122)
  ) {
    return true;
  } else {
    return false;
  }
};

/**
Time: O(n)
    *Outer while loop visits each element in str once
    *At worst case Inner (left) while loop visits each element in str once
    *At worst case Inner(right) while loop visits each element in str once 
    
Space: O(1)
    *No extra space is required
 */

//"A man, a plan, a canal: Panama"
//"amanaplanacanalpanama"
//non-alphanumeric are not letters or numbers
//Note: numbers are put inside of string so they have the toLowerCase() method
//Two Pointers
//Use while loop to ignore non-alphanumeric char.
//  *while loop for left pointer
//      -runs as long as left<right and isAlphaNum() returns false
//      -increments left pointer --> ignore non-alphanumeric char.
//  *while loop for right pointer
//      -runs as long as left<right and isAlphaNum() returns false
//      -decrements right pointer --> ignores non-alphanumeric char.
// **At this point your pointers should be holding alphanumeric char.**
//   *check if the alphanumeric char equal to each other when the toLowerCase() is used on both of them
//      - "3".toLowerCase() === "3".toLowerCase() ->"3" ==="3"
//      - "8".toLowerCase() !== "5".toLowerCase() ->"8" !=="5"
//      - If the alphanumeric char are not equal the return false
//    move both pointers so you can continue moving them inward
//return true

//isAlphaNum()
//accepts charCode
//if charCode is within one of the given ranges then charCode of char given is alphanumeric
//  *(code >= 48) && (code<=57)  //numbers
//  *(code >= 65) && (code <= 90) //uppercase
//  *(code >= 97) && (code <= 122)  // lowercase
//else rerun false
