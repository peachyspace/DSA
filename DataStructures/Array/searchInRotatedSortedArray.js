/* 
33. Search in Rotated Sorted Array
https://leetcode.com/problems/search-in-rotated-sorted-array/
*/

const search = function (nums, target) {
  let left = 0;
  let right = nums.length - 1;
  while (left <= right) {
    //an array can be of length 1(left===right)
    let mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) {
      return mid;
    }
    //  Check if left side is sorted
    if (nums[left] <= nums[mid]) {
      if (nums[left] <= target && target <= nums[mid]) {
        //target is in left
        right = mid - 1;
      } else {
        //target is in right
        left = mid + 1;
      }
    }
    //    Otherwise the right side is sorted
    else {
      if (nums[mid] <= target && target <= nums[right]) {
        //target is in right
        left = mid + 1;
      } else {
        //target is in left
        right = mid - 1;
      }
    }
  }
  return -1;
};
/*
Time: O(log(n))
    •We divided the array in half after every interation and thus dividing our search space in half during eachiteration (Binary Search O(log(n)))

Space: O(1)
    •We did not use any additonal space besides the pointers that will stay them same as the array grows.
*/
/*
• left, mid, right pointer
• While loop runs if l <= r, because we can be given an array of length (we still have to check that one value)
	◦ During each iteration we divided the rotated array in half. When you divide the rotated array into two halves, using mid index, at least one of subarray should remain sorted ALWAYS.
	◦ Calc. mid
		‣ mid = (l +r) /2
	◦ Mid === target
		‣ return mid
	◦ Check if the left side is sorted (the leftmost value is less than mid)
		‣ Check if the target is within the left sorted side (leftmost <= target <= mid)
			• note: this portion is in ascending order
			• move right pointer to the left  side (mid-1)
		‣ Else the target might be  the right side   and so move left (mid+1)right
			• Although the right side is not sorted, when we divide it in half during the next iteration it will have at least one sorted side
	◦ Else we go to the right sorted portion since on  of the sides most be sorted  
		‣ Check if the target is in the right sorted side(mid  <= target <= rightmost)
			• note: this portion is in ascending order rightmost val is highest num
			• move left pointer to the right side (mid+1)
			• move right pointer(mid-1)
		‣ Else target might be in left  side and so move right(mid-1) to left
			• Although left side is not sorted, when we divide it in half during  the next iteration, it will have at least one sorted side
• We did not find the target so return -1 
*/
//return index of target or -1 if target not found
//O(log(n)) binary search

//[4,5,6,7,0,1,2], target = 0
// 0,1,2,3,4,5,6         output: 4

//[4,5,6, 7 ,0,1,2] target =0
//|_____| mid !== target  7!== 0
//        left side is sorted
//        However, 0 is not there so
//        we need to check the right side
//[7 ,0,1,2] one side is sorted at least
//    |____| mid === target

//[1], target = 0
//|_|   mid !== target
//     output: -1
