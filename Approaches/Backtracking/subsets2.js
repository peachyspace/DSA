/* 
90. Subsets II
https://leetcode.com/problems/subsets-ii/
*/

/**
 * @param {number[]} nums
 * @return {number[][]}
 */

const subsetsWithDup = (nums) => {
  const result = [];
  const array = [];
  nums = nums.sort((a, b) => a - b);
  const back = (index) => {
    if (index >= nums.length) {
      result.push([...array]);
      return;
    }
    //all subets that include nums[i]
    array.push(nums[index]);
    back(index + 1);

    //all subsets that don't include nums[i]
    array.pop();
    while (index < nums.length && nums[index] === nums[index + 1]) {
      index++;
    }
    back(index + 1);
  };
  back(0);
  return result;
};

/*
Time: O( n * log(n) + n * ( 2 ^n ) ) -> O(n * (2 ^n ) )
• n is the length of nums array
• sort is an O(n * log(n))  operation
• Total amount of recursive calls = branch factor ^ height
	◦ branch factor: 2
		‣ each number has 2 decisions to make: 
			• include itself
			• exclude itself
		‣ these two decisions mean that each level in the decision tree grows by a factor of 2
			• 2*2*2*2
	◦ height is n because the longest path is the length of nums array
		‣ once the index equals the length of nums we stop recursing down
• during each of the recursive calls we might use the while loop : Not reiterating so not (2*n)^n
	◦ when we use it simply move the index ahead and so we will end earlier
		‣ the branch that used the while loop will have a branch(path) smaller than the the branches that didn't use the while loop
• in the worst case we have only unique characters and so 
	◦ total number of recursive calls === subsets created
• We make a copy of the subset that could be up have a length of n for each function call
*/

/*
nums array might have duplicate values
We have to get the subsets of the array but we cant include DUPLICATE subsets
• We can include and exclude a number but when index moves on to the next number we can encounter a duplicate value
	◦ we can combat this by sorting the the nums array
	◦ then  when we exclude the number we use a while loop to make sure that index is not holding a duplicate in nums array
    
Space:O (n + log(n)) -> O(n)
• not including the output
• sorting the nums array takes up log(n) space
• the call stack will have at most n frames
	◦ we stop recursing when index >= nums.length
*/

/*
nums array might have duplicate values
We have to get the subsets of the array but we cant include DUPLICATE subsets
• We can include and exclude a number but when index moves on to the next number we can encounter a duplicate value
	◦ we can combat this by sorting the the nums array
	◦ then  when we exclude the number we use a while loop to make sure that index is not holding a duplicate in nums array
*/
