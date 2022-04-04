/* 
150. Evaluate Reverse Polish Notation
https://leetcode.com/problems/evaluate-reverse-polish-notation/
*/

/**
 * @param {string[]} tokens
 * @return {number}
 */
var evalRPN = function (tokens) {
  let stack = [];
  let operators = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "*": (a, b) => a * b,
    "/": (a, b) => (a / b >= 0 ? Math.floor(a / b) : Math.ceil(a / b)),
  };
  for (let i = 0; i < tokens.length; i++) {
    let current = tokens[i];
    if (!operators[current]) {
      stack.push(Number(current)); // convert str to numbers
      //stack.push(current)
    } else {
      let top1 = stack.pop();
      let top2 = stack.pop();
      //let result = `${top1} ${operators[current]} ${top2}`
      stack.push(operators[current](top2, top1));
    }
  }
  return stack[0];
};

/*
["2","1","+","3","*"]
((2 + 1) * 3) = 9

["4","13","5","/","+"]
(4 + (13 / 5)) = 6

["10","6","9","3","+","-11","*","/","*","17","+","5","+"]
((10 * (6 / ((9 + 3) * -11))) + 17) + 5

stack push pop
["4","13","5","/","+"]    [4,13,5]
 i       i      i
13 /5 = 2.6 ->  push 2,    [4, 2]  Math.floor
["4","13","5","/","+"]    [4, 2]
 i       i      i      o    o
4+2 = 6
*/

/* 
Time: O( n )
• n is the length of the given string
• We traverse entire the string
	◦ only doing two removals that cost O(1) time

Space: O( n )
• n is the length of the given string
• in the worst case the string will have all the numbers of the string on the stack
	◦ However the total amount of numbers in the stack is never more than the length of the given string
		‣ for every operator we must have 2 numbers
*/

/* 
no edge cases

But you must address that division between two integers should truncate toward zero.
• a / b >= 0 then Math.floor(a / b)  push down towards 0
• a / b < 0 then Math.ceil(a / b)   push up towards 0

Remember when pushing numbers to stack that you must only push in numbers in order to get the arithmetic correct because our final result is a number not a character
• '1' + '2' = 12 wrong
• 1 + 2 = 3   correct

How to do an operation when you reach one?
• hash tables can store functions 
• key(operator) : value( function doing that operation )
	◦ '+' : (a, b) => a + b,
	◦ '-': (a, b) =>  a - b,
	◦ '*' : (a, b) => a * b,
	◦ '/' : (a, b) => a / b >= 0 ? Math.floor(a / b) : Math.ceil(a / b)

Steps:
• create operators hash table
	◦ key(operator) : value( function doing that operation)
• traverse the string
	◦ add only characters that are not in the operators hash table
		‣ turn these characters into numbers using Number( character ) 
		‣ push number value to stack
	◦ when you reach an operator pop the top two elements in the stack and do the current operation on them
		‣ stack.push(operators[current](top2, top1))
			• operators[current] returns a function that takes a and b
• once out of the for loop the stack only has the final result of the reverse polish notation
	◦ return stack[0]
*/
