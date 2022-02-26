/* 
143. Reorder List
https://leetcode.com/problems/reorder-list/
*/

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 Do not return anything, modify head in-place instead.
 */
const reorderList = function (head) {
  let slow = head;
  let fast = head.next;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  let tempSlow = slow.next;
  slow.next = null;

  let prev = null;
  let current = tempSlow;
  let next = null;
  while (current) {
    next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }

  let first = head;
  let second = prev; // has access to the head of the reversed LL
  while (second) {
    //first's length is always greater then or equal to second
    let temp1 = first.next;
    let temp2 = second.next;
    first.next = second; // inserting node from reveresed LL
    second.next = temp1; //finishin inseting reversed LL
    first = temp1; //access to the next node in the acsending half of the LL
    second = temp2; //access to the next node in the reversed LL
  }
};

/*
Time: O(n):
• Find middle takes O(n) time
• Reverse the second half of LL: O(n/2)
• Merge the 1st and 2nd half of the LL : O(n/2)
	◦ The total amount of iterations is the length of the second list and that is half of the original LL.

Space: O(1)
• Reordered the LL in place.
*/

/*
Find middle of LL where the middle is located in the 1st half of the LL
• Set slow pointer to head
• set fast pointer to head.next
	◦ allows the slow pointer  to end up  in the 1st half of the list
• Iterate as long as fast && fast.next are true
• return slow since that is the middle of the LL
Set temp to slow.next
set slow.next to null
set list2 to temp
Reverse the 2nd half of the Linked list (head is the node that proceeds the middle node)
• Set prev to null
• current to list2
• next to null
• Iterate over the list as long as current is not empty
	◦ Set next to current.next
	◦ Set current.next to prev
	◦ Set prev to current
	◦ Set current to next
• prev will hold the head of the reversed LL 

Merge the two lists( first half node is placed first in merged list)
• let first to head
• set second to prev
• Iterate over LL as long as  second is not empty (second could be smaller than 1st)
	◦ temp1 is set to first.next
	◦ temp2 is set to second.next
	◦ Set first pointer to second
		‣ inserting second into first
	◦ Set second pointer to temp1
		‣ finish inserting second to first 
	◦ Set first to temp1 (move pointer)
		‣ if you set it to first.next then you will be at the newly inserted node and you don't want that. By setting to temp1 your at the next ascending value in the first half of the original list
	◦ Set second to temp2 (move pointer)
		‣ Gives you access to the next node in the reversed LL
In this case we don't return anything since the problem says to just modify it 
*/
