/* 
217. Contains Duplicate
https://leetcode.com/problems/contains-duplicate/
*/

const containsDuplicate = function (nums) {
  let numTable = {};
  for (let i = 0; i < nums.length; i++) {
    let currNum = nums[i];
    if (currNum in numTable) {
      return true;
    }
    numTable[currNum] = 0;
  }
  return false;
};

//main function: to find a duplicate in array
//once we see a duplicate we can return true
//  • char in charTable then return true
//Input: nums = [1,2,3,1]  true

//Input: nums = [1,2,3,4]  false

/**
Time: O(n)
    -We iterate through each element in the array once (O(n) time)
        •On average hashTable lookups take up O(1) time
        •On average hashTable insertions take up O(1) time
Space: O(n)
    -At worst case our array will not have any duplicates
        •The number of entries in hashTable will be equal to the size of the array
 */
