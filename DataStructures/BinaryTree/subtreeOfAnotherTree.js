/* 
572. Subtree of Another Tree
https://leetcode.com/problems/subtree-of-another-tree/
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
 * @param {TreeNode} subRoot
 * @return {boolean}
 */

const isSubtree = function (root, subRoot) {
  let isFound = false;
  const dfs = (root, subRoot) => {
    //if the subRoot is null than it can be
    //a subtree of the root, since null is
    //in every tree
    if (!subRoot) {
      isFound = true;
      return;
    }
    //At this point subtRoot is not null
    //If root is null then the subRoot cant
    //be subroot of the root passed down
    if (!root) return;

    //At every node we check if its part
    //of the given subRoot
    if (sameTree(root, subRoot)) {
      //true retruned mean we found the given subTree(subRoot)
      //inside the given tree(root)
      isFound = true;
      return;
    }

    //travese through the tree
    dfs(root.left, subRoot);
    dfs(root.right, subRoot);
  };
  dfs(root, subRoot);
  return isFound;
};

const sameTree = (p, q) => {
  if (!p && !q) return true;
  if (!p || !q) return false;

  if (p.val !== q.val) return false;

  let left = sameTree(p.left, q.left);
  let right = sameTree(p.right, q.right);

  let same = left && right;
  return same;
};

/*
Time: O(m*n)
- m is the root
- n is the subRoot
- at every node 0(n) in the given tree we check if the subTree
  is there O(m).
  -checking to see if the subtree is present in the tree takes
    O(m) time

Space:O(m + n)
- the worst case would be that both the 
  tree and the subTree are both skewed O(m + n)
*/

/*
isSubtree function
- isFound =true

dfs function
- if the subRoot is null than it can be
  a subtree of the root, since null is 
  in every tree

- At this point subtRoot is not null 
  If root is null then the subRoot cant
  be subroot of the root passed down
        
- At every node we check if its part
  of the given subRoot by using sameTree function  
        
- travese through the tree

call dfs(root, subRoot)
return isFound
*/

/*
SameTree function
dfs(p,q)
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
