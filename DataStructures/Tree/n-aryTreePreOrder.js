/* 
589. N-ary Tree Preorder Traversal
https://leetcode.com/problems/n-ary-tree-preorder-traversal/
*/

/**
 * // Definition for a Node.
 * function Node(val, children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */

/**
 * @param {Node|null} root
 * @return {number[]}
 */

const preorder = function (root) {
  const preArray = [];
  const dfs = (root) => {
    if (!root) return;
    preArray.push(root.val);
    if (root.children) {
      for (let child of root.children) {
        dfs(child);
      }
    }
  };
  dfs(root);
  return preArray;
};

/*
Time: O(n)
- n is the total number of nodes in the N-ary 
  tree
- We visited every node in the N-ary tree once
- Even though we have for loop inside the recursive
  function, the for loop is in charge of calling dfs 
  on the children since there could be up to n children
    - the for loop is calling dfs on the children
      in the N-ary tree is the same as calling dfs on 
      the left and right children in a binary tree
        - in both cases calling dfs allows us to 
          traverse every node in the tree once
    - the total number of nodes added to the call stack = 
      number of nodes in the N-ary tree
      
- Special note: Using the shift method on a queue when 
  traversing a binary tree causes the time complexity 
  to be O(n^2) because 
  - we iterate through the tree once using the queue 
    BUT we also iterate the queue  when we use the
    shift method


Space: O(n)
- the call stack in the worst case the tree structure could
  be skewed and thus making the call stack hold n frames 
*/

/*
add root to the preArray 
then iterate through its children
*/

const preorder2 = function (root) {
  if (!root) return [];
  const preArray = [];
  let stack = [];
  stack.push(root);
  while (stack.length) {
    let node = stack.pop();
    preArray.push(node.val);
    if (node.children) {
      let size = node.children.length;
      for (let i = size - 1; i >= 0; i--) {
        stack.push(node.children[i]);
      }
    }
  }
  return preArray;
};

/*
Time: O(n)
- n is the total number of nodes in the N-ary 
  tree
- We visited every node in the N-ary tree once
- Even though we have for loop inside the while
  loop the for loop is in charge of calling dfs 
  on the children since there could be up to n children
    - the for loop is calling dfs on the children
      in the N-ary tree is the same as calling dfs on 
      the left and right children in a binary tree
        - in both cases calling dfs allows us to 
          traverse every node in the tree once
    - the total number of nodes added to the stack = 
      number of nodes in the N-ary tree
      
- Special note: Using the shift method on a queue when 
  traversing a binary tree causes the time complexity 
  to be O(n^2) because 
  - we iterate through the tree once using the queue 
    BUT we also iterate the queue  when we use the
    shift method
Space: O(n)
- the stack in the worst case the tree structure could
  be skewed and thus making the stack hold n frames 
*/

/*
add root to the preArray 
then iterate through its children in REVERSE
- this so the first child will be added last to
  the stack and thus allowing us to pop it off
  in the next iteration
  - preorder requires us to visit the node then 
    the left nodes and lastly the right nodes
*/
