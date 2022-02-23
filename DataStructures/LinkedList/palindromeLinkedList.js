/* 
234. Palindrome Linked List
https://leetcode.com/problems/palindrome-linked-list/
*/

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

const isPalindrome = function (head) {
  let fast = head;
  let slow = head;
  while (fast && fast.next) {
    fast = fast.next.next;
    slow = slow.next;
  }
  let prev = slow;
  let current = slow.next;
  let nextTemp = null;
  prev.next = null; //prevents a cycle from occuring
  while (current) {
    nextTemp = current.next;
    current.next = prev;
    prev = current;
    current = nextTemp;
  }
  fast = head;
  slow = prev; //first node in the 2nd half of LL that is reversed
  while (slow) {
    //using slow because it's the only one that has null
    if (fast.val !== slow.val) {
      return false;
    }
    fast = fast.next;
    slow = slow.next;
  }
  return true;
};
/*
Time:  O(n)
	*Fast & slow pointers iteration O(n)
	*Reversing Second Half of Linked List O(n)
	*Comparing the resulting LL (iterating) O(n)
Space: O(1)
	*No additional space is used 
	*In the reversal we are not using more space since we are just changing the value of the pointer.
*/

/*
Fast & Slow pointer
• slow is at the second half of the linked list when the while loop terminates.

Reversal:
• prev = slow
• current = slow.next
• nextTemp = null
• prev.next = null //this allows the second half of the list to have an end 
	◦ without it you will create a cycle in the list
	◦ At the end of the reversal prev will be the head of the Linked List
• second half is reversed

Compare during Iteration:
• iterate through the first and second half at the same time
	◦ once there is a difference return false
• Return true
*/
