/* 
213. House Robber II
https://leetcode.com/problems/house-robber-ii/
*/

const rob = function (nums) {
  if (nums.length === 1) return nums[0];

  return Math.max(
    robHelper(1, nums.length, nums),
    robHelper(0, nums.length - 1, nums)
  );
};
const robHelper = function (start, end, nums) {
  let prev1 = 0;
  let prev2 = 0;
  for (let i = start; i < end; i++) {
    let temp = prev1;
    prev1 = Math.max(nums[i] + prev2, prev1);
    prev2 = temp;
  }
  return prev1;
};

/* 
Time: O(n) + O(n) = O(2n) -> O(n)
• n is the length of the  nums array
• 1st call to robHelper function: O(n) time
• 2nd call to robHelper function: O(n) time

Space: O(n) + O(n) = O(2n) -> O(n)
• we are not consuming additional space beside the variables for prev1, prev2, and temp
*/

/* 
If we are given one element then return that element
We can't include both the 0th and last element(house), we must pick one:
• let start = 1, end = nums.length
	◦ call robHelper (1, nums.length, nums)
• start = 0, end = nums.length-1
	◦ call robHelper(0, nums.length-1, nums)
• return the max value returned by one of the two calls to robHelper function
Reuse function from House Robber and pass down start, end, nums
*/
