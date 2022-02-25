/* 
142. Linked List Cycle II
https://leetcode.com/problems/linked-list-cycle-ii/
*/

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

const detectCycle = function (head) {
  let fast = head;
  let slow = head;
  while (fast && fast.next) {
    fast = fast.next.next;
    slow = slow.next;
    if (slow === fast) {
      slow = head;
      while (slow !== fast) {
        fast = fast.next;
        slow = slow.next;
      }
      return slow;
    }
  }
  return null;
};

//it could have a cycle
//return  the node where the cycle begins
// retutn null if there is no cycle
// 0 indexed so first node is at position 0

/*
Time: O(n)
	- If the LL doesn't have a cycle then make iterationsO(n)
	-If the LL has a cycle then O(n) 
		*Outer loop runs for O(n) 
			• By the time the pointers meet, we have made 'n' iterations
		*Inner loop runs for O(n)
			• x < n, x is the number of nodes outside the cycle
Space: O(1)
	-No additional space was used
*/

/*
Distance traveled by slowPointer before meeting  = x + y
Distance traveled by fast pointer before meeting = (x + y + z) + y 
• we add the additional 'y' because the fast pointer would have already traversed the whole cycle before it meets the slow pointer
The fast pointer travels double the speed of the slow pointer, and time is constant for both when they reach the the meeting point. 
So in order for fast to be equal to slow
     2slow = fast
 2( x + y ) = x  + 2y + z
 2x + 2y   = x + 2y + z
-x   - 2y     -x  -2y
_____________________
             x = z

So by moving the slow pointer to the start of the LL and making both slow pointer and fast pointer to move one node at a time. They will both reach a point where the loop starts in the LL

• Initialize a slow and fast  pointer that is equal to the head
• Iterate through the loop as long as  fast and fast.next are true 
	◦ move the fast pointer (2x faster)
		‣ fast = fast.next.next
	◦ move the slow pointer
		‣ slow = slow.next
	◦ If slow === fast
		‣ Make slow = head
		‣ Iterate while fast !== slow 
			• both slow and fast move at the same pace
		‣ return slow
• When while loop is terminated then we know there is no cycle in the list
	◦ return null
*/
