/* 
695. Max Area of Island
https://leetcode.com/problems/max-area-of-island/
*/

/**
 * @param {number[][]} grid
 * @return {number}
 */
const maxAreaOfIsland = function (grid) {
  let maxArea = 0;
  for (let m = 0; m < grid.length; m++) {
    for (let n = 0; n < grid[0].length; n++) {
      if (grid[m][n] === 1) {
        let currentArea = dfs(m, n, grid);
        maxArea = Math.max(maxArea, currentArea);
      }
    }
  }
  return maxArea;
};

const dfs = (m, n, grid) => {
  if (
    m < 0 ||
    n < 0 ||
    m > grid.length - 1 ||
    n > grid[0].length - 1 ||
    grid[m][n] === 0
  )
    return 0;

  grid[m][n] = 0;

  return (
    1 +
    dfs(m - 1, n, grid) +
    dfs(m, n - 1, grid) +
    dfs(m + 1, n, grid) +
    dfs(m, n + 1, grid)
  );
};

/*
Time: O(m * n)
• m = grid.length
• n = grid[0].length
• We traverse the grid m * n times, meaning we visit every square in the grid once

Space: O(m * n)
• We are using recursion and so in the worst case that the grid is filled with ONLY 1's then there will be m*n frames on the call stack at one point in time
*/

/*
// given a matrix, return a an integer rep. the max area of an island
the grid is surrounded by water
use dfs to indicate that an island has been visited
• dfs will use the grid itself to keep track of visited positions
• turn 1's to 0's

iterate through the matrix, when you find a 1, assign currentArea to call dfs (m, n) then compare to maxArea
• when we do a dfs traversal on the graph we turn the 1 into 0 as way to indicate that we dont need to do a dfs traversal when we see tis position again
	◦ By doing this we guarantee that every time we find a 1 we have found an unvisited island
return max area
dfs function(m,n)
• if m is passed the top border OR n is passed the left border OR m os passed the bottom border OR n is passed the right border OR grid[m][n] === 0 then return 0
	◦ this allows us to add integers when we return in this function
• turn 1's to 0's -> grid[m][n] = 0

• return 1+dfs(m-1, n, grid) + dfs(m, n-1, grid) + dfs(m+1, n, grid) + dfs(m, n+1, grid)
	◦ We can return 1+ dfs() + dfs() + dfs() + dfs() because when we  begin to take out frames of the call stack the 1st  returned value will be 1+0+0+0+0 
*/
