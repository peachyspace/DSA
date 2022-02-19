/* 
11. Container With Most Water
https://leetcode.com/problems/container-with-most-water/
*/

const maxArea = function (height) {
  let maxArea = 0;
  let left = 0;
  let right = height.length - 1;
  while (left < right) {
    //containers have a width greater than 0
    let min = Math.min(height[left], height[right]);
    //the size of the ontainer limited by the smallest height
    //because we dont want to slant the container
    let currArea = min * (right - left);
    //Always move the smaller pointer because in the next
    //iteration we can potertially get a bigger height
    //and thus potentially finding a maxArea
    maxArea = Math.max(maxArea, currArea);
    if (min === height[left]) {
      left++;
    } else {
      right--;
    }
  }
  return maxArea;
};

/*
Time: O(n)
    *At worst case the pointer visit every element in the array (o(n))
Space: O(1)
    *We dont take up any additonal space besides the pointers and the max Area, both of which stay constant as the array grows
*/

/*
Two Pointer technique
Create a left =0 and right= array.length-1 pointer
• We want the width to be as big as possible and if the left and right pointer are super tall then you will find the max area fast
• During each iteration :
	◦ Calc. currArea = minHeight * (right - left)
	◦ Calc. maxArea = Math.max(maxArea, currArea)
	◦ move the pointer with the smallest  height
		‣ Move the smallest pointer because we could potentially increase the height in the next iteration and thus potentially increase the area
		‣ If pointers are of the same height you can shift either one(edge case)
*/

// return maximun amount of water a container can store
//you cannnot slant the container
// 0,1,2,3,4,5,6,7,8,
//[1,8,6,2,5,4,8,3,7]
// l               r
//  area:   smallest * (right - left)
//     area: 1 * (8-0) =8  max area:8
//l is smallest -> move it
//[1,8,6,2,5,4,8,3,7]
//   l             r
//   area:   smallest * (right - left)
//     area:     7 * (8 -1) = 49  max area: 49
// r is the smallest -> move it
///......
