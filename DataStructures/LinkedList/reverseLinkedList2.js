/* 
92. Reverse Linked List II
https://leetcode.com/problems/reverse-linked-list-ii/
*/

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * param {ListNode} head
 * param {number} left
 * param {number} right
 * return {ListNode}
 */
var reverseBetween = function (head, left, right) {
  //Phase 1: get left node the node behind it
  let dummy = new ListNode(0, head);
  let leftPrev = dummy;
  let current = head;
  for (let i = 1; i < left; i++) {
    //when i===left both pointers are already in the desired position, so there is no need to enter loop when i===left
    leftPrev = current;
    current = current.next;
  }
  //Phase 2: Reverse all the nodes from the left position to right postion
  let prev = null;
  let next = null;
  //let distance = right - left + 1
  for (let i = left; i <= right; i++) {
    next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }
  //Phase 3: Clean up some of the pointers (leftPrev)
  //leftPrev.next is the left node and so the additional next gives us access to its pointer
  leftPrev.next.next = current; // current is the node that comes after right node
  //leftPrev is the node behind the left node
  leftPrev.next = prev; //prev is the right  node

  return dummy.next; //is the head of the LL
};
//1-> 2-> 3-> 4-> 5-> null

//    ____________
//    |          |
//    |          \/
//1   2 <-3 <-4   5-> null
// |          ^
// |__________|
//
// 1-> 4-> 3-> 2-> 5-> null
/*
    Time: O(n) 
    • 1st for loop: Iterated over every node in the LL(At worst case)
    • 2nd for loop: Iterated over every node in the LL(At worst case) 
    
    Space O(1)
    • No additional space was used besides the pointers that were used 
        ◦ Pointers use constant space
    */

/*
    Phase1: Reach the node behind the left node and the left node
    • Create dummy node
    • Set prev to dummy
    • Set current to head
        ◦ We want current to be ahead of prev by one
    • Iterate through the LL until you reach left
        ◦ set prev to current
        ◦ set current to current.next
    
    Phase2: Reverse all the nodes from position left to position right
    • Save original prev value into another variable because its going to be overwritten in the for loop
    • Set prev to null
    • Set next to null
    • We must iterate the LL for right -left + 1 times in order to reverse from the left position to right position
        ◦ Set next to current.next
        ◦ Set current.next to prev
        ◦ Set prev to current
        ◦ Set current to next
    
    Phase 3: Clean up some of the pointers (leftPrev)
    • Set leftPrev.next.next to current
        ◦ leftPrev is behind node at left position
        ◦ Makes node at left position is point to current
    • Set leftPrev.next = prev
        ◦ prev is the node at the right position
    
    Return dummy.next because that has the head of the LL
    */
