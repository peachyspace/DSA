/* 
20. Valid Parentheses
https://leetcode.com/problems/valid-parentheses/
*/

const isValid = function (s) {
  if (s.length % 2 !== 0) {
    //Each of the parentheses must be part of a pair
    return false;
  }
  let dict = {
    "}": "{",
    ")": "(",
    "]": "[",
  };
  let stack = [];
  for (let i = 0; i < s.length; i++) {
    let currChar = s[i];
    let topStack = stack[stack.length - 1];
    if (!(currChar in dict)) {
      //push in only open parentheses
      stack.push(currChar);
    } else if (currChar in dict) {
      //looking for closed parentheses
      if (topStack === dict[currChar]) {
        //checking to see if currChar is the corresponding closed parentheses of topStack
        stack.pop();
      } else {
        return false;
      }
    }
  }
  return stack.length === 0;
};
/* 
 Time Complexity: O(n)
    • Iterating through every character in the given string
    • .push(currChar) -> O(1) time
    • .pop() -> O(1) time
 Space Complexity: O(n)
    • At the worst case we will create a stack that is of length "n" if there is only one type of closed or open parentthesis
        * '(((((((((('
        * '}}}}}}}}}}'
*/

//Rules Of Stack :
//push only open parenthesis to stack
//pop last open parentheses when corresponding closing parenthesis appears

//  if(!(currChar in dict))  -> if(!(closedParanthesis))-> false  OR if(!(openParenthesis))-> true
//!(true) -> false  OR !false -> true
//currChar in dict is only true if we encounter closed parenthesis
