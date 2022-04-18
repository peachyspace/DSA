/* 
46. Permutations
https://leetcode.com/problems/permutations/
*/

const permute = function (nums) {
  const result = [];
  let path = new Set();
  const dfs = function (path) {
    if (path.size === nums.length) {
      result.push(Array.from(path));
      return;
    }
    for (let i = 0; i < nums.length; i++) {
      if (path.has(nums[i])) continue;
      path.add(nums[i]);
      dfs(path);
      path.delete(nums[i]);
    }
  };
  dfs(path);
  return result;
};

/* 
Time: O( n * n! )
• n is the length of nums array
• Creating the permutations of the nums array takes O(n!)
	◦ 3 letters = 3 * 2 * 1
• A single permutation takes O(n) to construct since we iterate for nums.length times in order to build one permutation

Space: O(n + n!) -> O(n!)
• the max amount of frames in the call stack at any given point is the length of nums
	◦ we want to build a permutation that has the length of nums
• this question asks us to store and return ALL permutations, which means that the result array has to store n! elements
*/

/* 
• create set and result array
• base case: 
	◦ set has the same amt. of elements as nums array -> 
		‣ turn set an array and then add to result array
		‣ return
• iterate for the length of the nums array
	◦ continue if current element is in the queue
	◦ chose a number: add to set
	◦ explore other choices (1,2,3....)
	◦ undo choice: delete from set
• call dfs function and pass set to it
• return result
*/
