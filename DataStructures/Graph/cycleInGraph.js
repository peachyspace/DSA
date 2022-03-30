/* 
Cycle In Graph
https://www.algoexpert.io/questions/Cycle%20In%20Graph
*/

//Overall cycleInGraph traverses at most O( v + e ) time
function cycleInGraph(edges) {
  const colors = new Array(edges.length).fill("WHITE");
  for (let vertex = 0; vertex < edges.length; vertex++) {
    //at most O( v ) time
    if (colors[vertex] !== "WHITE") continue;
    let containsCycle = traverseNode(vertex, edges, colors); // at most( v + e ) time
    if (containsCycle) return true;
  }
  return false;
}
/*
through out the whole iteration of the for loop in cycleInGraph the traverseNode function will iterate at most O( v + e ) time
*/
const traverseNode = (vertex, edges, colors) => {
  colors[vertex] = "GREY";
  let neighbors = edges[vertex];
  for (let i = 0; i < neighbors.length; i++) {
    let neighbor = neighbors[i];
    //recursive stack holds all the ancestors of the neigbor
    //black nodes are not in the recursive stack
    if (colors[neighbor] === "BLACK") continue;

    //grey nodes are in the recursive stack
    if (colors[neighbor] === "GREY") return true;
    let containsCycle = traverseNode(neighbor, edges, colors);
    if (containsCycle) return true;
  }
  colors[vertex] = "BLACK";
  //given vertex will not be in the recursive stack
  return false;
  //nodes has no descendants that have outgoing edges to it's ancestor
};

/* 
Time: O( v + e )
• v is the number of vertices in the graph
• e is the number of edges in the graph
• In the DFS function we are not only traversing the vertices but also the vertices edges
	◦ we will at most traverse O( v + e ) time

Space: O( v )
• v is the number of vertices in the graph
• we have an array which is the size of our graph( # of vertices in the graph )
*/

/* 
• 0: white - undiscovered
• 1: grey - in stack //recursive stack holds all the ancestors of the node that DFS is performed on  
	◦ been visited but we're still looking at all of its descendants
• 2: black - finished
	◦ node is no longer in the recursive stack / no longer looking for descendants)
	◦ if we find an edge to this node, its not a back edge
		‣ because its not an ancestor of whatever node who has it as it's edge

Steps
• create an array called colors who is the size of the graph( # of vertices in the graph)
	◦ filled with 0's or 'white'
• iterate through the vertices of the graph
	◦ if a the index rep. the node is not white then skip
	◦ As soon as we call DFS on a vertex we go the index rep. the vertices in the colors array and make that position hold 1 or 'grey'
		‣ iterate through the vertices neighbors
			• if the neighbor is grey  then there is a cycle
			• if a neighbor is black then skip 
				◦ the neighbor is not an ancestor of the given node
			• Call DFS on the neighbor because we have not performed a DFS traversal on the this neighbor
				◦ this neighbor is a tree edge
	◦ After we are done iterating through all of the vertex's neighbors then we know that the given vertex has no edge connecting to an ancestor vertex
		‣ the index rep. the given vertex in the colors array will now hold black
		‣ return false
*/
