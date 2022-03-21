/* 
Minimum Size Subarray Sum
https://leetcode.com/problems/minimum-size-subarray-sum/
*/

/**
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
var minSubArrayLen = function (target, nums) {
  let sum = 0;
  let start = 0;
  let minLength = Infinity;

  for (let i = 0; i < nums.length; i++) {
    let current = nums[i];
    sum += current;
    while (sum >= target) {
      //only shrink if window is valid
      minLength = Math.min(minLength, i - start + 1);
      sum -= nums[start]; //shrinking window
      start++; //shrinking window
    }
  }
  return minLength === Infinity ? 0 : minLength;
};

/*
Time: O(n)
• n is the length of the given array
• By using two pointers we are in a sense scanning through the array twice. O(2n) - > O(n)
Space: O(1)
• At each iteration we are executing constant time operations
• We always use two pointers 
*/

/*
minimal length
sum >= target
return minLength
sum = 0
minLength = Infinity //any length will be less than infinity
start = 0 // maybe the 1st element >= target
• Expand window by one during each iteration
	◦ add current to sum
	◦ while the window is valid (sum >= target)
		‣ Update minLength if newLength is smaller
		‣ shrink window( move start pointer by 1 )
			• sum -= sum[start]
			• start++
return 0 if minLength is Infinity else return minLength


[2,3,1,2,4,3], 7
 s e          sum = 5,   5 < 7 minLength = infinity
 s   e        sum = 6    6 < 7 minLength = infinity
 s     e      sum = 8    8 >= 7 minLength = 4 
while:window is valid move start pointer
 ->s   e      sum = 6    6 < 7 minLength = 4
 ___________________________________________
   s     e    sum = 10   10 >= 7 minLength = 4
while:window is valid move start pointer
   ->s   e    sum = 7    7 >= 7  minLength = 3
     ->s e    sum = 6    6 < 7 minLength = 3
_____________________________________________
       s   e  sum = 9    9 >=7  minLength = 3
while:window is valid move start pointer  
       ->s e  sum = 7    7 >= 7  minLength = 2
        ->se  sum = 3    3 < 7   minLength = 2

*/
