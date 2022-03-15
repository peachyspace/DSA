/* 
270. Closest Binary Search Tree Value
AlgoExpert: https://www.algoexpert.io/questions/Find%20Closest%20Value%20In%20BST
LeetCode: https://leetcode.com/problems/closest-binary-search-tree-value/
*/
//Iterative
function findClosestValueInBst(tree, target) {
  let currNode = tree;
  let closest = tree.value;
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
/* 
Iterative complexity
• Time: Best, Average:O(log(n)) or Worst: O(n)
	◦ Every time we explore a node in a BST we cut the tree in half.
	◦ At worst case the binary search tree could be skewed to the left or right and thus creating a O(n) time complexity
• Space: O(1)
	◦ We use constant space
*/
/* 
Initiate closest to currentNode.value
• if it creates the smallest difference then it wont be updated
• if it doesn't then it will be updated to a new value
Iterate while currentNode is not null
• Calculate absolute difference of 
	◦ target and closest
	◦ target and currentNode.value
	◦ Assign closest to the value that creates the smallest difference
• CurrentNode.value is less than target
	◦ increment currentNode by moving to the right 
	◦ Gets us closer to target
• CurrentNode.value is greater than target
	◦ decrement currentNode by moving to the left
	◦ Gets us closer to target
• CurrentNode.value equals target then return currentNode.value
When you get out of while loop return closest
*/

//Recursive
function findClosestValueInBst(tree, target) {
  return findClosestValueInBstHelper(tree, target, tree.value);
}
function findClosestValueInBstHelper(currentNode, target, closest) {
  if (!currentNode) {
    return closest;
  }
  if (Math.abs(currentNode.value - target) < Math.abs(closest - target)) {
    closest = currentNode.value;
  }
  if (currentNode.value < target) {
    return findClosestValueInBstHelper(currentNode.right, target, closest);
  } else if (currentNode.value > target) {
    return findClosestValueInBstHelper(currentNode.left, target, closest);
  } else {
    return closest;
  }
}

/* 
'n' is the total number of nodes in the binary search tree.
Time: Best, Average:O(log(n)), WorstO(n)
• Every time we explore a node we won't be cutting the tree in half.
• Worst case binary search tree is skewed

Space: Best, Average:O(log(n)),  WorstO(n)
• The amount of frames in the call stack is log(n) at best or average case because we are eliminating on average half of the tree every time that we explore a node. 
• However if the binary search tree is skewed to the left or right(one branch) then every time we explore a node we wont cut the tree in half. In this case we would be calling the recursive function on every node in the BST and thus causing the call stack to have 'n' frames
  */

/* 
Recursive Solution
Initiate closest to currentNode.value
• if it creates the smallest difference then it wont be updated
• if it doesn't then it will be updated to a new value
return helperFunction(tree, target, tree.value)

helperFunction takes (currentNode, target, closest)
• if currentNode is null then return closest
	◦ when we hit this conditional will have already found the value closest to the target and so we return closest
	◦ the closest value will be returned to any line where the helperFunction was called 
	◦ Since the call stack pops off calls from top to bottom the last popped off call will be the the 1st helperFunction call and that returns closest 
• Calculate absolute difference of 
	◦ target and closest
	◦ target and currentNode.value
	◦ Assign closest to the value that creates the smallest difference
• CurrentNode.value is less than target
	◦ return the helperFunction(currentNode.right, target, closest)
• CurrentNode.value is greater than target
	◦ return the helperFunction(currentNode.left, target, closest)
• CurrentNode.value equals target 
	◦ return closest

*/
