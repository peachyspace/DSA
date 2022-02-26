/* 
19. Remove Nth Node From End of List
https://leetcode.com/problems/remove-nth-node-from-end-of-list/
*/

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

const removeNthFromEnd = function (head, n) {
  let dummy = new ListNode(0, head);
  let left = dummy;
  let right = head;
  while (n > 0) {
    right = right.next;
    n--;
  }
  while (right) {
    //both pointers moving at the same distance
    right = right.next;
    left = left.next;
  }
  left.next = left.next.next; //deleted nth node from end of LL
  return dummy.next; // dummy points to the head of LL
};
/*
 Time: O(L)  'L' is the length of the linked list
     ◦ We do one traversal of the list of L nodes
 
 Space: O(1)
     ◦ We only used constant extra space
 */
//remove the nth node from the end of the list
//return head

// head = [1,2,3,4,5], n = 2
//5   4   3   2   1
//1-> 2-> 3-> 4-> 5-> null
//prev.next = current.next
//        3->     5

/*
 • Use a dummy node so you can access the node prior to the nth node from the end of the LL
     ◦ dummy = new ListNode( 0, head)
 • Use two pointers 
     ◦ left is initialized to the dummy
         ‣ left pointer will have access to the node prior to nth node from the end of the LL
     ◦ right is initialized to head
     ◦ Move the right pointer by 'n' spaces 
         ‣ while n > 0 move the right pointer and decrement 'n'
     ◦ Now use a while loop the runs while right is true. Focusing on right since it will hit null first
         ‣ Move left by one
             • left = left.next
         ‣ Move right by one
             • right = right.next
     ◦ Delete the nth node from the end of the LL
         ‣ left is the node behind the nth node from the end of the LL
             • left.next = left.next.next
             •                nth node.next
     ◦ return the dummy.next
         ‣ the dummy points to the head of the LL
 */
