/* 
Branch Sums
AlgoExpert: https://www.algoexpert.io/questions/Branch%20Sums
*/

class BinaryTree {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

function branchSums(root) {
  // Write your code here.
  let result = [];
  explore(root, 0, result);
  return result;
}
function explore(current, sum, result) {
  if (current === null) {
    //edge case: node given in problem is null
    return;
  }
  sum += current.value; //visit current node
  if (current.left === null && current.right === null) {
    //we have reached the end of a branch
    //prevents us from pushing a sum twice to result array
    result.push(sum);
    return;
  }

  explore(current.left, sum, result);
  explore(current.right, sum, result);
}

/* 
Time: O(n) 'n' is the number of nodes in te binary tree
• we need to traverse all the nodes in order to get branch sum 
	◦ at each node we are doing constant time operations
Space: 'n' is the number of nodes in the binary tree
	* Recursion: Best, Average:O(log n), Worst (n)
	* # of Branches: O(n)
• Recursion: each time we a recursive call we are eliminating half the nodes in the binary tree
	◦ we will never have more than log(n) calls in the call stack
• Recursion: if the tree id skewed to the left or right we can't cut the tree in half after every recursive call and so we make 'n' recursive calls
• # of Branches: we won't ever have more than 'n' branch sums(leaf nodes) in a tree because you have 'n' nodes.
• # of Branches: In a balanced binary tree roughly half of the nodes are leaf nodes.
	◦ that means n/2  = # of branches hence the amount of elements in the array is O(n/2) -> O(n) space
	◦ roughly half of the nodes in a balanced binary tree are leaf nodes

The number of times we must divide 'n' in half to get down to 1 is log2(n) -> log(n)
  */

/* 
check if node given to you by problem is not null

increment sum by current.value

When you hit a leaf node, add sum to the result array before you return
• current.left === null and current.right ==== null

explore the left chid 
• explore(current.left, sum, result)

explore right child
• explore(current.right, sum, result)
*/
