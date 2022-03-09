/* 
70. Climbing Stairs
https://leetcode.com/problems/climbing-stairs/
*/

/**
 * @param {number} n
 * @return {number}
 */
//DP: Tabulation(bottom up approach with array)
const climbStairsTable = function (n) {
  let array = new Array(n + 1); //array starts at idx 0
  array[1] = 1;
  array[2] = 2;
  for (let i = 3; i <= n; i++) {
    array[i] = array[i - 1] + array[i - 2];
  }
  return array[n];
};
/*
Time: O(n)
• We iterated for n times

Space: O(n)
• We created an array of size n
*/
/*
dp[n] = dp[n-1] + dp[n-2] because we can either take 1 or 2 steps.
We have two base cases because from position 0 to postion 1 there is only 1 unique path, while to reach position 2 there are two unique paths(1step + 1step OR 2steps)
array[i] represents the total unique ways to reach position i
array[1] rep. the total unique ways to reach position 1 (base case)
array[2] rep. the total unique ways to reach position 2 (base case)

n = 4
         [_,1,2,_,_]
position  0 1 2

array[3] = array[3-1] + array[3-2]
array[3] = array[2] + array[1]
array[3] = 3
           [_,1,2,3,_]
position    0 1 2 3

array[4] = array[4-1] + array[4-2]
array[4] = array[3] + array[2]
array[4] = 5
          [_,1,2,3,5]
position   0 1 2 3 4
*/

//Tabulation(bottom up approach without an array)
const climbStairs = function (n) {
  if (n === 1) {
    return 1;
  }
  let first = 1;
  let second = 2;
  for (let i = 3; i <= n; i++) {
    let third = first + second;
    first = second;
    second = third;
  }
  return second;
};
/*
Time:  O(n)
• We iterated for n times
• In order to calculate the Fibonacci number we looped up to n times once.

Space O(1)
• Only constant space was used and we didn't use an array.
*/
/*
The amount of unique paths that reach the ith position, depends on the amount of unique paths from the  2 prior positions
We have two base cases because from position 0 to position 1 there is only 1 unique path, while to reach position 2 there are two unique paths(1step + 1step OR 2steps)
• third is the total unique paths to reach 'i'th position
• first  becomes second because we want to calculate the total unique paths of the next position(i+1) in the next iteration
• second becomes the third because we want to calculate the unique paths of the next position(i+1) in the next iteration

         _,1,2,_,_ initialized
position 0 1 2
           f s 
         
n = 4
__________________
           _,1,2,_,_ ->  _,1,2,3,_  i = 3
position   0 1 2 3       0 1 2 3
             f s t           f s t 
             
           _,1,2,3,_ ->  _,1,2,3,5  i = 4
position   0 1 2 3       0 1 2 3 4
               f s t           f s t
return second 
*/

//DP: Recursion + Memoization
const climbStairsMemo = function (n, hashTable = {}) {
  if (hashTable[n] !== undefined) {
    return hashTable[n];
  }
  if (n === 1 || n === 2) {
    return n;
  }
  let result =
    climbStairsMemo(n - 1, hashTable) + climbStairsMemo(n - 2, hashTable);
  hashTable[n] = result;
  return result;
};
/*
Time: O(n)
• The total amount of times we recursively call the function is n times 
• Hast table lookups are a constant time operation 

Space: O(n)
• The maximum calls in the call stack at any given time is 'n'
	◦ Can potentially cause stack over flow if the is no space for the function call
• The hash table has 'n' key-value entries in the hash table
*/
/*
n = 3
1. 1 step + 1 step + 1 step
2. 1 step + 2 steps
3. 2 steps + 1 step

n = 4
top <- 1 step <- 1 step <- 1 step <- 1 step (4 steps)
top <- 1 step <- 1 step <- 2 steps
top <- 1 step + 2 steps + 1 step
top <- 2 steps + 1 step + 1 step
top <- 2 steps <- 2 steps

to reach n the previous steps are:  n-1  n-2
base case: 1 step: 1 distinct way, 2 step: 2 distinct ways

3: 3-1,      3-2
3: 2step,   1step
3:  2d   +   1d = 3d

4: 4-1,     4-2
4: 3step  , 2step
4:   3d  +   2d = 5d
*/
