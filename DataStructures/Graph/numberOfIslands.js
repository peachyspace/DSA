/* 
200. Number of Islands
https://leetcode.com/problems/number-of-islands/
*/

/**
 * @param {character[][]} grid
 * @return {number}
 */
const numIslands = function (grid) {
  let totalOfIslands = 0;
  for (let m = 0; m < grid.length; m++) {
    for (let n = 0; n < grid[0].length; n++) {
      if (grid[m][n] === "1") {
        dfs(m, n, grid);
        totalOfIslands++;
      }
    }
  }
  return totalOfIslands;
};

const dfs = (m, n, grid) => {
  if (
    m < 0 ||
    n < 0 ||
    m > grid.length - 1 ||
    n > grid[0].length - 1 ||
    grid[m][n] === "0"
  ) {
    return;
  }

  grid[m][n] = "0"; // prevents us from calling dfs on this postion again
  //call dfs on the current position's horizontal and vertical neighbors
  dfs(m - 1, n, grid); //top
  dfs(m, n - 1, grid); //left
  dfs(m + 1, n, grid); // bottom
  dfs(m, n + 1, grid); //right
};

/*
Time: O(m*n)
• m = grid.length
• n = grid[0].length
• we iterate through every element in the grid  which means we iterated m*n times
	◦ note we do iterate over some elements twice, even if we iterated over the whole grid twice, will still iterate m*n times since we drop coefficients
Space: O(m*n)
• We are using recursion in our DFS traversal
	◦ at the worst case the grid is filled with '1''s only meaning that the call stack will have m*n frames on the call stack at one point
*/
/*
An island is surrounded by water
• when we do a dfs traversal on the graph we turn the 1 into 0 as way to indicate that we dont need to do a dfs traversal
	◦ By doing this we guarantee that every time we find a 1 we have found an unvisited island
    ◦ note the grid is surrounded by water
*/
/*
numOfIslands
• traverse the grid  and only call dfs on '1' and then increment total of Islands
• return total of islands
dfs
• return if position os past top border OR position is past left border OR position is past bottom border Or position is past right border
• grid[m][n] = '0' 
	◦ turn the 1 into 0 as way to indicate that we don't need to do a dfs traversal
//call dfs on the current position's horizontal and vertical neighbors:
• top neighbor: dfs( [m-1, n, grid)
• left neighbor dfs(m, n-1, grid)
• bottom neighbor:  dfs(m+1, n)
• right neighbor: dfs(m, n+1)
*/
