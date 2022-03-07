/**
 * @param {number[]} nums
 * @return {number}
 */
const majorityElement = function (nums) {
  let count = 0;
  let res = 0;
  for (let i = 0; i < nums.length; i++) {
    let current = nums[i];
    if (count === 0) {
      res = current;
    }
    count += current === res ? 1 : -1;
  }
  return res;
};
/* 
Time: O(n)
• Iterated through element in the array once

Space: O(1)
• Boyer-Moore uses only constant additional memory.
*/

/* 
Essential information that allows us to solve this problem in O(1) space with linear time: We are guaranteed a majority element; meaning that there will be a value that will appear in more than half of the array

• Keep track of what the maximum is by using one variable
• if the count equals 0 then update the result to the current element 
• if current === res ->increment the count by 1 every time you see the result
• if current !== res -> decrement the count by 1 every time you don't see the result
*/
