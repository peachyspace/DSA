/* 
206. Reverse Linked List
https://leetcode.com/problems/reverse-linked-list/
*/

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

//Recursive Soultion
const reverseList = function (head) {
  if (!head) {
    //edge case: head empty
    return null;
  }
  let newHead = head; // allows the last node in the original
  //LL to be the head of the reversed Linked List
  if (head.next) {
    newHead = reverseList(head.next); //reversing the remainder of LL
    head.next.next = head; //reversing
  }
  head.next = null; //LL is reversed, so now the head is the tail
  return newHead; //need to return head of reversed LL
};
/*
Time: O(n) 
	* We visit every node on the Linked List once.

Space O(n) 
	* We make recursive all for each node in the Linked List. If there 'n' nodes in the Linked List then there will be 'n' functions in the call stack. 

*/

/*
• Check if the Linked List empty
	◦ if true return null
• Assign head input  to newHead
	◦ This allows the last node of the original Linked List to be the head of the reversed Linked List
• Check if head 's pointer is pointing to a node 
	◦ Assign newHead to the returned value of the recursive call
		‣ Pass the node next to the head to the recursive call
	◦ Make the node next to the head to point to the head
		‣ head.next.next = head //reversing 
• The head is pointing to null since at this point we have reversed either a portion or all of the LL.
	◦ The head is now the tail and so it must point to null
• return the head 
	◦ we need to always return the newHead so we have access to the reversed LL.
*/

//Iterative solution
const reverseList2 = function (head) {
  let prev = null;
  let current = head;
  let nextTemp = null;
  while (current) {
    nextTemp = current.next;
    current.next = prev; //reversed pointer
    prev = current;
    current = nextTemp;
  }
  return prev;
};
/*
Time : O(n)
	* We visit every node in the Linked List once

Space: O(1)
	* We don't use any additional space
*/

/*
• prev = null
	◦ makes original head point to null
• current = head
• nextTemp = null
• While current is truthy
	◦ Save current.next to nextTemp
		‣ because the original current.next will be overwritten
	◦ Reverse current's pointer
		‣ current.next = prev
	◦ Move prev pointer
		‣ prev = current
	◦ Move current pointer
		‣ current = nextTemp
• return prev
	◦ When while loop terminates, prev pointer will be pointing at the head of the reversed Linked List
*/

//       1  ->  2  ->  3  ->  4  ->  5 -> null
//prev   curr   next
//next = curr.next
//curr.next = prev (null)
//prev = current
//curent= next

//null <- 1    2  ->  3  ->  4  ->  5 -> null
//     prev   curr   next
//next = curr.next
//curr.next = prev (1)
//prev = current
//current = next

//null <- 1 <- 2    3  ->  4  ->  5 -> null
//          prev  curr   next
//next = curr.next
//curr.next = prev (2)
//prev = current
//current = next

//null <- 1 <- 2 <- 3    4  ->  5 -> null
//                prev  curr   next
//next = curr.next
//curr.next = prev (3)
//prev = current
//current = next

//null <- 1 <- 2 <- 3 <- 4    5 -> null
//                     prev  curr   next
//next = curr.next
//curr.next = prev (4)
//prev = current(5)
//current = next

//null <- 1 <- 2 <- 3 <- 4 <- 5
//                           prev
