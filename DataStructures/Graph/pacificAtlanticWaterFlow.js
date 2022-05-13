/* 
417. Pacific Atlantic Water Flow
https://leetcode.com/problems/pacific-atlantic-water-flow/
*/

/**
 * @param {number[][]} heights
 * @return {number[][]}
 */

const pacificAtlantic = function (heights) {
  const pacificVisited = [];
  const atlanticVisited = [];
  for (let i = 0; i < heights.length; i++) {
    pacificVisited.push(Array(heights[0].length).fill(false));
    atlanticVisited.push(Array(heights[0].length).fill(false));
  }
  const result = [];
  let min = -Infinity;
  //iterate through the left and right border simultaneously and at iteration calls dfs on the current cells
  for (let m = 0; m < heights.length; m++) {
    dfs(m, 0, heights, min, pacificVisited); //left border cell
    dfs(m, heights[0].length - 1, heights, min, atlanticVisited); //right border cell
  }
  //iterate through the top and bottom border simultaneously and at iteration calls dfs on the current cells
  for (let n = 0; n < heights[0].length; n++) {
    dfs(0, n, heights, min, pacificVisited); //top border cell
    dfs(heights.length - 1, n, heights, min, atlanticVisited); //bottom border cell
  }

  //iterate through the pacific and atlantic visited array simultaneously if a cell is
  //both true in the pacfic and atlantic array then that cell can overflow to to both the
  //Pacific and Atlantic oceans.
  for (let m = 0; m < heights.length; m++) {
    for (let n = 0; n < heights[0].length; n++) {
      if (pacificVisited[m][n] && atlanticVisited[m][n]) {
        result.push([m, n]);
      }
    }
  }
  return result;
};

const dfs = (m, n, heights, neighbor, visited) => {
  //we dont want to run dfs on cells that are past the top OR left OR bottom OR right border
  if (m < 0 || n < 0 || m > heights.length - 1 || n > heights[0].length - 1)
    return;

  //we want to run dfs on a cell that we already marked as true the visited array
  if (visited[m][n]) return;

  //we dont want mark on a cell, true if it is shorter than its neighbor
  if (heights[m][n] < neighbor) return;

  //mark the cell as true in the visited array
  visited[m][n] = true;

  //call dfs on the cells neighbors
  dfs(m - 1, n, heights, heights[m][n], visited); //top neighbor
  dfs(m, n - 1, heights, heights[m][n], visited); //left neighbor
  dfs(m + 1, n, heights, heights[m][n], visited); //bottom neighbor
  dfs(m, n + 1, heights, heights[m][n], visited); //right neighbor
};

/*
 Time:O(m*n)
 • given an m x n integer matrix named heights
 • We visit very cell in the height array meaning that we visited m*n cells
     ◦ The dfs function runs exactly once for each cell that can overflow to an ocean.
 
 Space: O(m*n)
 • we created to m*n sized matrices
 • we used recursion and in the worst case, all the cells have the same height meaning that there will be m*n frames on the call stack at one point
 */

/*
Solution

create a pacific visited 2D array filled with false
create a Atlantic visited 2D array filled with false
Instead of going through every single cell and checking if this cell can reach the pacific and Atlantic  ocean, we instead:
• 1st: iterate through every cell that is part of the top and bottom border
	◦ 1st row borders the pacific ocean, meaning that every cell in that row can potentially overflow to the pacific ocean
		‣ at each node in this row we are going to find what nodes can reach the PACIFIC ocean and remember to mark the cell as true in the pacific visited array
	◦ last row borders the Atlantic ocean, meaning that every cell in that row can potentially overflow to the Atlantic ocean
		‣ at each node in this row we are going to find what nodes that can reach the ATLANTIC ocean and remember to mark the cell as true in the Atlantic visited array
• 2nd: iterate through every cell that is part of the left and right border
	◦ 1st column borders the pacific ocean, meaning that every cell in that column can potentially overflow to the pacific ocean 
		‣ at each node in this column we are going to find what can reach the PACIFIC ocean and remember to mark the cell as true in the pacific visited array
	◦ last column borders the Atlantic ocean, meaning that every cell in that column can potentially overflow to the Atlantic ocean 
		‣ at each node in this column we are going to find what nodes can reach the ATLANTIC ocean and remember to mark the cell as true in the Atlantic visited array 
Iterate through the whole grid and find the positions that are marked as true in both the pacific visited array and atlantic visited array, then push that position to the results array
*/

//_____________________________________________________________________________
/*
 Shorter version of solution
 1)Create a 2D array called pacificVisited that is of size O(m*n) that is filled with false
 2)Create a 2D array called atlanticVisited that is of size O(m*n) that is filled with false
 3)mark the cells that can over flow by doing two iterations along the borders while calling dfs on the current cell
 • overflow from the top border to pacific and bottom border to Atlantic -> call dfs on both top and bottom cell in order to mark cells that can over flow to the pacific(top) or to the bottom(Atlantic)
 • overflow from the left border to pacific and right border to Atlantic -> call dfs on both left and right cell in order to mark cells that can over flow to the pacific(left) or to the bottom(right)
 4) Iterate through the both pacific and Atlantic visited arrays simultaneously and when there positions are both true push position onto to the result array
 • this means that the current position can reach both the pacific and Atlantic ocean
     ◦ pacific visited array marks all positions that can overflow to  the pacific ocean as true
     ◦ Atlantic visited array marks all positions that can overflow to the Atlantic ocean as true
 5)return result array
 */
