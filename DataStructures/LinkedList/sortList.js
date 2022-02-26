/* 
148. Sort List
https://leetcode.com/problems/sort-list/
*/
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

const sortList = function (head) {
  if (!head || !head.next) {
    //if empty or only one node
    return head;
  }
  let left = head;
  let right = findMiddle(head); //access to node before 2nd half
  let temp = right.next; // access to 2nd half of LL
  right.next = null; // Split LL in half
  right = temp; //right has access to 2nd half of LL
  left = sortList(left); //split LL in half until we have one node
  right = sortList(right); //split LL in half until we have one node
  return merge(left, right);
};

const findMiddle = function (head) {
  let slow = head;
  let fast = head.next; // Makes slow end up in the 1st half LL
  while (fast && fast.next) {
    //helps prevent errors when doing fast.next.next
    slow = slow.next;
    fast = fast.next.next;
  }
  return slow; //last node of the 1st half of LL
};

const merge = function (leftList, rightList) {
  let dummy = new ListNode();
  let tail = dummy;
  while (leftList && rightList) {
    //Both lists must be true in order to compare
    if (leftList.val < rightList.val) {
      tail.next = leftList; // inserting to merged LL
      leftList = leftList.next;
    } else {
      tail.next = rightList; //inserting to merged LL
      rightList = rightList.next;
    }
    tail = tail.next; //we always move the tail so we can have access to the end of the merged list
  }
  if (leftList) {
    tail.next = leftList;
  }
  if (rightList) {
    tail.next = rightList;
  }
  return dummy.next; //the head of the merged LL
};
/*
Time: O( n log(n) ): 
• Breakdown: At each level in the recursive tree we split  the LL in half. We do this for a total of log(n) times
• Buildup: At each level  of the recursive tree we merge 'n' nodes, which takes O(n) time
• We split for log(n) levels and in each of those levels you merge which is O(n) time. Total time complexity is O(n * log(n))

Space: O(log(n))
• We are not adding all the function calls at once instead we add them one by one. At any given point during the execution of this recursive function. The max amount of call's is the max depth of the tree. The call stack will have at most log(n) recursive calls 

Note: this recursive function always creates a binary tree because it splits the LL in half 
*/

//break down
// find middle
//Seperate the LL (both LL need to point to null)
//sort by doing recursive call on left
//sort by doing recursive call on right
//merge and compare
//return the returned LL from merge function

//getMiddle(head)
//slow is set to head
//fast is set to head.next (allows us slow to find mid at 1st half)
//move pointer until we reach end of LL
// slow will the last node in the 1st half of LL
//return slow
//merge(left, right)
//use a dummy node to make insertion of node easier
//use a tail in order add to the end of the merged LL
//iterate over the 2 lists until one list is emopty
//compare the nodes and insert the smalled of the two into the merged
//After iteration check if either of the lists are not empty
//  Add the non-empty list to the merged LL
//return the dummy.next(head of merged LL)
/*
Recursion + Merge
• Base Case: We are not given a head or the head.next is null
	◦ return head
		‣ If head.next is null then that means we can longer split the LL since we were given only one node. 
			• therefore the node itself is sorted and thats why we return head
				◦ We want the head of the sorted LL
• Split the list into two halves(we were given more than one node)
	◦ Create a left pointer that is assigned to the head
	◦ Create a right pointer that is assigned to the value returned by the helper function called getMid(head).
	◦ Create a temp variable that hold right.next
	◦ Set right.next to null 
		‣ Splitting the list in half
	◦ Set right equal to temp
		‣ We still know what is the next node after right
		‣ We still have access to the second half of the LL
• Sort the left list 
	◦ Call our  recursive function and pass left pointer(left head)
• Sort the right list 
	◦ Call our recursive function and pass right pointer(right head)
• return the LL returned by the merge helper function 
	◦ use a helper function that takes the left and right list and merges them
    
getMid(head) helper function
• Create a slow pointer that is set to head
• Create a fast pointer that is set to head.next
	◦ We do this, so the mid point will be in the first half of the LL when we have an even number of nodes in the Linked List
• While loop will run as long as fast AND fast.next are true(this prevents errors when doing fast.next.next)
	◦ Move slow pointer by one 
		‣ slow = slow.next
	◦ Move fast pointer by two
		‣ fast = fast.next.next
• By the time the fast pointer is out of bounds, we know that the slow pointer will be at the middle node (thats part of the 1st half of LL) and so we an return the slow node

merge( list1, list2 ) helper function
• Create a dummy node 
	◦ This makes it easier to merge two LL's dummy nodes
		‣ The dummy node gives the tail something to point to initially when the result list is empty. After that the pointer tail always points to the last node in the result list, so appending a new node is easy
• Create a tail node that is set to the dummy node
• While loop will run as long as list1 AND list2 are non-empty
	◦ If list1's val is less then list2's val
		‣ insert list1 to the merged LL (tail.next = list1)
		‣ Move list1 to the next position( list1= list1.next)
	◦ Otherwise we know that list2 has a smaller val or that they are equal 
		‣ Insert list2 to merged LL ( tail.next = list2)
		‣ Move list1 to the next position( list2 = list2.next)
	◦ In either case whether we're adding from list1 or list2 we are always moving the tail pointer. This allows us to add at at the END of the LL
• Once the while loop stops executing, we know at least one of the lists have become null. Its still possible that the other list is not null, meaning that there is still elements for us to still add
• Check if list1 is NOT null
	◦ Add the remaining  portion to the merged list(tail.next = list1)
• Check if list2 is NOT null
	◦ Add the remaining portion to the merged list(tail.next =list2)
• Return dummy.next
	◦ if we just return dummy we are including an unnecessary node
*/
