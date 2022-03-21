/* 
53. Maximum Subarray
https://leetcode.com/problems/maximum-subarray/
*/

const maxSubArray = function (nums) {
  let maxSum = nums[0];
  let sum = nums[0];
  for (let i = 1; i < nums.length; i++) {
    let current = nums[i];
    if (sum < 0) {
      sum = 0; //excluding any elements prior to index i
      //maximizes sum by exluding negative prev sum
    }
    sum += current;
    maxSum = Math.max(maxSum, sum);
  }
  return maxSum;
};

/* 
Time: O(n) 
• n is the length of the array
• One iteration through the whole array

Space: O(1)
• At each iteration only constant time operations were executed
*/

/* 
Use a sliding window

for loop expands window
• if the currSum < 0 
	◦ currSum = 0   ( excludes any elements prior to index i )
(maximizes sum by excluding negative prev sum #)
• add current to currSum
• maxSum = math.max(maxSum, currSum) 

return maxSum
*/
