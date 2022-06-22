/* 
543. Diameter of Binary Tree
https://leetcode.com/problems/diameter-of-binary-tree/
*/

const diameterOfBinaryTree = (root) => {
  let longestDiameter = 0;

  const dfs = (root) => {
    if (!root) return 0;
    let longestLeftPath = dfs(root.left);
    let longestRightPath = dfs(root.right);
    let currentDiameter = longestLeftPath + longestRightPath;
    longestDiameter = Math.max(longestDiameter, currentDiameter);

    //longest path from the parent node to the leaf
    let longestPath = Math.max(longestLeftPath, longestRightPath) + 1;
    return longestPath;
  };

  dfs(root);
  return longestDiameter;
};

/*
Time: O(n)
- n is the total amount of nodes in the given tree
- the recursive funtion visited every node in the binary
  tree once
  
 Space: Worst: O(n), Best: O(log(n))
 - in the worst case the binary tree is skewed,meaning
    that the call stack would have n frames
    - all the nodes are on one branch of the tree.
- In the bwst case the binary tree is balanced, 
  meaning that call atack would have h frames in the 
  call stack
  - h = height
  - Since the tree given is a binary tree we can
    say that it's height = log(n)
*/

/*
longestDiameter = 0

Dfs function:
- If node is null then return 0 
    - The longest path for null is 0
- In order to calculate the current  diameter we need to have the longest left and right path
    - Current diameter = longest left path + longest right path
- The longest diameter = max(longest diameter, current diameter)
    - Calculate the longest path = max(longest left path, longest right path) +1
    - max(longest left path, longest right path) gets us the longest path form the current node to the leaf
    - We add 1 for the path connecting the node and its parent
    - This gets us the path from the parent node to leaf
- Return longestPath

Call the dfs function

Return longestDiameter

*/
