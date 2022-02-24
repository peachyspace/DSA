/* 
21. Merge Two Sorted Lists
https://leetcode.com/problems/merge-two-sorted-lists/
*/

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

var mergeTwoLists = function (list1, list2) {
  let sentinel = new ListNode();
  let tail = sentinel;
  while (list1 && list2) {
    if (list1.val <= list2.val) {
      tail.next = list1;
      list1 = list1.next;
    } else {
      tail.next = list2;
      list2 = list2.next;
    }
    tail = tail.next; //without this tail will always be the sentinel
  }
  tail.next = list1 || list2;
  return sentinel.next;
};

/*
Time: O(m+ n)
	-'n' is the amount of nodes in list1
	-'m' is the amount of nodes in list2
	- We iterate through each of the nodes in both of the lists, in order to add them to the merged list

Space: O(1)
	- no additional space need because we merged two lists together 
*/

/*
• Initialize the dummy node  don't assign it any value
	◦ lets you avoid the edge case of inserting to an empty list
• Initialize a tail that is equal to the sentinel
	◦ this allows us to add to the end of the merged linked list
• Note the list1 holds the head of the LL and list2 also holds a head
• Iterate through both of the lists while they are both true
	◦ if  list1.val is  less than list2.val
		‣ Make the tail's pointer, point to list1
			• tail.next = list1 
		‣ Move list1
			•  list1= list1.next
	◦ else 
		‣ Make the tail's pointer,  point to list2
			• tail.next = list2
		‣ Move list2
			• list2 = list2.next
	◦ Move the tail (tail = tail.next)
		‣ if you don't move the tail then you will only be changing sentinels next pointer. You will only return the last node of one of the two lists
• Check if either pointer is truthy and connect the tail to the pointer
	◦ tail.next = list1 | |  list2
• return sentinel.next
	◦ the head of the merged list
*/
