/* 
199. Binary Tree Right Side View
https://leetcode.com/problems/binary-tree-right-side-view/
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
 * @return {number[]}
 */

/* 
//standing on the right side, what can you see?
//you can probably see the right node
//BUT you might be able to see a left node if there is no right node blocking it
//HENCE we are looking for the right most node on each level
//- use BFS and add the last node on every level to the result array
//- you can also use dfs by using preOrder traversal

Input: root = null
Output: []
*/

const rightSideView = (root) => {
  if (!root) return [];
  const queue = [];
  const result = [];
  queue.push(root);
  while (queue.length) {
    let size = queue.length;
    for (let i = 0; i < size; i++) {
      let node = queue.shift();
      if (i === size - 1) {
        result.push(node.val);
      }
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }
  return result;
};

/*
Time: O(n*n) -> O(n^2)
- n is the total number of nodes in the 
  given binary tree
- we visited every node once but we used the 
  shift method on them
  - shift method is an O(n) operation
  
Space: O(n/2) -> O(n)
- In the worst case the tree is a full
  binary tree meaing that the queue
  can hold n/2 nodes at the last level
 
*/

/*
If root is null return []
Create queue
Add root ot queue
Iterate while the queue is not empty
- Size = queue.length
- Iterate for size times
- Take out node from queue
- If i === size-1 then add node.val to result
- If node.left   is not null then add to queue
- If node.right is not null then add to queue
Return result

*/

//Optimization using LinkedLists
class Node {
  constructor(nodeVal) {
    this.nodeVal = nodeVal;
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
    if (this.length === 0) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
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
const rightSideView2 = function (root) {
  if (root === null) return [];
  const queue = new LinkedList();
  queue.enqueue(root);
  const result = [];
  while (queue.length) {
    let numOfParents = queue.length;
    while (numOfParents) {
      let parent = queue.dequeue();
      numOfParents--;
      if (numOfParents === 0) result.push(parent.nodeVal.val);
      if (parent.nodeVal.left) queue.enqueue(parent.nodeVal.left);
      if (parent.nodeVal.right) queue.enqueue(parent.nodeVal.right);
    }
  }
  return result;
};
/* 
Time: O(n), n is the total number of nodes in the tree
• We visit every node in the tree
	◦ Every time we visit we dequeue a node from the queue(array) and that takes O(1) time

Space: O(n)
• BFS: at worst case we can have a complete tree and that means that at the last level we will have n/2 nodes in the queue which essentially is n
*/

//Optimization using dfs
const rightSideView3 = (root) => {
  const result = [];
  const dfs = (root, level) => {
    if (!root) return;
    //the last assigned value
    //is the rightmost value
    result[level] = root.val;
    dfs(root.left, level + 1);
    dfs(root.right, level + 1);
  };
  dfs(root, 0);
  return result;
};

/*
Time: O(n)
- n is the total number of nodes in the 
given binary tree
- we visited every node in the given binary
tree once


Space: Worst: O(n), Best: O(log(n))
- h is the height of the tree
- the height of any node/tree is the max
height of left or right path till the 
leaf
- In the best case the tree is a balanced
binary tree meaing that the call stack
can hold h frames. The height of a 
balanced binary tree is O(log(n))
- In the worst case the binary tree is
skewed, meaning that the call stack
can hold n frames
*/

/*
Create result array
dfs function(root, level)
- if the root is null then return
- use the level as an index in order
to place the node.val there
- we will overwrite the values placed
  at that index BUT the last value
  placed is the right most value of
  the current level and that wont 
  be overwritten
- Explore the left child and level+1
- Explore the right child and level+1
call dfs(root,0)
return result
*/
