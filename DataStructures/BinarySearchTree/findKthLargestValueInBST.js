/*
Find Kth Largest Value in BST 
https://www.algoexpert.io/questions/Find%20Kth%20Largest%20Value%20In%20BST
*/

class BST {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}
class TreeInfo {
  constructor(nodesVisited, lastVisitedNodeValue) {
    this.nodesVisited = nodesVisited;
    this.lastVisitedNodeValue = lastVisitedNodeValue;
  }
}

function findKthLargestValueInBst(tree, k) {
  let treeInfo = new TreeInfo(0, 0);

  reverseInOrderTraverse(tree, k, treeInfo);

  return treeInfo.lastVisitedNodeValue;
}
function reverseInOrderTraverse(node, k, treeInfo) {
  if (!node || treeInfo.nodesVisited === k) {
    return;
    //when we hit the base case we start popping
    //off the call stack
  }
  reverseInOrderTraverse(node.right, k, treeInfo);
  if (treeInfo.nodesVisited < k) {
    treeInfo.nodesVisited++;
    treeInfo.lastVisitedNodeValue = node.value;
    reverseInOrderTraverse(node.left, k, treeInfo);
  }
  /*when treeInfo.nodesVisited > k then left
	subtree wont be explored
	there is nothing after this if statement and so  
	we pop off the function call of the call
	stack undefined is returned since this function
	doenst return nothing except when dealing with the 
	base case
	*/
}

/* 
Time: O( h + k )
• 'h' is the height of the binary search tree
• In order to find the kth node we must traverse down at most  the entire height of the BST
	◦ we traverse down the tree by exploring the right node until we hit null
• After we traverse the height we visit the at most 'k' nodes

Space: O( h )
• 'h' is the height of the binary search tree
• We will have at most 'h' frames in the call stack before we start popping off frames from the call stack
	◦ when we begin to visit 'k' nodes, we also start to pop off frames from the call stack
*/

/* 
Perform a reverse inOder traversal (descending order (high to low))
• Visit the nodes with greater values first and then visit nodes of lesser value IF WE HAVE TO
	◦ Create a class called treeInfo class
		‣ number of nodes visited 
		‣ the value of the last node visited
		‣ We create this class so we can save the value of nodesVisited and lastVisitedNodeValue.In recursive calls integers and strings are overwritten since they are passed by value. However, objects are not since they are passed by reference 
			• any changes made to an object will affect all variables that hold that object since they point to the same location
	◦ Call the recursive function
	◦ return treeInfo.lastNodeVisited

	◦ if node is null or nodesVisited === k
		‣ return 
	◦ if treeInfo.nodesVisited < k then
		‣ explore right 
		‣ visit
			• increment the number of nodes visited
			• lastValue == current.value
			• the kth value we visit is the kth largest value
		‣ explore left

Keep track of
•  the number of nodes visited
	◦ allows us to know when we reach the kth node
• the value of last node that we visited
	◦ when we reach the kth node we can return it's value
*/
