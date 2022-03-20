/* 
AlgoExpert: https://www.algoexpert.io/questions/Node%20Depths
*/

//Recusrsive
function nodeDepths(root) {
  // Write your code here.
  return calcDepths(root, 0);
}
function calcDepths(current, depth) {
  if (current === null) {
    return 0;
  }
  return (
    depth +
    calcDepths(current.left, depth + 1) +
    calcDepths(current.right, depth + 1)
  );
  //traversing each node branch by branch (dfs)
  /*
  the total depth is 
      the current depth 
        returned value of calcDepths(left child, depth+1)
      + returned value of calcDepths(right child, dept+1)
  */
}
class BinaryTree {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

/* 
Recursive
Time: O(n)
• We have to iterate through all the nodes in the binary tree in order to get the sum of all depths of the nodes in the tree
	◦ done with recursive calls
• At every node we are not doing anything that is computationally expensive. All the operations done to each node are constant time operations
	◦ We are adding depth to the running sum
	◦ Popping values of the stack
	◦ Pushing value to the top of the call stack

Space: O(h)
• 'h' is the height of the binary tree
	◦ When we make all of these  recursive function calls, you are going through one branch of recursive calls
	◦ Balanced Binary Tree: The longest branch will have the most frames in the call stack than any other branch
	◦ Skewed Binary Tree: There is only one branch and we have at most 'n' recursive calls in the call stack
• We could used depth instead of height but in those problems when I used the word, depth of the binary tree, I really mean the depth of the deepest node in the binary tree. So 'h' is used instead in order to not be confusing
*/
/*
  Recursive approach
• when you hit leaf node we return 0
• make call tor recursive
• total node depths= d + f( node.left, depth +1) + f(node.right, depth+1)
*/

//Iterative
function nodeDepths(root) {
  let stack = [];
  stack.push({ node: root, depth: 0 });
  let sum = 0;

  while (stack.length) {
    //iterating branch by branch (dfs)
    let current = stack.pop(); //stack used for dfs
    sum += current.depth;
    if (current.node.left) {
      stack.push({ node: current.node.left, depth: current.depth + 1 });
    }
    if (current.node.right) {
      stack.push({ node: current.node.right, depth: current.depth + 1 });
    }
  }
  return sum;
}

class BinaryTree2 {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

/* 
Iterative
Time: O(n)
• We have to iterate through all the nodes in the binary tree in order to get the sum of all depths of the nodes in the tree
	◦ done with while loop
• At every node we are not doing anything that is computationally expensive. All the operations done to each node are constant time operations
	◦ We are adding depth to the running sum
	◦ Popping values of the stack
	◦ Pushing value to the top of the call stack

Space: O(h)
• Balanced Binary Tree: The most amount of elements in the stack will the value if the height of the tree
	◦ The array you create is at most the value of the length of the binary tree 
• Skewed Tree: The most amount of elements in the stack will be the total amount of node's in the tree
*/

/* 
Iterative approach(using a stack instead of recursion)
• start at root node
• add root and its depth to the stack 
• iterate as long as the stack is not empty
	◦ pop off item of the stack 
	◦  apply our algorithm
		‣ add depth to running sum
		‣ push both the left child and its depth (depth+1) on to the stack
		‣  push both the right child and its depth(depth+1) on to the stack
*/
