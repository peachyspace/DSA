/* 
76. Minimum Window Substring
https://leetcode.com/problems/minimum-window-substring/
*/
/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
const minWindow = function (s, t) {
  if (t === "") return "";
  const tCount = {};
  const windowCount = {};
  for (let i = 0; i < t.length; i++) {
    if (!(t[i] in tCount)) tCount[t[i]] = 0;
    tCount[t[i]]++;
  }
  const need = Object.keys(tCount).length;
  let have = 0;
  let start = 0;
  let minLength = Infinity;
  let minIndxs = [0, 0];
  for (let i = 0; i < s.length; i++) {
    let currentChar = s[i];
    if (!(currentChar in windowCount)) windowCount[currentChar] = 0;
    windowCount[currentChar]++;
    if (
      currentChar in tCount &&
      windowCount[currentChar] === tCount[currentChar]
    ) {
      have++;
    }
    //windowCount[currentChar] > tCount[currentChar] do nothing
    //since we already meet the requirement
    while (have === need) {
      if (i - start + 1 < minLength) {
        minLength = i - start + 1;
        minIndxs[0] = start;
        minIndxs[1] = i;
      }
      let firstChar = s[start];
      windowCount[firstChar]--;
      if (firstChar in tCount && windowCount[firstChar] < tCount[firstChar]) {
        //Once windowCount[firstChar] is less than the
        //requirement(tCount[firstChar]) we no longer meet
        //such requirement
        have--;
      }
      //However, when windowCount[firstChar] is greater than
      // the requirement, we know we have already
      //fulfilled the requirement and so we dont touch have
      start++;
    }
  }
  return minLength !== Infinity
    ? s.substring(minIndxs[0], minIndxs[1] + 1)
    : "";
};
/* 
Time: O(t + s) 
• Iterated through t string
• Iterated through the s string
	◦ i pointer(controlled by for loop) traverses the whole s string ONCE and the start pointer COULD traverse the whole s string ONCE
		‣ O(2s) time -> O(s) time
	◦ we validated the window in O(1) time
		‣ used variables and looked up values in hash table

Space: O(t + s) 
• the tCount hash table could potentially have t.length entries if it's characters are all unique  
• The windowCount hash table could potentially have s.length entries if the window  length === s.length  and every character is UNIQUE.
	◦ This means that every character in string s is going to have a hash table mapping
	◦  windowCount hash table would have s.length entries 
	◦ s="xabcydefgz"    t= "xyz" window's length === s.length, and thus windowCount hash table will have s.length entries
• https://www.youtube.com/watch?v=eS6PZLjoaq8
*/

/* 
Main Idea: 
• we know a substring is valid when the have === need
• need = Object.keys(tCount).length
• have will initially be 0 but will be changed when:
	◦ add a char to windowCount 
		‣ char exists in tCount and windowCount[char] === tCount[char]
			• increment have
	◦ remove the char at start from windowCount
		‣ char exists in tCount and windowCount[char] < tCount[char]
			• decrement have
• have will not be changed when windowCount[char] > tCount[char] because windowCount[char] has already fulfilled the requirement(tCount[char]) and is now we are surpassing the requirements 😎
*/

/* 
if t=== "" the return""
countT, windowCount = {}, {}
iterate through t
• add the currChar as a key in tCount
• or update currChar as a key in windowCount
need = t.length
have = 0
start =0
(result)minLength = Infinity
minIndices = Array(2).fill(0)
during each iteration through s:
• currChar in tCount then add 1 in windowCount
• adding the currChar made windowCount[currChar] === tChount[currChar]
	◦ we just meet the requirement and so we increment have value by one
• adding the currChar made windowCount[currChar] > tChount[currChar]
	◦ we already meet the requirement and so we don't increase Have 
	◦ while have === need
		‣ the window has all the character from t string and could potentially be the  substr with min length
		‣ if   i - start +1 < minLen
			• minLen = i - start +1
			• minIndices[0] = start ,  minIndices[1] = i
		‣ windowCount[start]--
		‣ removing the char at start made windowCount[start] < tChount[start]
			• we no longer meet the requirement and so we decrement have value by one
		‣ start++

return minLen !== Infinity ? s.substring(minIndices[0], minIndices[1]+1) : ""
*/
