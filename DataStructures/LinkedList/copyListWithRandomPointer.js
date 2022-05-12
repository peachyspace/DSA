/* 
138. Copy List with Random Pointer
https://leetcode.com/problems/copy-list-with-random-pointer/
*/

/**
 * // Definition for a Node.
 * function Node(val, next, random) {
 *    this.val = val;
 *    this.next = next;
 *    this.random = random;
 * };
 */

/**
 * @param {Node} head
 * @return {Node}
 */
const copyRandomList = function (head) {
  if (!head) return null;
  const copy = new Map();
  let current = head;
  while (current) {
    let newNode = new Node(current.val);
    copy.set(current, newNode); //setting a key value pair-> orig:clone
    current = current.next;
  }

  current = head;
  while (current) {
    let node = copy.get(current);

    if (current.next !== null) {
      node.next = copy.get(current.next); //returns clone
    } else {
      node.next = null;
    }

    if (current.random !== null) {
      node.random = copy.get(current.random); //returns clone
    } else {
      node.random = null;
    }

    current = current.next;
  }
  return copy.get(head);
};

/*
Time: O(n), 'n' is the length of the given Linked List 
• iterated through every node in the linked list
Space: O(n)
• we create a hashTable that has 'n' nodes and a linked list of 'n' length
*/

/*1st pass create the newNode(clone) while adding to map(current, clone)
2nd pass add the pointers using map get the curr's clone from map and
• assign it's next pointer to map.get(curr.next)
	◦ map.get(curr.next) returns clone 
• assign it's random pointer to map.get(curr, random)
	◦ map.get(curr, random) returns clone
*/
