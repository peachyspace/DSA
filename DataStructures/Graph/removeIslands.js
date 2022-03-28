/* 
Remove Islands
https://www.algoexpert.io/questions/Remove%20Islands
*/

function removeIslands(matrix) {
  // Tell us if a specific postion is connected to the border
  //if it is connected to the border then we can't modify it
  const onesConnectedToBorder = [];
  for (let row = 0; row < matrix.length; row++) {
    onesConnectedToBorder.push([]);
    for (let col = 0; col < matrix[0].length; col++) {
      onesConnectedToBorder[row].push(false);
    }
  }
  //Iterating the border of the matrix
  //if a postion is equal to 1 then perform dfs on it
  //the nested for loops run in O( w * h ) time
  for (let row = 0; row < matrix.length; row++) {
    for (let column = 0; column < matrix[row].length; column++) {
      //check if the current postion is at the border
      let rowIsBorder = row === 0 || row === matrix.length - 1;
      let colIsBorder = column === 0 || column === matrix[row].length - 1;
      //using the above variables to determine whether or not we are at the border
      let isBorder = rowIsBorder || colIsBorder;
      if (isBorder === false) continue; // allows us to target the border
      if (matrix[row][column] !== 1) continue; //allows us to only call dfs on 1's
      findOnesConnectedToBorder(matrix, row, column, onesConnectedToBorder); //O( w * h) time
      //position passed to the findOnesConnectedToBorder function is a 1 that
      //is connected to the border
    }
  }
  /*
  time complexity of 2nd nested for loop is O(w*h) time 
  What is total amount of iterations done during 
  the exectuion of the nested for loop?
  - the nested for loop wont do more than O(w * h) iterations
  - the findOnesConnectedToBorder function wont do more 
      than O(w * h) iterations throughout the whole execution of the nested for loop
      • In the findOnesConnectedToBorder function we execute DFS(O(w*h)time) only when a 
          1 has not been visited(turned true) 
              ‣ If all the 1's in the matrix that only holds 1's have been visited and we 
              have not finished executing the nested for loop we wont do any more DFS traversals 
                - We can never do more than O(w * h) iterations
  O(w * h) + O(w * h) = 2 O(w * h) = O(w * h) time
  */

  //looping through the matrix again and this time, we simply remove any 1's
  //that are not connected to the border(a postion that is true in the boolean matrix)
  //We are not looping through the first and last row and first and last column
  // because we know that any ones in those positons will be connceted to the border
  for (let row = 1; row < matrix.length - 1; row++) {
    //skipping 1st & last row
    for (let col = 1; col < matrix[row].length - 1; col++) {
      //skippin 1st & last col
      //iterating through the  inner matrix
      if (onesConnectedToBorder[row][col]) continue;

      matrix[row][col] = 0; //any position in the inner matrix
      //that is false in the boolean matrix it
      //changed to a 0
    }
  }

  return matrix;
}
/*modifies the onesConnectedToBorder by changing postions(1's) that are 
  connected to the border to hold true, this is done by using dfs or bfs traversal*/
function findOnesConnectedToBorder(
  matrix,
  startRow,
  startCol,
  onesConnectedToBorder
) {
  //perform a dfs traversal starting from the position startRow, startCol
  let stack = [[startRow, startCol]]; //filled with positions
  while (stack.length > 0) {
    const currentPosition = stack.pop();
    //assigning values by using destructuring assignment syntax
    // •unpacking values from the array into distinct variables
    const [currentRow, currentCol] = currentPosition;
    const alreadyVisited = onesConnectedToBorder[currentRow][currentCol];
    if (alreadyVisited) continue; //prevents us from considering the same position multiple times
    onesConnectedToBorder[currentRow][currentCol] = true; //marking a position connected to border&&visited
    //expanding outwards at every newly updated postion
    let neighbors = getNeighbors(matrix, currentRow, currentCol); //O(1)time
    for (let i = 0; i < neighbors.length; i++) {
      let neighbor = neighbors[i];
      const [row, col] = neighbor;
      if (matrix[row][col] !== 1) continue; // skipping positions that hold 0's

      stack.push(neighbor); // add position of neighbor that holds a 1
    }
  }
}

const getNeighbors = (matrix, row, col) => {
  //O(1) time
  let neighbors = []; //populate array with valid neighbors(up,down,left,right)
  const numRows = matrix.length;
  const numCols = matrix[row].length;
  //looking for the positions up, down, left, and right neighbor
  if (row - 1 >= 0) neighbors.push([row - 1, col]); //UP
  if (row + 1 < matrix.length) neighbors.push([row + 1, col]); //DOWN
  if (col - 1 >= 0) neighbors.push([row, col - 1]); //LEFT
  if (col + 1 < matrix[row].length) neighbors.push([row, col + 1]); //RIGHT

  return neighbors; //these neighbors(up,down,left,right) are all valid
  //meaning they are not undefined
};

/* 
 Time: O( w * h ) + O( w * h ) + O( w * h ) + O(1) -> O( w * h )
• w is the width/columns in the matrix
• h is the height/rows in the matrix
• The removeIslands function has 3 nested for loops that all take O( w • h ) time 
• What is total amount of iterations done during the execution of the 2nd nested for loop?: O(w*h) + O(w*h) = 2(O(w*h)) -> O(w*h) time
	◦ the nested for loop wont do more than O(w * h) iterations
	◦ the findOnesConnectedToBorder function wont do more than O(w * h) iterations throughout the whole execution of the nested for loop
	◦ We can add these complexities together because for each iteration of the nested for loop findOnesConnectedToBorder function is not doing O(w*h) iterations. Instead findOnesConnectedToBorder stops iterating once it does O(w*h)
		‣ Its like we have two separate for loops
• getNeighbors function takes O(1) time 
	◦ all of the operations take O(1) time to execute

Space:O( w * h )
• w is the width/columns in the matrix
• h is the height/rows in the matrix
• We create a matrix that is the exact same size as the input matrix
• We also create a stack that could potentially at some point in time have almost every single position in the 2D matrix in it
 */
