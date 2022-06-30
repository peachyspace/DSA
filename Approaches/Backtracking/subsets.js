/* 
78. Subsets
https://leetcode.com/problems/subsets/
*/
/**
 * @param {number[]} nums
 * @return {number[][]}
 */

const subsets = function (nums) {
  const result = [];
  const subset = [];
  const dfs = (i) => {
    if (i >= nums.length) {
      result.push([...subset]);
      return;
    }
    subset.push(nums[i]);
    dfs(i + 1);

    subset.pop();
    dfs(i + 1);
  };
  dfs(0);
  return result;
};

/*
Time: O( (2^n) * n )
• n is the length of the given array
• Total number of recursive calls in the recursive tree( branch factor ^ height of tree)
	◦ height of tree is n
	◦ For each number in the given array we can either include it or exclude it, meaning that each number has two decisions(branch factor).
		‣ [1, 2, 3]
		‣ 1st level: 2 decisions (include or exclude 1)
			• 2
		‣ 2nd level: 4 decisions because each of the previous 2 decisions now have 2 decisions (include or exclude 2)
			• 2 * 2
		‣ 3rd level: 8 decisions because each the previous 4 decisions now have 2 decisions (include or exclude 3)
			• 2 * 2 * 2
• Total subsets created = total number of recursive calls
• We could be COPYING over a subset of length n for each subset we create
	◦ copying arrays is an O(n) operation
    
Space: O(n)
• We dont include the output in the space complexity
• The call stack will have at most n frames because the longest path(height) of the tree is n
*/

/*
using dfs to traverse down the subset tree
• when i >= nums.length, result will grab a COPY of subset
• subset will be modified as we traverse down the tree
	◦ decision to include: push the nums[i] to subset
	◦ explore decision to include: dfs(i+1)
	◦ decision to exclude/ undo: pop nums[i] off subset
	◦ explore decision to exclude: dfs(i+1)
*/
