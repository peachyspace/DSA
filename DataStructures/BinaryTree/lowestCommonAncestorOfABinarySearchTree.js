/* 
235. Lowest Common Ancestor of a Binary Search Tree
https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/
*/

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function (root, p, q) {
  let current = root;
  while (current) {
    if (p.val < current.val && q.val < current.val) {
      current = current.left;
    } else if (p.val > current.val && q.val > current.val) {
      current = current.right;
    } else {
      return current;
    }
  }
};
/*
Time: Worst: O(n), Best O(log(n))
- is the toatl amount of nodes in the tree
- Worst case we have a skewed binary search tree
    - we WON'T reduce the nodes to check by half  
      after each iteraion 
    - We visited every node in the tree
- Best Case we have a balanced Binary search tree
    - we reduce the nodes to check by half after 
      each iteraion meaning that we are doing
      O(log(n)) iterations
  
Space: O(1)
- We are using pointer that take up constant space

*/
/*
While loop will run while current is not null

- during each iteration 
    - if p.val < current.val and q.val < current.val
        - p and q are located in the left subtree
        - move current to the left
        - BST's left side has smaller values
    - if p.val > current.val and q.val > current.val
        - p and q are located in the right subtree
        - move current to the right
        - BST's right side has bigger values
    - Else
        - either p.val and q.val don't belong in the same tree
            - This indicates a split which means that the current
               node is the LCA
        OR
        -either p.val or q.val equal current, meaning that
         p or q itself is the LCA 
*/
