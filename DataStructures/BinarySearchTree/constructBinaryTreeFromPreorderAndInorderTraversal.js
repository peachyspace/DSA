/* 
105. Construct Binary Tree from Preorder and Inorder Traversal
https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/
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
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */

const buildTree = function (preorder, inorder) {
  let position = 0;
  let hashTable = {};
  inorder.forEach((element, index) => (hashTable[element] = index));

  const build = function (start, end) {
    if (start > end) return null; //left or right subtree doesn't exist
    let root = new TreeNode(preorder[position]); //leetcode created the TreeNode class
    position++;
    root.left = build(start, hashTable[root.val] - 1);
    root.right = build(hashTable[root.val] + 1, end);
    return root;
  };
  return build(0, inorder.length - 1);
};

/* 
Time: O(n), n is the length of the preorder and inorder array
• we are visiting every element in the preorder and inorder array

Space: non-skewed: O(h) + O(n), skewed: O(n) +O(n) -> O(n)
• we create a hashTable that has n key-value pairs
• the max amount of stacks in the call stack is the height of the tree(O(log n). IN the worst case the binary tree we create is a skewed tree and so ALL of the nodes in the tree are in the call stack
	◦ log2(n): log2(8) = 3 the height of the tree
		‣ height of tree is actually 4 but being off by one is OKAY
*/

/* 
The idea
In-order [LEFT subtree..., ROOT tree, RIGHT subtree....]:  left -> visit -> 
• The in-order array is good at telling us values in the left and right subtree.

Pre-order [ROOT, LEFT subtree...., RIGHT subtree....]: visit ->left -> right
• The pre-order is good at telling us the root of a tree which is the first element in the array.
Note that we want to build the left subtree first because of the order of pre-order:       root -> left -> right. 
• When we traverse preorder idx 0 is the root of the tree while idx 1 is generally the root of the left subtree

build function
1) create a hash table that has the key value pair-> node value : index, from the inorder array
• use inorder array because we use that to find the left and right subtree
2) create a variable called position that is set to 0
3) create a recursive function that creates the binary tree
• base case: start > end then return null, meaning that the current root has no left or right subtrees
• create a tree node using the the value being held at preorder[position]
	◦ use preorder values because we want the root of the current subtree
		‣ we are building the left subtree first so follow the order of the preorder array
• increment position so we can get the correct root of the next subtree
	◦ preorder: root of binary tree -> root of left subtrees... -> root of right subtrees...
• root.left = build(start, hash[root.val]-1) --> getting nodes in left sub tree
	◦  hash[root.val] returns the index where root.val is located in the inorder array 
• root.right = build(hash[root.val]+1, end) --> getting nodes in right subtree
• return root
4) return the function call with the start and end values passed as arguments
• start = 0 --> allows to get left subtree
• end = inorder.length-1  --> allows us to get right subtree
*/
