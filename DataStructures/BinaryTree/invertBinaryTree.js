/* 
226. Invert Binary Tree
https://leetcode.com/problems/invert-binary-tree/
*/

const invertTree = (root) => {
  if (!root) return null;

  let temp = root.left;
  root.left = root.right;
  root.right = temp;

  invertTree(root.left);
  invertTree(root.right);

  return root;
};

/*
Time: O(n) 
- n is the total amount of nodes in the tree
- Iterating through every node of the given tree

Space: O(n)
- We used recursion which means that the call stack  could at most
  hold n frames if the binary tree is skewed
  
*/
/*

We want root of reversed tree

If the root is null return null
Swap left and right subtree values
Call dfs on left
Call dfs on right
Return root because in the end we must return the root of revered tree

*/

const invertTree2 = (root) => {
  if (!root) return null;
  let queue = [];
  queue.push(root);
  while (queue.length !== 0) {
    let root = queue.shift();

    //Swaping left and right subtree
    let temp = root.left;
    root.left = root.right;
    root.right = temp;

    //Adding to queue
    if (root.left) queue.push(root.left);
    if (root.right) queue.push(root.right);
  }

  return root;
};

/*
Time: O(n^2) 
- n is the total amount of nodes in the tree
- Iterating through every node of the given tree
- we are using the shift method(O(n)) every single time
- note: if we used an actual queue instead of an array
  then the time complexity would be O(n).

Space:
- In the worst case our binary tree is a 
  full binary tree, where the leaves level
  has n/2  nodes, which is essentially O(n) leaves
  -At the last level the queue's length will be
   n/2 --> n
  
*/
