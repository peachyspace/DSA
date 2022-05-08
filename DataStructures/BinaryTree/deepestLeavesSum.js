/* 
1302. Deepest Leaves Sum
https://leetcode.com/problems/deepest-leaves-sum/
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
const deepestLeavesSum = function (root) {
  if (root === null) return 0;
  let deepestSum = 0;
  const queue = [];
  queue.push(root);
  while (queue.length) {
    let numOfParents = queue.length;
    let currentLevelSum = 0;
    while (numOfParents) {
      let currentParent = queue.shift();
      numOfParents--;
      currentLevelSum += currentParent.val;
      if (currentParent.left) queue.push(currentParent.left);
      if (currentParent.right) queue.push(currentParent.right);
    }
    deepestSum = currentLevelSum;
  }
  return deepestSum;
};

/* 
Time: O(n^2) , n the number nodes in the tree
• iterated through the whole binary tree -> every single node on the tree
• for each node on the tree we could potentially iterate through the whole tree when we use the shift method 

Space: O(n/2) -> O(n)
• we create a queue and at the last level it could hold up to n/2 tree nodes in the case of a complete binary tree(worst case)
*/

/* 

//level order traversal(BFS) will get us to the last level and from there we can get the deepest nodes in the binary tree
//deepestSum =0
//queue(array):
//get num of parent nodes
remove while the number of parent nodes is not equal to 0
//remove:shift
//decrement num of parent nodes
//add currentParent value to currentLevelSum
//add:push,
//check left and right to see if not null then add them
//deepestSum = currentLevelSum
*/

//Optimization: Linked list
class Node {
  constructor(value) {
    this.nodeVal = value;
    this.next = null;
  }
}
class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }
  enqueue(node) {
    let newNode = new Node(node);
    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
    }
    this.tail = newNode;
    this.length++;
    return;
  }
  dequeue() {
    if (this.length === 0) return;
    let removed = this.head;
    this.head = this.head.next;
    this.length--;
    if (this.length === 0) {
      this.head = null;
      this.tail = null;
    }
    return removed;
  }
}

const deepestLeavesSum2 = function (root) {
  if (root === null) return 0;
  let deepestSum = 0;
  const queue = new LinkedList();
  queue.enqueue(root);
  while (queue.length) {
    let numOfParents = queue.length;
    let currentLevelSum = 0;
    while (numOfParents) {
      let currentParent = queue.dequeue();
      numOfParents--;
      currentLevelSum += currentParent.nodeVal.val;
      if (currentParent.nodeVal.left) queue.enqueue(currentParent.nodeVal.left);
      if (currentParent.nodeVal.right)
        queue.enqueue(currentParent.nodeVal.right);
    }
    deepestSum = currentLevelSum;
  }
  return deepestSum;
};
/* 
Time: O(n) , n the number nodes in the tree
• iterated through the whole binary tree -> every single node on the tree


Space: O(n/2) -> O(n)
• we create a queue(linkedList) and at the last level it could hold up to n/2 tree nodes in the case of a complete binary tree(worst case)
*/
