/* 
100. Same Tree
https://leetcode.com/problems/same-tree/
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
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
const isSameTree = (p, q) => {
  if (!p && !q) {
    return true;
  } else if (!p || !q) {
    return false;
  }

  //check if root nodes are a match
  if (p.val !== q.val) return false;

  //check if p's left subtree matches q's left subtree
  let left = isSameTree(p.left, q.left);
  //check if p's right subtree matches q's right subtree
  let right = isSameTree(p.right, q.right);

  //helps us bring up false, up the call stack
  let same = left && right;
  return same;
};

/*
Time: O(p + q) 
- We iterated through every node in p binary tree and q binary tree

Space: Worst: O(min(p,q)),  Best: O( log( min(p,q) ) )
- At worst case both of the binary trees are skewed: O(min(p,q))
    - the call stack will have min(p,q) frames because
      we return as soon as one of the them are null. 
      If we have diff # nodes then call stack will 
      have at most min(p,q) frames
- At best case both of the binary tree are balanced: O( log( min(p,q) ) )
    - the call stack will have log(min(p,q)) frames because
      we return as soon as one of the them are null. 
      If we have diff # nodes then call stack will 
      have at most log(min(p,q)) frames

*/

/*
Dfs(p,q)
- If p and q  are both  null then return true 
- Else if only one is null then return false
- if p.val !== q.val then return false
- Let left = dfs(p.left, q.left)
    - Checks if both p’s left and q’s left are a match 
- Let right = dfs(p.right, q.right)
    - Checks if both p’s right  and q’s right are a match 
- Let same =  left &&right
    - True && true === true.   False && true === false
Return same

*/
