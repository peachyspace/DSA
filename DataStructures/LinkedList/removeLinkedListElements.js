/* 
203. Remove Linked List Elements
https://leetcode.com/problems/remove-linked-list-elements/
*/

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

const removeElements = function (head, val) {
  let sentinel = new ListNode(0);
  sentinel.next = head;
  let prev = sentinel;
  let current = head;
  while (current) {
    if (current.val === val) {
      prev.next = current.next;
    } else {
      prev = current; //no node removed and therefore we can update prev
    }

    current = current.next;
  }
  return sentinel.next;
};

/*
Time: O(n)
	◦ We have to iterate through the whole Linked List 

Space: O(1)
	◦ We did not  use any additional space. The amount of pointers we used does not grow as our input grows. We will always have one dummy node regardless of the size of the input.
*/
/*
Sentinel nodes(dummy nodes) usually don't hold any data. Using them allows us to have a Linked List that is never headless and therefore it simplifies insert and delete.
	* prevents us from dealing with too many edge cases
• Initiate sentinel node : set value to 0 and set next property to the head.(sentinel.next = head)
• Initiate two pointers to to track current and prev
• While current is true
		‣  If current.val === val true then:
			• prev.next = current.next
				◦ removed current node from LL
		‣  Else update: prev: prev = current 
				◦ Only update prev when there is no match because we want prev to represent a node that is part of the LL. If we update when there is match the prev will represent a node that has been removed from the LL.
		‣ Move to the next node (current = current.next)
• return sentinel.next

Updating prev? 
We can update current node during each iteration. However, this is not he case for prev node. After we found a match, we remove the current node from the LL and now we can't update prev because the current node (removed node) doesn't exist in the LL anymore.
*/

//[1,2,6,3,4,5,6]
//   removal 2.next = 6.next
//   removal 5.next = 6.next
