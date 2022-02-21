/* 
54. Spiral Matrix
https://leetcode.com/problems/spiral-matrix/
*/
const spiralOrder = function (matrix) {
  let left = 0;
  let right = matrix[0].length - 1; //width of subArr
  let top = 0;
  let bottom = matrix.length - 1;
  let spiralArr = [];
  while (left <= right && top <= bottom) {
    //iterating through a level in the matrix

    //Start at top-left corner (move to the right)
    //range[left - right] inclusive
    for (let i = left; i <= right; i++) {
      spiralArr.push(matrix[top][i]);
    }
    //increment top because you don't want to visit that row again
    top++;

    //start at top-right corner (move down)
    //range[top - bottom] inclusive
    for (let i = top; i <= bottom; i++) {
      spiralArr.push(matrix[i][right]);
    }
    //decrement right because you dont want to visit that column again
    right--;

    //edge case: if there is only one subarray(top<=bottom)
    //edge case: if there are subarrays that are of length 1 (left<=right)
    //if either occur you must break out of the while loop
    //becuse then the below for loops will be iterating over nothing
    //We had already visited everthing in the array
    if (!(left <= right && top <= bottom)) {
      break;
    }

    //Start at the bottom right corner (move left)
    //range[right - left] inclusive
    for (let i = right; i >= left; i--) {
      spiralArr.push(matrix[bottom][i]);
    }
    //decrement bottom because you dont want to visit that row again
    bottom--;

    //start at the bottom-left corner (move up)
    //range[bottom - top] inclusive
    for (let i = bottom; i >= top; i--) {
      spiralArr.push(matrix[i][left]);
    }
    //increment left because you dont want to visit that column again
    left++;
  }
  return spiralArr;
};
//returning the elements that are
//in the subarrays in spiral order

/*
Time: O(m * n) 
    •We are iterating through a matrix, who's size(amt of elements in matrix) is determined by the length of the array(n) and the length of array's subarrays(m)

Space: O(1)
    •No additional space is used if we don't include the output array(spiralArr) 
*/

/*
Iterate through every level in the matrix as long as left <= right && top <= bottom

Always start a new layer of matrix at the  top-left
    -range [ left - right ] inclusive
	-move right(traveling through top row of current layer)
	-stop after you visit the right boundary
	-increment top boundary because you don want to visit that row again 

Start at top-right corner
    -range [top - bottom] inclusive
	-move down(traveling through the right column of the current layer)
	-stop after you visit the bottom boundary 
	-decrement right boundary because you don't want to visit that column again
    
    edge case: if there is only one subarray(top<=bottom)
    edge case: if there are subarrays that are of length 1 (left<=right)
     Solution:  if(!( (left<=right) && (top<=bottom))) break;
        if either occur you must break out of the while loop 
        becuse then the below for loops will be iterating over nothing
        We had already visited everthing in the array

Start at bottom-right corner
    -range [right - left] inclusive
	-move left( traveling through the bottom row of the current layer)
	-stop after you visit the left boundary
	-decrement bottom boundary because you don't want to visit that row again

Start at bottom-left corner
    range [bottom - top] inclusive
	-move up(traveling through the left column of the current layer)
	-stop after you visit the top boundary
	-increment the left boundary because you don't want to visit that column again
*/
