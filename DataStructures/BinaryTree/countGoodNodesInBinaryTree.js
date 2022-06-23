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
Time: O(n)
- n is the total amount of nodes in the given 
  binary tree
- visited every node in the binary tree

Space: 
- h is the height of the binary tree
- In the worst case the binary tree is skewed,
  meaning that the call stack will hold n frames
- In the best case the binary tree is balanced,
  meaing that the call stack will 
  hold h frames -> log(n) frames
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

/*
good nodes so far = currGoodNodeTotal + leftPathGN + rightPathGN
 When do we update max?
 - we update when curr.val > max

 When do we have a good node?
 - max <= curr.val
 - current node is greater than or equal to all 
    of the nodes above it in this current branch

How do we know that the current node is not a goodNode?
- keep track of a max value of the current branch
- this way we know that if curr.val < max then 
  one or more of it's ancestor nodes are greater than
  curr.val
*/
