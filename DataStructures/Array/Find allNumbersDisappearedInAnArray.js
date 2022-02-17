/* 
448. Find All Numbers Disappeared in an Array
https://leetcode.com/problems/find-all-numbers-disappeared-in-an-array/
*/
const findDisappearedNumbers = function (nums) {
  let missing = [];
  for (let i = 0; i < nums.length; i++) {
    let currIdx = Math.abs(nums[i]);
    nums[currIdx - 1] = Math.abs(nums[currIdx - 1]) * -1;
  }
  for (let j = 0; j < nums.length; j++) {
    let currNum = nums[j];
    if (currNum > 0) {
      //checking for positive numbers
      missing.push(j + 1);
    }
  }
  return missing;
};
//Absolute value of currIndex and value at array[currIndex-1]
//Iterate through the array
//  *Grab the currIdx which may negative so you must get abs value
//  *Turn value at array[currIdx-1] into a negative num
//      *Math.abs(array[currIdx - 1]) * -1
//      *We use abs because array[currIdx-1] may be a negative value. So just make duplicates negative again
//Iterate through the array
//  *When we find a positive number
//      *We use  j + 1 to find the number missing
//      *j is the index holding the currNum
/**
Time: O(n)
//Iterate through the array in order to make found numbers negative O(n)
//Iterate through the array in oder to find positive numbers O(n)
Space: O(1)
Since didn't use additional space,( we mutated the array)
 */

const findDisappearedNumbers2 = function (nums) {
  let setNum = new Set(nums);
  let missing = [];
  for (let i = 1; i <= nums.length; i++) {
    if (!setNum.has(i)) {
      missing.push(i);
    }
  }
  return missing;
};

/**
Time: O(n)
    *Create a set from the arrays elements (O(n))
    *Iterate for the range[1,n] (O(n))
        •Set value lookup is O(1)
        •Array push is O(1)
Space: O(n)
    *Create a set that at worst case can have all unique values
 */
//Find all missing numbers within the range
// [4,3,2,7,8,2,3,1]
// [1,2,2,3,3,4,7,8] sort the array
// [5,6]

// [4,3,2,7,8,2,3,1]
// [4,3,2,7,8,1] create a set from array elements
// 1->true
// 2->true
// 3->true
// 4->true
// 5->false  set.has(index) -> false then[5]
// 6->false   set.has(index) -> false then[5,6]
// 7->true
// 8->true
// [5,6]
