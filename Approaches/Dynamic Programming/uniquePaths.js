/* 
62. Unique Paths
https://leetcode.com/problems/unique-paths/
*/

//recursive approach: time limit exceeded
const uniquePaths1 = function (m, n) {
  return helper1(m, n, 0, 0);
};

const helper1 = function (m, n, row, col) {
  if (row > m || col > n) return 0;
  if (row === m - 1 && col === n - 1) return 1;

  //We can either go down or right
  let goDown = helper1(m, n, row + 1, col);
  let goRight = helper1(m, n, row, col + 1);

  return goDown + goRight;
};
/* 
https://leetcode.com/problems/unique-paths/discuss/1581998/C%2B%2BPython-5-Simple-Solutions-w-Explanation-or-Optimization-from-Brute-Force-to-DP-to-Math
Time: 2^m+n
• We create a recursive tree  and we don't know the total amount of nodes in the tree and so we must make this calculation:
	◦ recursive calls per frame   ^ max amt. of frames in the call stack
• m == row, n=== column
• the call stack will never have more than m+n recursive frames at any given time
• each recursive function call's itself twice
Space: O(m+n)
• space complexity depends on the max amt. of frames in the call stack at any given time
*/

/* 
• call helper function
	◦ base case out of bounds: 
		‣ if( row >m || col > n then return 0 since you are out of bounds 
	◦ base case: target reached
		‣ if i ===m-1 && j ===n-1 then return 1 since you reached the target
	◦ goRight: helper(m, n, row, co+1)
	◦ goDown: helper(m, n, row+1, col)
	◦ return goRight + goDown 
DFS search that will pop off the call stack if we reach the target or we are outside of boundary
• WE always go towards the target: We don't travel along an already discovered path
	◦ since we cant go up we can't undo going down
	◦ since we can't go left we can't undo right
*/

// DP: recursive  + memoization
const uniquePaths2 = function (m, n) {
  const memo = [...new Array(m)].map((x) => new Array(n).fill(-1));
  return helper(m, n, 0, 0, memo); // always returns amt. unique paths by returning 0,1, or updating memo[row][col]
};

const helper = function (m, n, row, col, memo) {
  if (row >= m || col >= n) return 0; // out of bounds - invalid
  if (row === m - 1 && col === n - 1) return 1; // reached end - valid path
  if (memo[row][col] === -1) {
    // store the result in dp[i][j]
    //We can either go down or right
    let goDown = helper(m, n, row + 1, col, memo);
    let goRight = helper(m, n, row, col + 1, memo);
    memo[row][col] = goDown + goRight;
  }

  return memo[row][col]; // directly return since it's  already calculated
};

/* 
m = 3, n =7
[   
  [28, 21, 15, 10, 6,    3,   1],
  [7,  6,   5,   4, 3,   2,   1],
  [1,  1,   1,   1, 1,   1,  -1 ]
]
*/
/* 
Time: O(m*n)
• the answer to each cell is calculated only once and memoized. 
• There are m*n cells and therefore the process takes O(m*n) time
Space: O(m*n) + O(m+n)-> O(m*n)
• the recursive stack will never have more than m+n frames at any given time
• we create a 2D array of of size m*n 
*/

//DP: Bottom Up---> Tabulation
const uniquePaths3 = function (m, n) {
  const dp = new Array(m).fill(0);
  for (let i = 0; i < dp.length; i++) {
    dp[i] = new Array(n).fill(1);
  }

  for (let row = m - 2; row >= 0; row--) {
    // skipped last row
    for (let col = n - 2; col >= 0; col--) {
      //skipped last column
      dp[row][col] = dp[row][col + 1] + dp[row + 1][col];
      // right            down
    }
  }
  return dp[0][0];
};
/* 
Time: O(m*n)
• we iterate though every cell in the 2D array of size m*n
	◦ during each iteration we only  do operations that take O(n) time 

Space: O(m*n)
• we create a 2D array of size m*n
*/
/* 
m = 3, n =7
[   
  [28, 21, 15, 10, 6,  3,   1],
  [7,  6,     5,   4, 3,   2,   1],
  [1,  1,     1,   1, 1,   1, -1 ]
]
Filled with only 1's because:
• last row: every position in that row can only go right
• last col: every position in that can only go down

Notice that the last row and column are filled with 1's
*/

//DP: Bottom Up(Tabulation) with Space Optimization
const uniquePaths4 = function (m, n) {
  const dp = new Array(n).fill(1); //dp is now a 1D array og length n

  for (let row = m - 2; row >= 0; row--) {
    for (let col = n - 2; col >= 0; col--) {
      dp[col] = dp[col] + dp[col + 1];
      // currPosition,   right
    }
  }
  return dp[0];
};

/* 
Time:O(m*n)
• We iterate through each element in the array of length n for m times
	◦ during each iteration we only do operations that take O(1) time

Space: O(n)
• we create an array of length n
*/

/* 
m = 3, n =7
[   
  [28, 21, 15, 10, 6,  3,   1],
  [7,  6,     5,   4, 3,   2,   1],
  [1,  1,     1,   1, 1,   1, -1 ]
]

 [1, 1, 1, 1, 1,  1,   1]
 [1, 1, 1, 1, 1,  2,   1]
 [1, 1, 1, 1, 3,  2,   1]
 [1, 1, 1, 4, 3,  2,   1]
 [1, 1, 5, 4, 3,  2,   1]
 [1, 6, 5, 4, 3,  2,   1]
 [7, 6, 5, 4, 3,  2,   1]

 We only need one row filled with 1's in order to find the unique paths to the bottom right corner
*/
