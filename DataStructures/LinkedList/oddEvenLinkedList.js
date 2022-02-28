/* 
328. Odd Even Linked List
https://leetcode.com/problems/odd-even-linked-list/
*/

const oddEvenList = function (head) {
  if (!head) {
    return null;
  }
  let odd = new ListNode(0, head);
  let oddTail = odd.next;
  let even = new ListNode(0, head.next);
  let evenTail = even.next;

  while (evenTail && evenTail.next) {
    //evenTail always reaches null first since it always comes after oddTail
    oddTail.next = evenTail.next; //the # next to even# is odd
    oddTail = oddTail.next; //move oddTail
    evenTail.next = oddTail.next; // the # next to odd# is even
    evenTail = evenTail.next; //move evenTail
  }
  oddTail.next = even.next;
  return head;
};

/*
Time: O(n) 
• We traverse every node in the LL once

Space: O(1)
• We created evenList,oddList and two pointers  that take up constant space
        ◦ only two nodes were created and no other nodes were created (oddList, evenList) and they take up constant space
        ◦ The two pointers(oddTail, evenTail) all take up constant space
*/

/*
Why does your solution has O(1) space complexity? Is it just because you created a new oddList and evenList pointer and did not create any new listNodes in memory?

The nodes just take up the same memory they already did, plus a small constant overhead of adding a couple of pointers

If we were working in  a moving company and we had boxes that were lined up in the wrong order and our boss came in and told us to reorder the boxes, we wouldn't grab everything and throw them into new boxes . We would only need to scoot around boxes into the right order.
We have not put anything into new boxes. We are just pointing to two boxes at a time and saying 'that goes here, that goes there', and the we end up with two rows of boxes that we scot together at the end
*/
/*
Check if the head is empty
Create an even list and an odd list
• oddList points to head
• oddTail points to oddList.next
	◦ allows us to add to oddList
• evenList points to head.next
• evenTail points to evenList.next
	◦ allows us to add to evenList
Iterate through the LL when evenTail && evenTail.next are true
• Set oddTail.next to evenTail.next
	◦ evenTail is next  to an odd number
• Move oddTail (oddTail =oddTail.next)
• Set evenTail to oddTail.next
	◦ oddTail is next to an even number
• Move evenTail(evenTail = evenTail.next)
When the while loop is terminated then we have an odd list and an even list that we can connect
• oddTail.next = even.next

return head 
the two nodes(oddList, evenList) we created and the pointers were all used to rearrange the original LL. We didn't create an entirely new LL with nodes that take up additional memory
*/
