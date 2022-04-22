/* 
5. Longest Palindromic Substring
https://leetcode.com/problems/longest-palindromic-substring/
*/
//time exceeded: Arrays
const longestPalindrome1 = function (s) {
  if (s.length === 1) return s;
  const array = s.split("");
  let maxPal = [s[0]];
  for (let i = 0; i < array.length; i++) {
    let subArray = [array[i]];
    for (let j = i + 1; j < array.length; j++) {
      subArray.push(array[j]);
      if (isPal1(subArray)) {
        let copy = subArray.map((x) => x);
        maxPal = copy.length > maxPal.length ? copy : maxPal;
      }
    }
  }
  return maxPal.join("");
};

const isPal1 = function (array) {
  let left = 0;
  let right = array.length - 1;

  while (left < right) {
    if (array[left] !== array[right]) return false;
    left++;
    right--;
  }
  return true;
};

//Time exceeded with substring method
const longestPalindrome2 = function (s) {
  if (s.length === 1) return s;
  let maxPal = "";
  for (let i = 0; i < s.length; i++) {
    for (let j = 1; j <= s.length; j++) {
      let subStr = s.substring(i, j);
      if (isPal(s.substring(i, j))) {
        maxPal = subStr.length > maxPal.length ? subStr : maxPal;
      }
    }
  }
  return maxPal;
  //string.substring(start, exclude)
};
/* 
Time: O(n) * O(n) * O(n) -> O(n^3)
• n is the length of the given string
• iterate through each character: O(n) 
	◦ for each character see if creates a Palindrome with the rest of Array:O(n) 
Space: O(n)
• maxPal.length can be at worst case the length of the given string
*/

/* 
Brute force:
longestPalindrome
• let array = split  string 
• let maxPal = [s[0]] // if we only  have two characters then the 1st char is the longest Pal
• outer: for each character in the array 
	◦ let subArray = [s[i]] --> allows us to build potential pal out of this char
	◦  inner: iterate the rest of the array to in order to find the longest palindrome
		‣ call isPal on subarray
		‣ create a copy of subarray
			• Array assignment creates a reference not a copy: any changes applied to subArray will affect any variable that is assigned to subArray
				◦ when maxPal is assigned to subarray then in the next iteration when we :
					‣ add a character to subarray we also add the character to maxPal
		‣ if true then assign  maxPal to longest substring, which is either maxPal or copyOfSubArray
• return maxPal.join("")

isPal
• let left = 0
• let right = s.length-1
• iterate while left < right: oddPal: only middle letter not checked, evenPal: all checked
	◦ if the left pointer !== right pointer then return false
• return true since you completed traversing the given string
*/

const isPal = function (array) {
  let left = 0;
  let right = array.length - 1;

  while (left < right) {
    if (array[left] !== array[right]) return false;
    left++;
    right--;
  }
  return true;
};
/* 
Time: O(n) * O(n^2) -> O(n^3)
• n is the length of the given string
• iterate through each character: O(n) 
	◦ for each character see if creates a Palindrome with the rest of string:O(n) * (O(n) + O(n)) -> O(n) * O(2n) -> O(n) * O(n) -> O(n^2)
	◦ use the strings substring method: O(n)
	◦ use isPal function which can potentially iterate through the given string:O(n)

Space: O(n)
• maxPal.length can be at worst case the length of the given string
*/

//DP approach
// 2D DP
const longestPalindrome3 = function (s) {
  //Create 2D array
  const dp = [...new Array(s.length)].map((x) =>
    new Array(s.length).fill(false)
  );
  let lps = "";
  // base case for one character
  for (let i = 0; i < s.length; i++) {
    dp[i][i] = true;
    lps = s[i];
  }
  // base case for two characters
  for (let i = 0; i < s.length; i++) {
    if (s[i] === s[i + 1]) {
      dp[i][i + 1] = true;
      lps = s.substring(i, i + 2); //start, exclude
    }
  }
  // expand to three or more characters
  for (let i = s.length - 1; i >= 0; i--) {
    for (let j = i + 2; j < s.length; j++) {
      dp[i][j] = s[i] === s[j] && dp[i + 1][j - 1];
      if (dp[i][j]) {
        lps = lps.length < j - i + 1 ? s.substring(i, j + 1) : lps;
      }
    }
  }
  return lps;
};

/* 
Time: O(n^2) + O(n^2) + O(2n) -> O(n^2)
• n is the length of the given string(s)
• Creating the dp table takes O(n^2)
• the for loops take O(2n) in total 
• the nested for loop takes O(n^2)

Space:O(n^2) + O(n) -> O(n^2)
• The dp table takes O(n^2) space
• the lps substring can be at most s.length
*/

/* 
Here's an example of dp with "babad" after two base cases
Disregard the last column bc we dont need it !!!!!!
┌─────────┬───────┬───────┬───────┬───────┬───────┬───────┐
│ (index) │   0   │   1   │   2   │   3   │   4   │   5   │
├─────────┼───────┼───────┼───────┼───────┼───────┼───────┤
│    0    │ true  │ false │ false │ false │ false │ false │
│    1    │ false │ true  │ false │ false │ false │ false │
│    2    │ false │ false │ true  │ false │ false │ false │
│    3    │ false │ false │ false │ true  │ false │ false │
│    4    │ false │ false │ false │ false │ true  │ false │
│    5    │ false │ false │ false │ false │ false │ false │
└─────────┴───────┴───────┴───────┴───────┴───────┴───────┘
https://leetcode.com/problems/longest-palindromic-substring/discuss/428331/Javascript-DP
*/

/* 
DP Steps: 
• n is the length of the given string
• create a 2D table of n*n dimension: O(n) *O(n) -> O(n^2)
	◦ [...new Array(s.length)].map(x => new Array(s.length).fill(false)
		‣ [...new Array(s.length)]: create then spread in order to not have an empty array
	◦ for each element in the newly created array put an array filled with false in it
• let lps represent longest palindrome substring and hold an empty string
• base case for one character
	◦ iterate through the given string 
		‣ coordinates representing one character in the given string (start === end) will be set to true on the dp table.
			• dp[i][i] =true
		‣ lps = s[i]
			• address the edge case: given string is only 1 character
• base case for two characters
	◦ iterate through the given string
		‣ coordinates rep. two adjacent characters that are identical are set to true on the dp table 
			• lps = s.substring(i, i + 2)     string.substring(start, exclude)
				◦ address the edge case: given string is only 2 characters
• Expand to three or more characters 
	◦ During each iteration we try to expand our window to fit 3 or more characters as long the window is within the given  string 
		‣ start of window: Outer loop(i) iterates starting from the end of the string 
		‣ end of window: Inner loop iterates starting from i+2 (3 chars. in window) only if the window is within the the string
	◦ if the char.  to the left of i and the char to the right of j are true in the dp table AND the chars. at i and j are identical then set dp[i][j] to true
		‣ lps will either remain the same or will be updated to the substring created by i and j (if bigger than lps)
• return lps
*/
