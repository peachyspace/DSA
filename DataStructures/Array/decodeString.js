/* 
394. Decode String
https://leetcode.com/problems/decode-string/
*/

/**
 * @param {string} s
 * @return {string}
 */
var decodeString = function (s) {
  let stack = [];

  for (let i = 0; i < s.length; i++) {
    let current = s[i];
    if (current !== "]") {
      stack.push(current);
    } else {
      let substring = "";
      while (stack[stack.length - 1] !== "[") {
        //prevent '[' from being added to substring
        substring = stack.pop() + substring;
      }
      stack.pop(); //take out the open bracket that is left in the stac
      let k = "";
      while (
        stack.length &&
        48 <= stack[stack.length - 1].charCodeAt() &&
        stack[stack.length - 1].charCodeAt() <= 57
      ) {
        k = stack.pop() + k;
      }
      let decodeSub = "";
      for (let j = 0; j < Number(k); j++) {
        decodeSub += substring;
      }
      stack.push(decodeSub);
    }
  }
  return stack.join("");
};

/*
When you have nested parenthesis, its good to use a stack
• add the characters and opening bracket to the stack
	◦ when we add a an opening bracket, we know are entering a subproblem
• when we find a closing bracket, we are going to associate with the most recent opening bracket
	◦ pop off characters from the stack until you reach most recent opening bracket. All popped of chars will be added to a variable called substring. Don not add ' [ ' to substring
	◦ After that  the  element at the top of the stack will be a number and we proceed to pop off the stack as log as the element is a number  
		‣ add the numbers to string k
	◦ we add the characters  for 'k' times to the stack 
Note: In the two while loops were always  checking if the last element of the stack is a letter or a number
*/
/*
Time: O((maxK ^countK)   * n)
• 'maxK' is the max amount of times we repeat a substring
• count k is the amount of nested k values
	◦ there are two nested k values (20[a10[bc]])  and the value of each of those nested k values is maxK
• 'n' is the max length of an encoded string 
	◦ 20[a10[bc]]  'n' = 2 (bc)


Space: O(sum(maxK^countK) * n )
*/
