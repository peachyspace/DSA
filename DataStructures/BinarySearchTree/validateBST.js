/* 
AlgoExpert: https://www.algoexpert.io/questions/Validate%20BST
98. Validate Binary Search Tree
https://leetcode.com/problems/validate-binary-search-tree/
*/
class BST {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

function validateBst(tree) {
  return validateHelper(tree, -Infinity, Infinity);
}
function validateHelper(current, minValue, maxValue) {
  if (!current) {
    return true;
  }
  if (current.value < minValue || current.value >= maxValue) {
    //current is not within the range (min <= current < max)
    return false;
  }
  return (
    validateHelper(current.left, minValue, current.value) &&
    validateHelper(current.right, current.value, maxValue)
  );
}

/* 
Time: O(n) 
• n is the total amount of nodes in the BST
• traversing every node in the BST
• The comparisons we make are constant time operations

Space: Best, Average:O(d) Worst: O(n)(skewed tree: only 1 branch)
• d = depth of tree 
	◦ the length of the longest branch in a tree
• We are calling our validateBst function on all of our subtrees and these functions are popped off the call stack  once they are resolved. 
	◦ It is not until we hit the end of branch that we start popping off the call stack
	◦ so the longest brach(depth) will have the most functions in call stack than any other branch in the tree.
*/

/* 
• If the currentNode is null then we hit the the end of the branch and so all the nodes in this branch are valid.
	◦ return true
• To validate currentNode we use minValue and maxValue
	◦ If its not within the range then return false
• return validateHelper( current.left, minValue, current.value ) && validateHelper( current.right, current.value, maxValue )
	◦ Pass the current nodes left child to the recursive call
		‣ validateHelper( current.left, minValue, current.value )
			• minValue is not updated because we don't know what the min value is, when the current node is a left child
			•  The min value could be known if the parent is a right child but that value will be passed down and so we don't have to manually update it
	◦ Pass the current nodes right child to the recursive call
		‣ validateHelper( current.right, current.value, maxValue )
			• maxValue is not updated because we don't know what the max value us, when the current nodes is a right child
			• The max value could be known if the parent is the left the child but that value will be passed down and so we don't have to manually update it
*/

/* 
Logic:
Root node can be any number ( -Infinity to Infinity )
• the algorithm uses the minValue and maxValue to validate  currentNode
• if currentNode is a left child then to validate it we must:
	◦ update right boundary(maxValue) by using the parents value
	◦ however left boundary(minValue) stays the same:
		‣ by passing -Infinity (parent doesn't know minValue)
			OR
		‣ by passing an actual number(parent knows minValue)
• if currentNode is a right child then to validate it we must:
	◦ update left boundary (minValue) by using the parents value 
	◦ however right boundary(maxValue) stays the same:
		‣ by passing Infinity(parent doesn't know maxValue)
			OR
		‣ by passing an actual number(parent knows maxValue)
*/
