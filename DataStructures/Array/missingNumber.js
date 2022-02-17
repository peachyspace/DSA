/* 
268. Missing Number
https://leetcode.com/problems/missing-number/
*/
//Solution 1
const missingNumber = function (nums) {
  let numSet = new Set(nums); //O(n)
  for (let i = 0; i < nums.length; i++) {
    //O(n)
    if (!numSet.has(i)) {
      // O(1)
      return i;
    }
  }
  return nums.length;
};
/**
Time: O(n)
   *Visit every element in nums array once when creating set (O(n))
   *Iterate for the length of nums array(O(n))
       • set lookup(values) is O(1) time
Space: O(n)
   *Create a set that has n distinct elements
       • n is the length of nums array
   
*/
//Main function: to find the missing number in the range
//all the numbers are unique
//[3,0,1]
//[0,1,3]
// 0 1 2  index
// 2 is missing  index !== 2
//range is 0 to array.length
//Create a set with the values in num array
//Iterate for the length of the array
//  *If index not in set then return index
//return length of array since last  element in the range is missing

//Set vs. Array
//Set allow us to lookup values in O(1) time
//Array index lookup O(1) but we need to look up values
//     - For loop is required  (O(n))

//Solution 2
const missingNumber2 = function (nums) {
  let sortedArr = nums.sort((a, b) => a - b); // O( nlog(n) )
  for (let i = 0; i < nums.length; i++) {
    let currNum = sortedArr[i];
    if (currNum !== i) {
      return i;
    }
  }
  return nums.length;
};
/* 
Time: O( nlog(n))
    *Sort the array (O( nlog(n) ))
    *Iterate through the array (O(n))
        - Lookup value with index O(1)
Space: O(1)
    *We aviod using any additional space when sorting because we sort the array in place
*/

//Main function: to find the missing number in the range
//all the numbers are unique
//[3,0,1]
//[0,1,3]
// 0 1 2  index
//range is 0 to array.length
//Steps
//sort the array
//iterate
//  *check if i!== currNum -> return i
//return length of array since last  element in the range is missing
