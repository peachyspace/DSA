/* 
110. Balanced Binary Tree
https://leetcode.com/problems/balanced-binary-tree/
*/

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */

const isBalanced = (root) => {
  let balanced = true;
  const dfs = (root) => {
    if (!root) return 0;

    let leftPath = dfs(root.left);
    let rightPath = dfs(root.right);

    if (leftPath !== rightPath) {
      if (leftPath < rightPath && leftPath + 1 !== rightPath) {
        balanced = false;
      } else if (leftPath > rightPath && leftPath !== rightPath + 1) {
        balanced = false;
      }
    }
    // Height of any node/tree is the max height of its left or right path till the leaf nodes.
    return Math.max(leftPath, rightPath) + 1;
  };
  dfs(root);
  return balanced;
};
/*
Time: O(n)
- We visit every node in the given tree

Space: Worst: O(n), Best: O(log(n))
- In the worst case the binary tree is skewed and 
  that can cause call stack to have n frames
- In the best case the binary tree is balanced which
  means that the space used up by the call stack
  is the height of the tree but since this tree is
  a binary tree, the call stack can have log(n) frames
  
*/

/*
Note: If the recursive problem requires you to calculate to values then use a helper function. The helper function should be inside the main function 
- In this case we need to calculate if the left and right nodes are balanced(boolean value),   which requires us to calculate the height(integer value) of each node 
*/

/*
Let isBalanced = true
DFS 
- If root is null then return 0

- leftPath = dfs(root.left)
- rightpath = dfs(root.right)

- If leftPath !==  rightPath then idBalnced =  false
- If  leftPath <  rightPath && leftPath +1 !==  rightPath then isBalnced =  false
- If  leftPath >  rightPath && leftPath !== rightPath+1 then isBalanced = false
- Return max(leftPath, rightPath) + 1
    - Height of any node/tree is the max height of its left or right path till the leaf nodes.
    - Add 1 because it gets us the path from the parent node to the leaf

Return isBalanced

*/
const isBalanced2 = (root) => {
  let balanced = true;
  const dfs = (root) => {
    if (!root) return 0;

    let leftPath = dfs(root.left);
    let rightPath = dfs(root.right);

    if (Math.abs(leftPath - rightPath) > 1) {
      balanced = false;
    }
    // Height of any node/tree is the max height of its left or right path till the leaf nodes.
    return Math.max(leftPath, rightPath) + 1;
  };
  dfs(root);
  return balanced;
};
