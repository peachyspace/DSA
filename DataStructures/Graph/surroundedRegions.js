/* 
130. Surrounded Regions
https://leetcode.com/problems/surrounded-regions/
*/

/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
const solve = function (board) {
  for (let m = 0; m < board.length; m++) {
    for (let n = 0; n < board[0].length; n++) {
      if (
        (board[m][n] === "O" && m === 0) ||
        n === 0 ||
        m === board.length - 1 ||
        n === board[0].length - 1
      ) {
        dfs(m, n, board);
      }
    }
  }

  for (let m = 0; m < board.length; m++) {
    for (let n = 0; n < board[0].length; n++) {
      if (board[m][n] === "O") {
        board[m][n] = "X";
      }
    }
  }
  for (let m = 0; m < board.length; m++) {
    for (let n = 0; n < board[0].length; n++) {
      if (board[m][n] === "T") {
        board[m][n] = "O";
      }
    }
  }
};

const dfs = (m, n, board) => {
  if (
    m < 0 ||
    n < 0 ||
    m > board.length - 1 ||
    n > board[0].length - 1 ||
    board[m][n] === "X" ||
    board[m][n] === "T"
  )
    return;

  board[m][n] = "T";

  dfs(m - 1, n, board); // top neighbor
  dfs(m, n - 1, board); // left neighbor
  dfs(m + 1, n, board); // bottom neighbor
  dfs(m, n + 1, board); // right neighbor
};

/*
Time: O(3(m*n)) -> O(m*n)
• Given an m x n matrix board
• We iterate over every cell in the board 3 to 4 times
	◦ increased to 4 because of recursion function

Space: O(m *n)
• We used recursion and in the worst case the grid is filled with 'O''s then the call stack will have m*n frames at one point since all the 'O''s are connected to border
*/

/*
Capture everything except un-surrounded regions ->  capture 'O''s on the boarder and any 'O'connected to it
• by focusing on flipping O's connected to the boarder to 'T''s we can then simply iterate over the board and flip 'O''s to 'X''s
	◦ flip 'O''s connected to the boarder by using dfs
• Just remember to flip the 'T''s back to 'O'
*/

/*
main function
Iterate through the board call dfs on any 'O' on the border
• dfs allows us to mark all the 'O''s that are connected to 'O' on the boarder
• This modifies the board to only have 'O''s that are not connected to the boarder and are surrounded by 'X''s
iterate through the board and flip any cell that holds an 'O' to 'X'  
iterate through the board flip any cell that holds a 'T' to a 'O'

dfs(m, n, board) 
• any cell that is past the top OR left OR bottom OR right OR is an 'X' OR is a 'T' will not be flipped
• board[m][n] = 'X'
	◦ allows us to recursively flip non-boarder 'O''s surrounded by 'X''s to 'O''s
	◦ prevents us from visiting this cell again
• call dfs on its neighbors
	◦ dfs(m-1, n, board) -> top neighbor
	◦ dfs(m, n-1, board) -> left neighbor
	◦ dfs(m+1, n, board)-> bottom neighbor
	◦ dfs(m, n+1, board)-> right neighbor
*/
