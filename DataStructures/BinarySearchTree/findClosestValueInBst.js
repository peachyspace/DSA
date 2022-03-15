/* 
270. Closest Binary Search Tree Value
AlgoExpert: https://www.algoexpert.io/questions/Find%20Closest%20Value%20In%20BST
LeetCode: https://leetcode.com/problems/closest-binary-search-tree-value/
*/
function findClosestValueInBst(tree, target) {
  let currNode = tree;
  let closest = Infinity;
  while (currNode) {
    let currDiff = Math.abs(currNode.value - target);
    if (currDiff < Math.abs(closest - target)) {
      closest = currNode.value;
    }
    if (currNode.value < target) {
      currNode = currNode.right;
    } else if (currNode.value > target) {
      currNode = currNode.left;
    } else {
      return closest;
    }
  }
  return closest;
}

// This is the class of the input tree. Do not edit.
class BST {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}
