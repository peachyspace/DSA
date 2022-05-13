/* 
133. Clone Graph
https://leetcode.com/problems/clone-graph/
*/

/**
 * // Definition for a Node.
 * function Node(val, neighbors) {
 *    this.val = val === undefined ? 0 : val;
 *    this.neighbors = neighbors === undefined ? [] : neighbors;
 * };
 */

/**
 * @param {Node} node
 * @return {Node}
 */

const cloneGraph = function (node) {
  let visited = {};
  const dfs = (current) => {
    if (!current) return current;
    if (visited[current.val]) return visited[current.val]; //returns cloned neighbor
    let newNode = new Node(current.val);
    visited[current.val] = newNode; //adding clone to visited
    for (neighbor of current.neighbors) {
      newNode.neighbors.push(dfs(neighbor)); // pushes cloned neighbor node
    }
    return newNode;
  };
  return dfs(node); //returns the clone of the first given node
};
/*
Time: O(v+e) -> O(n + e), 'n' is the total amount of nodes given in the graph
• the question states that the graph is represented in the test case using an adjacency list.
• We visit every vertices(nodes) and edge once
Space: O(n + h)-> O(n), 'n' is the total amount of nodes given in the graph
• We  create a hash table with 'n' entries
• We use recursion and in the worst case the call stack will have h frames
	◦ h represents the height of the graph
*/

/*
The given node will always be the first node with val = 1. You must return the copy of the given node as a reference to the cloned graph.
create visited hash table
DFS function:use dfs to create the copy of the graph
• if  current is a falsey value then return the node
• if current was visited before then retrieve its clone from the hashtable(visited)
• Since current was not visited before create a clone for current using current's val
• Add the entry current.val : clone
• iterate through current's neighbors
	◦ for every neighbor push the returned value dfs(neighbor)
		‣ we will either:
			• promptly return clone of current using visited[current.val] OR
			• create a clone and push on current's neighbors clones to the clones neighbor array
• return the clone node 
return dfs(node), this returns the clone node of the given node
*/
