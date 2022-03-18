/* 
704. Binary Search
https://leetcode.com/problems/binary-search/
*/

var search = function (nums, target) {
  return helper(nums, target, 0, nums.length - 1);
};
function helper(array, target, startIdx, endIdx) {
  if (endIdx < startIdx) {
    return -1;
  }
  let index;
  let middle = Math.floor((startIdx + endIdx) / 2);
  if (array[middle] < target) {
    index = helper(array, target, middle + 1, endIdx);
  } else if (array[middle] > target) {
    index = helper(array, target, startIdx, middle - 1);
  } else {
    return middle;
  }
  return index;
}
/* 
Time O(log(n))
• 'n' is the total amount of elements in the array
• We cut the array in half during each iteration
Space: O(log(n))
• We used recursion and so the most amount of frames in the recursion stack is O(log n)
	◦ every time we call the function we cut the amount of elements in the array in half.
*/

/* 
 [left section, middleIdx, right section]
Used recursive approach(get a section in order to calc. middle): 
• base case: endIdx < startIdx return -1
• let index
• if array[middleIdx] < target
	◦ check right section since we want to increase to target
	◦ index = helper(array, target, middle+ 1, endIdx )
		‣ the helper function returns the index of the target found 
			• we assign it to a variable so we can save it
• if array[middleIdx] > target
	◦ check left section since we want to decrease to target
	◦ index = helper(array, target, startIdx, middle - 1 )
• if array[middleIdx] is target, if true
	◦ return middleIdx
• return index
	◦ return an index or -1
		‣ we need to return a value after the conditionals in order to avoid returning undefined because we didn't return anything
		‣ Here index is passed all the way back to the original helper function call

 */
