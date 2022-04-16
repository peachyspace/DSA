/* 
79. Word Search
https://leetcode.com/problems/word-search/
*/
//'.' used to mark the path
const exist = (board, word) => {
  let path = new Set();
  let row = board.length;
  let col = board[0].length;
  const dfs = (r, c, index) => {
    if (index === word.length) return true;
    if (r < 0 || c < 0 || r >= row || c >= col || word[index] !== board[r][c])
      return false;
    if (board[r][c] === ".") return false;
    let temp = board[r][c];
    board[r][c] = ".";
    let result =
      dfs(r - 1, c, index + 1) ||
      dfs(r + 1, c, index + 1) ||
      dfs(r, c - 1, index + 1) ||
      dfs(r, c + 1, index + 1);
    board[r][c] = temp;
    return result;
  };
  for (let m = 0; m < row; m++) {
    for (let n = 0; n < col; n++) {
      if (dfs(m, n, 0) === true) return true;
    }
  }
  return false;
};
//set used to mark path
const existWithSet = (board, word) => {
  let path = new Set();
  let row = board.length;
  let col = board[0].length;
  const dfs = (r, c, index) => {
    if (index === word.length) return true;
    if (r < 0 || c < 0 || r >= row || c >= col || word[index] !== board[r][c])
      return false;
    const arrStr = `${r}|${c}`;
    if (path.has(arrStr)) return false;
    path.add(arrStr);
    let result =
      dfs(r - 1, c, index + 1) ||
      dfs(r + 1, c, index + 1) ||
      dfs(r, c - 1, index + 1) ||
      dfs(r, c + 1, index + 1);
    path.delete(arrStr);
    return result;
  };
  for (let m = 0; m < row; m++) {
    for (let n = 0; n < col; n++) {
      if (dfs(m, n, 0) === true) return true;
    }
  }
  return false;
};

/* 
Time: O( m * n * 4 ^ w ) at each position in the board we will call dfs 
• m is the rows(length of board)
• n is the columns(length of board[0]
• w is the length of the given word
• iterating through the board takes O(m * n) time
• the dfs recursive function time complexity: O( 4 ^ w)
	◦ total number of recursive calls(max amt. of frames in the call stack): O( 4 ^ w)
		‣ we are calling dfs 4 times for the length of the given word
			• note the call stack will have at most word.length frames at any given time but the total amount of times we call the recursive function is O( 4 ^ w)
		‣ Ex: if the length of the word(CAT) is 3 then that means:
			• C: 1st dfs call: we recursively call 4 times (4^1 calls so far)
			• A: 2nd dfs call: we recursively call 4 times(4^2 calls so far)
			• T: 3rd dfs call: we recursively call 4 times(4^3 calls so far)
	◦ time complexity of additional operations for each recursive call:O(1)
Space: O(w)
• recursion takes up the most space in the backtracking function
	◦ The max of frames in the call stack is the length of the given word
		‣ each frame take up space
*/

/* 
Backtracking is the only solution
• create a set that keeps track of our current path 
	◦ makes sure that we don't revisit the same position multiple times within our current path
• dfs function (row, col, index)
	◦ Base Case 1:Don't call dfs again because the prior recursive dfs call has the found the last word and so we don't want to look for other letters 
		‣ if index = length of the word then return true
	◦ Base Case 2:Don't call dfs on invalid positions such as:
			• past the top border: r < 0
			• past the left border: c < 0
			• past the bottom border: r >= board.length
			• past the right boarder: c >= board[0].length
			• the current character(word[index]) is not equal to the character at  current position: word[index] !== board[r][c]
			• the current position is in the path(set data structure), this means we are visiting the same position twice within our path: (r, c) in path
		‣ return false
	◦ Choose: At this point we found the character we are looking for and that allows us to add the current position to the path or mark it as part of the path
		‣ if marking then make sure to save original value in a temp variable before marking with '.'
	◦ Explore: We are looking for the result of the dfs
		‣ result =( dfs(top neighbor+1) + dfs(bottom neighbor+1) + dfs(right neighbor+1) + dfs(left neighbor+1) )
			• result can either have a false or true value
			• we only need of dfs recursive call to return true in order for result to be set to true
	◦ Un-choose: remove current position from path or un-mark it
		‣ since we are no longer using that position to create the word
		‣ if you marked the path then assign the position to hold the temp(orig. value) variable
	◦ return result
		‣ we need to return result so when we explore dfs can have a true or false value
• iterate through each position in the board and call the dfs function on it
	◦ if the dfs function returns true then return true since you found the function
• if we didn't return true when we traversed through the board then we can confidently say that the word doesn't exist in the board and so return false
*/
