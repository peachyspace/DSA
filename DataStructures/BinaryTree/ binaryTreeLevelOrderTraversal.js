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
  const result = [];
  const dfs = (root, level) => {
    if (!root) return;
    if (!result[level]) {
      //subarray for this
      //level is created
      result.push([]);
    }
    result[level].push(root.val);

    dfs(root.left, level + 1);
    dfs(root.right, level + 1);
  };
  dfs(root, 0);
  return result;
};
/*
Time:  O(n)
- n is the total amount of node in the given binary tree
- We visited every node in the given binary tree once

Space: Worst:O(n), Best: O(log(n))
- in the worst case the binary tree can be 
  skewed, which means that call stack can
  can have n frames 
- In the best case the binary tree is balanced
  ,meaning that the queue can hold at most the 
  height of the tree.
  - In this case we have a binary tree, means
    that the height is log(n)
  - the hieght of any node/tree is the max
    height of left or right path till the 
    leaf
 
*/

/*
Create a result array
dfs function (root, level)
- if the root is null then return
- if the !result[level]
    - this means that we are no
      subarray created for that
      level
    - add an emmpty array to result
    
- push the value of root to the 
  subarray of result that corresponds 
  that level
  - index 0 is assigned to level 0
  
- dfs(root.left, level+1)
- dfs(root.right, level+1)

call dfs(root,0)
return result
*/

const levelOrder2 = (root) => {
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
