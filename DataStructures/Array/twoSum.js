/* 
1. Two Sum
https://leetcode.com/problems/two-sum/
*/
const twoSum = function (nums, target) {
  let numTable = {};
  for (let i = 0; i < nums.length; i++) {
    let currNum = nums[i];
    let complement = target - currNum;
    if (complement in numTable) {
      return [numTable[complement], i];
    }
    numTable[currNum] = i; //adding visited num to numTable
  }
};

/**
Time: O(n)
   • We iterate through the array once (O(n))
Space: O(n)
   •The additional space required depends on the number of items stored in the hashTable, which can store at most n elements
*/
//each array has only two numbers that add up to the target
//you cant add a number(element) it's self
//return indices of the two numbers that add up to target
//[3,3] 3+3 =6 is valid because the numbers have different indices
//[2,7,11,15], target = 9
//9-2 -> 7
//9-7 -> 2 is in the hashmap return 0 and 1
//The complement of 7 is 2 since 7 + 2 = 9

//[3,2,4], target = 6
//6-3 -> 3
//6-2 -> 4
//6-4 -> 2  is in hashTable return 1 and 2
//The complement of 4 is 2 since 4 + 2 = 6

//nums = [3,3], target = 6
//6-3 -> 3
//6-3 -> 3 is in hashTable return 0 and
//The complement of 3 is 3 since 3 + 3 = 6

//Create hash table
//During each iteration we make sure:
// *calc. the complement of currNum:  target - currNum
// *Check if complement exists in table
//     •If true return indices of complement and currNum
// *Add currNum to the table because it may be a complement to another number in the array.
