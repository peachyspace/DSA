/* 
56. Merge Intervals
https://leetcode.com/problems/merge-intervals/
*/

const merge = function (intervals) {
  if (intervals.length <= 1) {
    return intervals;
  }
  let start = 0;
  let end = 1;
  intervals.sort((a, b) => a[start] - b[start]);
  let result = [intervals[0]];
  for (let i = 1; i < intervals.length; i++) {
    let prev = result[result.length - 1];
    let curr = intervals[i];
    if (prev[end] >= curr[start]) {
      prev[end] = Math.max(prev[end], curr[end]); //prev[end] can be bigger but prev[start] is always less then curr[start]
    } else {
      result.push(curr);
    }
  }
  return result;
};

/**
Time: O(nlog(n)) + O(n) = O(nlog(n))
    •Sorting the array takes O(n log(n)) 
    •Iterating through every interval O(n)
Space: O(log(n)) + O(n) = O(n)
    •Sorting an array takes O(log(n)) additional space
    •At worst case all the intervals in the input array are non-overlapping and that means the results array's length is 'n' (O(n))
 */

//merge overlapping intervals together
//return non overlapping intervals [[1,6],[-8,10],[15,18]]
//Check if intervals is empty or has a length of 1
//  return interval
//sort intervals by its subarrays start values. This allows us to see where the intervals truly overlap.
//Add first interval in result array
//Iterate through the intervals
//  *grab prev (prev. interval)
//  *grab curr (curr. interval)
//  *if(prev[end] >= curr[start]) then
//      •update prev[end] to Math.max(prev[end],curr[end])
//  *else push curr to result array
//return result

//let prev = result[result.length-1]
//[[1,3],[2,6],[8,10],[15,18]]
//    ^   ^     prev[end] >= curr[start] overlap
//              prev[end]=Math.max(prev[end],curr[end])
//          ^   ^ prev[end] < curr[start] no overlap
//                result.push(curr)
//                  ^   ^  prev[end] < curr[start]
//                         result.push(curr)
//[[1,6],[8,10],[15,18]]

////[[1,20],[2,6],[5,10],[15,18]]
//       ^   ^     prev[end] >= curr[start] overlap 20 >= 2
//                 prev[end] = Math.max(prev[end],curr[end])
//             ^  ^  prev[end] >= curr[start] overlap 20 >=5
//                   prev[end] = Math.max(prev[end],curr[end])
//...........
//result[1,20]
