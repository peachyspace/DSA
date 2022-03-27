/* 
River Sizes
 algoexpert.io/questions/River%20Sizes
*/

function riverSizes(matrix) {
  let sizesOfRivers = [];
  /*
      The Array.map() method allows you to 
      iterate over an array and modify its 
      elements using a callback function. 
      */
  //each element in the matrix ARRAY is a subarray(row)
  //we can call map function on the subarrays(row)
  const visited = matrix.map((row) => row.map((element) => false)); //O(n) time
  // we map every row and at every row we map the columns
  //above, we travese every element in  the matrix once
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (visited[i][j]) continue;
      traversal(i, j, matrix, visited, sizesOfRivers);
    }
  }
  return sizesOfRivers;
}

const traversal = function (i, j, matrix, visited, sizesOfRivers) {
  // incharge of visiting nodes and
  // finding size of the current river if there is a river
  let nodesToExploreStack = [[i, j]];
  let currentRiverSize = 0;
  while (nodesToExploreStack.length) {
    //we can do bfs or dfs b/c we want to travese
    //the nodes neighbors that are unvisited while
    //simultaneously updating the size value when
    //we encounter a node that has the value 1
    let removed = nodesToExploreStack.pop();

    i = removed[0];
    j = removed[1];

    if (visited[i][j] === true) continue; //skipping visited
    visited[i][j] = true; //adding to visited matrix
    if (matrix[i][j] === 0) continue; //skipping zero
    currentRiverSize++; //only incrementing when node is 1
    let unvisitedNeighborsArray = getUnvisitedNeighbors(i, j, matrix, visited);
    for (let i = 0; i < unvisitedNeighborsArray.length; i++) {
      let neighbor = unvisitedNeighborsArray[i];
      nodesToExploreStack.push(neighbor);
    }
  }
  if (currentRiverSize > 0) sizesOfRivers.push(currentRiverSize);
};
const getUnvisitedNeighbors = function (i, j, matrix, visited) {
  let unvisitedNeighborsArray = [];
  //Top: potenrtially no neighbor above current node
  // if i === 0 then visited[0 -1]-> visited[-1] === undefined
  if (i > 0 && !visited[i - 1][j]) unvisitedNeighborsArray.push([i - 1, j]);

  //Bottom: potentially no neighbors to the bottom of current node
  //i === matrix.length-1 then visited[i+1] === undefined(zero indexed)
  if (i < matrix.length - 1 && !visited[i + 1][j])
    unvisitedNeighborsArray.push([i + 1, j]);

  //Left: potentially no neighbors to the left of the currrent node
  //j===0 then visited[i][0-1] -> visited[i][-1] === undefined
  if (j > 0 && !visited[i][j - 1]) unvisitedNeighborsArray.push([i, j - 1]);

  //Right: potentially no neighbor to the right of current node
  //j===matrix[0].length-1 then visited[i][j+1] === undefined(zero indexed)
  if (j < matrix[0].length - 1 && !visited[i][j + 1])
    unvisitedNeighborsArray.push([i, j + 1]);

  return unvisitedNeighborsArray;
};

/* 
Time: O(W * H) or O(n) where 'n' is the total amount of elements in the matrix
• 'w' is the width of the matrix (length of a row)
• 'h' is the height of the matrix(length of a column)
• In this algorithm we are visiting every single node and that's it
	◦ when ever we visit a node we mark it as visited and don't revisit it again
We do have a nested for loop but that is just helping us traverse the nodes in the matrix, however in this traversal we do skip nodes that we have already visited in order avoid revisiting nodes
• skipping('continue' keyword) nodes is like a constant time operation
• if we don't skip the node then we execute constant time operations
	◦ we are getting up to 4 neighboring nodes(non zero nodes)
		‣ the traversal of the neighboring nodes is a constant time operation because every node has up to 4 neighboring nodes(non zero nodes)
		‣ when we traverse these neighbors we skip those have already been visited or we just add it to the stack or queue and we will eventually visit them when remove it from the stack or queue
• Overall we do visit every node once and when we are traversing the neighbors of a node we first peek and if it has been visited then we skip the neighbor

Space: O( W * H ) or O( n )
• We are building a boolean filled matrix that is the exact size as the given matrix
• the array of river sizes will never take up more space than the boolean matrix because its a one dimensional array of river sizes
  */

/* 
we do dfs or bfs starting from the given node until we hit null or visited
• this allows us to get the size of the river if it exists at the given node
• Overview 
	◦ First map through the whole map and make very element in the new matrix 0
		‣ we use a matrix instead of a hashTable because it will be easier to keep insert and look up value in this visited matrix  
		‣ having an identical sized matrix of booleans makes most sense
	◦ traverse all the nodes in the graph and during each iteration mark them as visited
		‣ if the node was not in visited then traverse all of its neighbors
			• call dfs or bfs(traversal function) on neighbors when they have not been visited
				◦ add given node  to stack or queue
				◦ iterate through the stack or queue as long as it is not empty
					‣ remove node from stack or queue
					‣ when traversing a neighbor mark it as visited (assign true)
					‣ if the removed nodes value is 1 then add to the size 
					‣ if the removed nodes value is 0 then skip this iteration (use 'continue' keyword) because we are trying to find the size of the river not he land
					‣ get the removed node's neighbors by calling a function(getUnvisitedNeighbors function) that returns the top, right, bottom, and left neighbors of the removed node
					‣ Traverse the removed node's neighbors and if a nodes neighbor has not been visited then add to stack or queue 
				◦ After we stop iterating through the given nodes neighbors and the size is greater than 0 then we add the size of the river to the array of size
	◦ return the size array
*/
