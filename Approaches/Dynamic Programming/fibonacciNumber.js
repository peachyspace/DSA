/* 
509. Fibonacci Number
https://leetcode.com/problems/fibonacci-number/
*/

/**
 * @param {number} n
 * @return {number}
 */
//DP (tabulation | bottom down)
const fibTable = function (n) {
  let array = [0, 1];
  for (let i = 2; i <= n; i++) {
    array[i] = array[i - 1] + array[i - 2]; //sum of two past numbers
  }
  return array[n];
};
/*
Time Complexity of Tabulation: O(n)
• We iterate roughly from 3 to n which we can round up to just n

Space Complexity: O(n)
• The size of the data structure(array) proportional to 'n'
• Although memoization also uses O(n) space, we don't run into the issue of not having enough  physical memory to handle the increasingly growing stack
	◦ This is called stack overflow error
*/
/*
Instead of breaking down the input(n) to it's base case, we instead start at the base case  and go up until we reach the input(n).
*/
//DP (memoization | top down)
const fibMemo = function (n, hashTable = {}) {
  if (hashTable[n] !== undefined) {
    return hashTable[n];
  }
  if (n === 0 || n === 1) {
    return n;
  }
  let result = fibMemo(n - 1, hashTable) + fibMemo(n - 2, hashTable);
  hashTable[n] = result;
  return result;
};
/*
O(n) time 
• The amount of recursive calls on the recursive tree is at most n since any repeated calls will be looked up and thats an O(1) operation for both arrays and hash tables
O(n) space:
• The size of the data structure is proportional to 'n'
• The size of stack memory is also O(n)
• If there are to many recursive calls then we can run out of physical memory to handle the increasingly growing call stack
*/
/*
Break down the input to the base case, then after that 
• you can start adding the input and it's fibonacci number as key value pairs in the hash table
OR
• you can use the input as the index of the input's fibonacci number in an array
*/

//Just recursion
var fib = function (n) {
  if (n === 0 || n === 1) {
    return n;
  }

  return fib(n - 1) + fib(n - 2);
};
/*
Time Complexity O(2 ^n)
• O( 2^n) this is very slow 
	◦ O(n!) is the worst but this is bad 
	◦ Worse than O(n ^2)
	◦ In this function we make two recursive calls
		‣ Every time the function is called we are calling the function 2 more times
		‣ We are making two function calls for n times

Space: O(n)
• The max amount of function calls on the call stack at any given time is 'n'
	◦ When we hit the base case we start popping of function calls of the call stack
	◦ stack can be an array/linked-list or the call stack
*/

//F(2) = F(1) + F(0) = 1 + 0 = 1.
//      sum of 2 prev nums

//F(3) = F(2) + F(1) = 1 + 1 = 2.
//       sum of 2 prev nums

// 2: fib(2-1) + fib(2-2) -> fib(1) + fib(0) -> 1 + 0 = 1
