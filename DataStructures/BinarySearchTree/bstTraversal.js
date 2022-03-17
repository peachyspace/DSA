/* 
BST Traveral
AlgoExpert: https://www.algoexpert.io/questions/BST%20Traversal
*/

function inOrderTraverse(tree, array) {
  // Write your code here.
  if (!tree) {
    return array;
  }
  inOrderTraverse(tree.left, array);
  array.push(tree.value);
  inOrderTraverse(tree.right, array);
  return array;
}

function preOrderTraverse(tree, array) {
  //Write your code here.
  if (!tree) {
    return array;
  }
  array.push(tree.value);
  preOrderTraverse(tree.left, array);
  preOrderTraverse(tree.right, array);
  return array;
}

function postOrderTraverse(tree, array) {
  if (!tree) {
    return array;
  }
  postOrderTraverse(tree.left, array);
  postOrderTraverse(tree.right, array);
  array.push(tree.value);
  return array;
}

/* 
Time: O(n)
• We explore each node in the BST

Space: O(n)
• 'n' total amount of nodes in tree
• we create an array of length n hence O(n) time
• Note: If we were asked to print out the value of the nodes then the space complexity would be O(d)
	◦ 'd' is the length of the longest branch in the BST
	◦ since the longest branch in the tree will have the  most amount of frames in the call stack than any other branch
*/

/* 
  Edge case: tree empty
Remember to
• pass the array in each recursive call 
• return the array

inOrder
• explore left child
• visit current 
	◦ push current to to array
• explore right child

preOrder
• visit current
	◦ push current to array
• explore left
• explore right

postOrder
• explore left
• explore right
• visit current
	◦ push current to array
  */
