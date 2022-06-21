/* 
104. Maximum Depth of Binary Tree
https://leetcode.com/problems/maximum-depth-of-binary-tree/
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
 * @return {number}
 */

const maxDepth = (root) => {
  let maxDepth = 0;
  const dfs = (root, depth) => {
    if (!root) return null;
    maxDepth = Math.max(maxDepth, depth);
    dfs(root.left, depth + 1);
    dfs(root.right, depth + 1);
  };
  dfs(root, 1);
  return maxDepth;
};

/*
Time: O(n)
- n is the total amount of nodes in the given tree
- We iterated through every node in the given tree

Space: Worst: O(n),  Best: O(log(n))
- In the worst case the the binary tree is skewed
   meaning that the call stack has n frames in it
- Best case the binary tree is completely balanced meaning
  that the call stack will have log(n) frames
  - the height of a balanced tree is log(n) 
    meaninfg that the call stack would have log(n) frames
*/

const maxDepth2 = (root) => {
  if (!root) return null;
  let queue = [];
  queue.push(root);
  let level = 0;
  while (queue.length) {
    let size = queue.length;
    for (let i = 0; i < size; i++) {
      let node = queue.shift();
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    level++;
  }
  return level;
};

/*
Time: O(n * n) = O(n^2)
- n is the total amount of nodes in the given tree
- We iterated through every node in the given tree
- We did use the shift metod on every node in the 
  given tree O(n)
- Note: if we used an actual queue instead of an array
  then the time complexity would be O(n).


Space: Worst: O(n)
- In the worst case the  binary tree is a full
   binary tree meaning that at the last level of 
   the tree there will be n/2 nodes and thus making
   the queue hold essentially n nodes,

*/
