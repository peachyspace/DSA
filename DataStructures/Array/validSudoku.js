/* 
36. Valid Sudoku
https://leetcode.com/problems/valid-sudoku/
*/

/**
 * @param {character[][]} board
 * @return {boolean}
 */

const isValidSudoku = function (board) {
  let hashMap = {};
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      let currNum = board[i][j];
      if (currNum === ".") continue;
      //get coordinates of the grid
      let x = Math.floor(i / 3);
      let y = Math.floor(j / 3);
      let isDuplicate =
        hashMap[`r${i}${currNum}`] ||
        hashMap[`c${j}${currNum}`] ||
        hashMap[`s${x}${y}${currNum}`];
      if (isDuplicate) return false;
      //add to hashmap
      hashMap[`r${i}${currNum}`] = 1;
      hashMap[`c${j}${currNum}`] = 1;
      hashMap[`s${x}${y}${currNum}`] = 1;
    }
  }
  return true;
};
/*
Time: O(m*n)
• m is the length of the board
• n is the length of the board[0]
• we iterate through the whole board which means we iterated through n * m
Space: O(m*n)
• at worst case the board is completely filled and that means that we create a hash table that takes up: 
	◦ O(m*n) + O(m*n)+O(m*n) =O(3(m *n))-> O(m*n)
	◦    row + column + sub-grid
*/

/*
• use a hash map to keep track of the rows, columns, and grids
• use a nested for loop to iterate through all the elements in the child array
	◦ if the current element is '.' then move on to the next iteration
	◦ get the x and y coordinate of the grid 
		‣  x = Math.floor(i / 3) , y = Math.floor(j / 3)
	◦ if the current element is in a row, column, and/ or sub-grid already then return false
	◦ else add the current element to the hash table a part of the row, column, and grid
• if you are out of the nested for loop then your sudoko grid is valid and return true
*/
