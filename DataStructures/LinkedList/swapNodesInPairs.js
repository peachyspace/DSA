/* 
24. Swap Nodes in Pairs
https://leetcode.com/problems/swap-nodes-in-pairs/
*/

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

const swapPairs = function (head) {
  let dummy = new ListNode(0, head);
  let prev = dummy;
  let current = head;
  let nextPair = null;
  while (current && current.next) {
    //save pointers
    nextPair = current.next.next;
    let second = current.next;
    //reverse pointers
    second.next = current; //reverse inside pair
    current.next = nextPair; //intiate connection of pair back to LL
    prev.next = second; // finish connection of pair back to LL
    //update pointers
    prev = current;
    current = nextPair;
  }
  return dummy.next; // head of LL
};

//1-> 2-> 3-> 4-> null

//D-> 2-> 1-> 3-> 4-> null
//        p   c

//D-> 2-> 1-> 4-> 3-> null
/*
Time: O(n)
• Iterated over every node in the LL

Space: O(1)
• No additional space used besides the pointers and they use constant space
*/
/*
• Create a dummy node that points to head
• set prev to dummy
• set current to head
• While loop runs as long as current and current.next is true since we want to have two nodes to reverse
	◦ Set nextPair to current.next.next
		‣ allows to reverse next pair
		‣ might be null
		‣ its the first node of the next pair we will reverse
	◦ Set second to current.next
		‣ we know that current is our first node in the pair
		‣ current.next is the second node in the pair
	◦ Reverse Part: set second.next to current
		‣ second node points to the first node in the pair
	◦ Initiate connection of pair back to LL: set current.next to nextPair
		‣ We know that the first node is in the second position
	◦ Finalize connection of pair back to LL: set prev.next = second
		‣ second is now the first node in the pair and so the prev node must point to second
	◦ Update Pointers: set prev to current
		‣ Current is now the node next to the next pair
	◦ Update Pointers: set current to nextPair
		‣ nextPair is the first node in the next pair
• return dummy.next because it always points to the head of the LL

Reversal Outline
-reverse inside pair 
-set first node.next to nextPair 
-set prev.next to second node since its now the 1st node in the pair
*/
