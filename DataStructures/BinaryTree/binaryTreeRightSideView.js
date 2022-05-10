/* 
199. Binary Tree Right Side View
https://leetcode.com/problems/binary-tree-right-side-view/
*/

const rightSideView = function (root) {
  if (root === null) return [];
  const queue = [];
  queue.push(root);
  const result = [];
  while (queue.length) {
    let numOfParents = queue.length;
    result.push(queue[numOfParents - 1]);
    while (numOfParents) {
      let parent = queue.shift();
      numOfParents--;
      if (parent.left) queue.push(parent.left);
      if (parent.right) queue.push(parent.right);
    }
  }
  return result;
};
/* 
Time: O(n*n)-> O(n^2), n is the total number of nodes in the tree
• We visit every node in the tree
	◦ Every time we visit we shift a node from the queue(array) and that takes O(n) time
		‣ BFS: at worst case we can have a complete tree and that means that at the last level we will have n/2 nodes in the queue which essentially is n
Space: O(n)
• The queue will have at most n n nodes 
	◦ BFS: at worst case we can have a complete tree and that means that at the last level we will have n/2 nodes in the queue which essentially is n
*/

/* 
//standing on the right side, what can you see?
//you can probably see the right node
//BUT you might be able to see a left node if there is no right node blocking it
//HENCE we are looking for the right most node on each level
//- use BFS and add the last node on every level to the result array

Input: root = null
Output: []
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
		‣ BFS: at worst case we can have a complete tree and that means that at the last level we will have n/2 nodes in the queue which essentially is n
Space: O(n)
• The queue will have at most n n nodes 
	◦ BFS: at worst case we can have a complete tree and that means that at the last level we will have n/2 nodes in the queue which essentially is n
*/
