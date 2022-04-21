/* 
198. House Robber
https://leetcode.com/problems/house-robber/
*/

/* 
Step 1. Figure out recursive relation.
A robber has 2 options: 
• a) rob current house i; 
• b) don't rob current house.
If an option "a" is selected it means she can't rob previous i-1 house but can safely proceed to the one before previous i-2 and gets all cumulative loot that follows.

If an option "b" is selected the robber gets all the possible loot from robbery of i-1 and all the following buildings.

So it boils down to calculating what is more profitable:
• robbery of current house + loot from houses before the previous
• loot from the previous house robbery and any loot captured before that

rob(i) = Math.max( rob(i - 2) + currentHouseValue, rob(i - 1) )
There are 4 ways to solve this proplem and most of other DP problems can be approached using the following sequence:
1. Find recursive relation - look above
2. Recursive (top-down)
3. Recursive + memo (top-down)
4. Iterative + memo (bottom-up)
5. Iterative + N variables (bottom-up) ----> Optimal
*/

//2. Recursive (top-down)
const robRecursive = function (nums) {
  return robHelper(nums, nums.length - 1);
};

const robHelper = function (nums, i) {
  // we hit this conditional when robHelper(..., 0-2) or robHelper(.., 0-1)
  if (i < 0) return 0; // the possible earnings from robbery up to the 0th element's is $0

  let sumWithIndex_i = robHelper(nums, i - 2) + nums[i];
  let sumWithoutIndex_i = robHelper(nums, i - 1);
  return Math.max(sumWithIndex_i, sumWithoutIndex_i);
};
/*
 0,1,2,3
[1,2,3,1]
 1,2,4,4  max earnings j
 robHelper(nums, i-2)+nums[1]
•  robHelper(nums, 0-2) returns 0
	◦ hence: 0+ nums[0] : the possible earnings up to index 0 is nums[0]
• robHelper(nums, i -1)
	◦ robHelper(nums, 0 -1) returns 0 
	◦ hence: nums[0] : the possible earnings up to this point is nums[0]
*/

/* 
Converting the recurrent relation from Step 1 shouldn't be very hard.
• fast to implement but takes to long to process
• Time complexity O(2 ^n)
	◦ n is the length of nums array
	◦ we can create a recursive tree where each node has two branches and its height is the length of num
	◦ the recursive function makes 2 recursive calls 
	◦ the max amount of frames on the call stack is n
*/

//3. Recursive + memo (top-down)

const robRecPlusMemo = function (nums) {
  let memo = {};
  return robHelper(nums, nums.length - 1, memo);
};

const robHelper2 = function (nums, i, memo) {
  if (i in memo) return memo[i];
  if (i < 0) return 0;

  let sumWithIndex_i = robHelper2(nums, i - 2, memo) + nums[i];
  let sumWithoutIndex_i = robHelper2(nums, i - 1, memo);

  return (memo[i] = Math.max(sumWithIndex_i, sumWithoutIndex_i));
};
/* 
• we save the work we previously did in the memo hash table
• eliminates repeated work
• Time: O(n)
	◦ n is the length of the nums array
	◦  We calculate memo[index] for each index only once & there are n indices. Thus overall time complexity is O(n).
		‣ two recursive calls are need to calculate memo[i]
			• O(n recursive calls * 2 recursive calls per frame) = O(2n) -> O(n)
				◦ we call the recursive function on each element once since we saved our past calculations with memoization
	◦ During each of these calls, we make an O(1) computation which is simply making two other recursion calls, finding their maximum and populating the cache(memo) based on that 
• Space:O(n)
	◦ our call stack will have at most n calls at any given time
	◦ the hash table has n entries 
*/

//4. Iterative + memo (bottom-up)

const robIterativePlusMemo = function (nums) {
  const memo = {};
  //base cases:
  memo[0] = 0; //index 0 gets you out of bounds and so you can't rob
  memo[1] = nums[0]; // index 1:only sumWithoutCurrHouse is within bounds
  //note we added nums[0] so we need to iterate starting at idx 1
  for (let i = 1; i < nums.length; i++) {
    //we need to include nums[1]
    //let currentHouse = nums[i]
    memo[i + 1] = Math.max(nums[i] + memo[i - 1], memo[i]);
    //ex: memo[1+1] = Math.max( nums[1] + memo[1-1], memo[1]])
    //ex: memo[2] =   Math.max( nums[1] + memo[0], memo[1]])
  }

  return memo[nums.length];
};

/* 
• we got rid of recursive stack but not the hash table
• Time: O(n)
	◦ n is the length of the nums array
	◦ we do iterate through the nums array O(n)
		‣ at each iteration we do an O(1) operation
• Space: O(n)
	◦ we create a hash table of size n
*/

//5. Iterative + N variables (bottom-up)

const rob = function (nums) {
  let prev1 = 0;
  let prev2 = 0;
  // the order is: prev2, prev1, num
  for (let i = 0; i < nums.length; i++) {
    let temp = prev1; // is going to be next to new prev1
    prev1 = Math.max(nums[i] + prev2, prev1);
    prev2 = temp; // prev2 is once again next to prev1
  }
  return prev1;
  //once we loop stops prev1 will hold the max amt  of cash robbed
};

/* 
• We notice that when we use iterative + memo, we only use memo[i] and memo[i-1], so were always going two steps back. 
	◦ we can hold them in two variables instead. 
	◦ Inspired by fibonacci sequence
	◦ note: that cost of robbing house at idx 0 always cost nums[0]
		‣ prev1 and prev2 can be 0 ind order to always get nums[0]
• Time: O(n)
	◦ n is the length of the nums array
	◦ we do iterate through the nums array O(n)
		‣ at each iteration we do an O(1) operation
• Space: O(1)
	◦ we only create two variable that take up constant space
*/
