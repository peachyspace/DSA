/* 
74. Search a 2D Matrix
https://leetcode.com/problems/search-a-2d-matrix/
*/

/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */

//Brute force
const searchMatrix = (matrix, target) => {
  for (let i = 0; i < matrix.length; i++) {
    let left = 0;
    let right = matrix[i].length - 1;
    while (left <= right) {
      let mid = Math.floor((right + left) / 2);
      if (matrix[i][mid] === target) {
        return true;
      } else if (matrix[i][mid] < target) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  }
  return false;
};

/*
Time: O(m * log(n))
- m is the total number of rows
- n is the total number of columns
- we did a binary search at each row 
Space: O(1)
- We only used two pointers which takes up constant space
*/

//Optimization
var searchMatrix2 = function (matrix, target) {
  let topR = 0;
  let bottomR = matrix.length - 1;

  while (topR <= bottomR) {
    let midR = Math.floor((topR + bottomR) / 2);
    if (target > matrix[midR][matrix[0].length - 1]) {
      topR = midR + 1;
    } else if (target < matrix[midR][0]) {
      bottomR = midR - 1;
    } else {
      break;
    }
  }
  if (!(topR <= bottomR)) return false;
  let row = Math.floor((topR + bottomR) / 2);
  let left = 0;
  let right = matrix[row].length - 1;
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (target > matrix[row][mid]) {
      left = mid + 1;
    } else if (target < matrix[row][mid]) {
      right = mid - 1;
    } else {
      return true;
    }
  }
  return false;
};

/*
Time: O(log(m+n))
- m is the total number of rows
- n is the total number of columns
- We did a binary search on m+n cells O(log(m+n))
    - we did NOT do a binary search at each row 
Space: O(1)
- We only used two pointers which takes up constant space
*/

/*
- ititally:  left pointer = top row = matrix[0]
- ititally:  right pointer = bottom row = matrix[matrix.length-1]

Like in a binary search we will try to find the mid point between
the top(left) and bottom(right) pointer
midRow = (top + bottom) /2
while(top <= bottom)
- target < matrix[midRow][0]  -> mid row smallest num
    - bottom pointer = mid - 1
- target > matrix[midRow][matrix.length-1]  -> biggest num
    - top = mid + 1
- when both of the statments above are false
  then the target is within the the midRow
    - target > matrix[midRow][0]  target > the smallest num at midRow
    - target < matrix[midRow][matrix.length-1]   target < the biggest num at midRow
    - the smallest num at midRow < target < the biggest num at midRow
if top > bottom then return false 
    - BREAK

else then that means that we have not done a binary search on one row
do a binary search on that row
- you can find the row by using top and bottom since those values have been   saved even after we BROKE out of the while loop
row = (top + bottom)/2
l = 0, r = matrix[0].length-1
- While l <= r
    - get mid
    - if target > matrix[row][mid]
        - l = mid + 1
    - if target < matrix[row][mid]
        - r = mid - 1
    - else return true
if we complete the binary search then return false
*/
