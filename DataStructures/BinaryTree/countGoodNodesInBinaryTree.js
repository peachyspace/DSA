/* 
1448. Count Good Nodes in Binary Tree
https://leetcode.com/problems/count-good-nodes-in-binary-tree/
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
const goodNodes = function (root) {
  if (root === null) return 0;
  let max = -Infinity;

  const dfs = (current, max) => {
    if (current === null) return 0;
    let numOfGoodNodes = 0;
    if (max <= current.val) {
      numOfGoodNodes = 1;
      max = current.val;
    }
    let leftSubtreeNumOfGNodes = dfs(current.left, max);
    let rightSubtreeNumOfGNodes = dfs(current.right, max);

    return numOfGoodNodes + leftSubtreeNumOfGNodes + rightSubtreeNumOfGNodes;
  };
  return dfs(root, max);
};

/* 
Time: O(n), n is the number of nodes in the given tree
• We visit every node in the given tree

Space: non-skewed tree: O(h) OR skewed tree:O(n) 
• The max amount of frames on the call stack at any given time will depend on the height of the tree. However in the worst case the tree is skewed, meaning that all the nodes are all in one branch, hence call stack will hold n frames
*/

/* 

//root is always considered good
// dfs pre order because we want to check if current node is a good node before moving on to its left and right node
//pre order:
//1) visit node (do some operation)
• if max <= current.val then numOfGoodNodes = 1 and max = current.val
• else numOfGoodNodes = 0
//2) leftSubtreeNumOfGNodes = explore left node(pass max val)
//3) rightSubtreeNumOfGNodes =explore right node(pass max val)
//4) return numOfGoodNodes + leftSubtreeNumOfGNodes + rightSubtreeNumOfGNodes
*/
