/* 
876. Middle of the Linked List
https://leetcode.com/problems/middle-of-the-linked-list/
*/

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
const middleNode = function (head) {
  let fast = head;
  let slow = head;
  while (fast && fast.next) {
    //checks if we are at the end of LL and prevents errors
    fast = fast.next.next;
    slow = slow.next;
  }
  return slow;
};

/*
   Time: O(n)
       * We are visiting every node in the Linked List(O(n))
   Space: O(1)
       * We dont take up any additional space besides the pointers but they both stay constant even as the input gets very large
   */
//Input: head = [1,2,3,4,5]
//Output: [3,4,5]
//Input: head = [1,2,3,4,5,6]
//Output: [4,5,6]

// fast runner(2 steps) : 20 steps in in total
//slow runner (1 step) : 10 steps in total
//slow takes half the steps that fast takes, therefore we van say that by the time fast reaches the end of LL, slow is at the middle of LL.
//We can utilize a fast and slow pointer in order to get to the middle of the linked list
//after while loop terminates return the slow pointer
