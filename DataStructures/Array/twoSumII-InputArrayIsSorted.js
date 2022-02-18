/* 
167. Two Sum II - Input Array Is Sorted
https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/
*/

const twoSum = function (numbers, target) {
  let left = 0;
  let right = numbers.length - 1;
  //let indexArr = []
  while (left < right) {
    let currLeft = numbers[left];
    let currRight = numbers[right];
    let sum = currLeft + currRight;
    if (sum > target) {
      right--;
    } else if (sum < target) {
      left++;
    } else {
      return [left + 1, right + 1];
    }
  }
};
/*
Time: O(n)
    • At worst case we visit each element in the array once O(n)
Space: O(1)
    • Used no additional space besides the array we return that always has a length of two
 */
//Return the two indices of the nums that add up to the target
//Both indieces must be added by 1 since the array is indexed by one
//Must take O(1) space no hastable
//Array is sorted in an asending order
//[2,7,11,15], target = 9
//[0+1,1+1] = [1, 2] order matters left index is smaller than right index
//[2,7,11,15], target = 9
// ^       ^  15 + 2 = 17
// ^    ^     11 + 2 = 13
// ^ ^         2 + 7 = 9  [l+1,r+1] -> [0+1, 1+1]-> [1, 2]

//[2,3,4], target = 6
// ^   ^  2 + 4 = 6 [0+1, 2+1] -> [1,3]

//[-1,0], target = -1
//  ^ ^  -1 + 0 = -1  [0+1, 1+1] -> [1,2]

//Array is sorted in a asending order
// left side will have smaller numbers when compared to the right side:
//  *left pointer is always  smaller than right pointer
//Adding these pointers togther allows to to see if we are closer to the target
//if sum greater than target then move right pointer
// * Decreasing the right pointer and thus the sum
//if sum lesser than target then move left  pointer
// * Increasing the left pointer and thus the sum
