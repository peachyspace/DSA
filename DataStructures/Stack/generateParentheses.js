/* 
22. Generate Parentheses
https://leetcode.com/problems/generate-parentheses/
*/

/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function (n) {
  //only add open parenthesis if open < n
  //only add closed parenthesis if closed < open
  //valid parenthesis order if open === closed === n
  //or stack.length === 2 * n
  let stack = []; //stack is a global variable
  let result = [];
  const backtrack = (openNum, closedNum) => {
    if (openNum === closedNum && closedNum === n) {
      //at this point we have all 'n' parenthesis pairs in the stack and so we push
      return result.push(stack.join(""));
    }
    if (openNum < n) {
      stack.push("(");
      backtrack(openNum + 1, closedNum);
      stack.pop();
      //stacks value is preserved because it's a global variable
      // • this why we have to manually take out the element we just added to the stack
    }
    if (closedNum < openNum) {
      stack.push(")");
      backtrack(openNum, closedNum + 1);
      stack.pop();
      //stacks value is preserved because it's a global variable
      // • this why we have to manually take out the element we just added to the stack
    }
  };
  backtrack(0, 0);
  return result;
};
/*

Time
• too complex for coding interviews
• they would not expect precise answer

Space: (O(2n) -> O(n)
• n is the number of parenthesis pairs
• the call stack would have at most n*2 stack frames since the stack array can only have n*2
   ◦ multiply b 2 because we have pairs

*/
/*
We have to exhaust all the valid possible ways to order the 'n' parenthesis pairs. This requires us to make a many decisions
• recursion will allows to narrow down these decisions  to just two decisions at each stack frame of our call stack
   ◦ add a open parenthesis
   ◦ add a closed parenthesis

We don't want to just find one way to order the 'n' parenthesis pairs and so once we reach a valid 'n'  parenthesis pairs order we must look to find the rest of ways the we can order the 'n' parenthesis pairs. This can be achieved by backtracking
• backtracking allows us to go back to a stack frame where we can create a diff way to order the parenthesis 
   ◦ we repeat this until we have found ALL the ways to order the parenthesis pairs 
   ◦ Why use a stack array to store a parentheses pair order ?
       ‣ when we backtrack to a stack frame where we can create new variation of the parenthesis pairs we have to remove the recently added parenthesis in that stack frame
           • this allows us to reach our desired stack frame while having the correct amount of open and closed parenthesis in the stack array for that stack frame
           • we have access to the most recently added parenthesis by using a stack since we always have constant time access to the top element of the stack
*/
