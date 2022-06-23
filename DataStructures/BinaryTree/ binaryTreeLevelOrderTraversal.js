/* 
102. Binary Tree Level Order Traversal
https://leetcode.com/problems/binary-tree-level-order-traversal/
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
 * @return {number[][]}
 */

const levelOrder = (root) => {
  if (!root) return [];
  let result = [];
  let queue = [];
  queue.push(root);
  while (queue.length) {
    const tempArr = [];
    let size = queue.length;
    for (let i = 0; i < size; i++) {
      let node = queue.shift();
      tempArr.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    result.push(tempArr);
  }
  return result;
};

/*
Time: Wtih shift() used: O(n * n) = O(n^2)
without shift used: O(n)
- n is the total amount of node in the given binary tree
- We visited every node in the given binary tree
- note we used shift during each iteratin 
  and that is O(n) operation
Space: O(n)
- in the worst case the binary tree can be a 
  full binary tree, which means that the last
  level has n/2 leaves which is essentially 
  n nodes. 
  - The queue at the last level can 
  have n nodes
*/

/*
If root is null the return an empty array
Create a queue
Add root to queue
Create result array
Iterate while the queue is NOT empty
- Create tempArr
- Size = length of queue
- Iterate for size 
    - Take out node
    - Add node.val to tempArr
    - If left not null then add to queue
    -If right not null then add to queue
- Push tempArr to result
Return result

*/
