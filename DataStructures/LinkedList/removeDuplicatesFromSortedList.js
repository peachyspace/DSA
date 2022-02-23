/* 
83. Remove Duplicates from Sorted List
https://leetcode.com/problems/remove-duplicates-from-sorted-list/
*/

const deleteDuplicates = function (head) {
  if (!head) {
    return head;
  }
  let current = head;
  while (current && current.next) {
    // current.next being truthy prevents errors
    if (current.val === current.next.val) {
      current.next = current.next.next;
    } else {
      current = current.next;
    }
  }
  return head;
};
/*
Time: O(n)  'n' is the number of nodes in the Linked List
    * Iterated through the whole Linked List once O(n)
Space: O(1)
    * No additional space is used
*/

/*
• Check if Linked List is empty
• While current and current.next are true:
	◦ If current.next.val === current.val
		‣ update current's next pointer
			• current.next = current.next.next
			• This allows us to remove the node from the Linked List
	◦ Else update current
		‣ current = current.next
		‣ Only update current when it's next pointer is pointing to a unique node because there can still be more duplicates of current. So we need current to stay in place in order to remove those duplicates.
			• linked List is sorted
• return the head
*/
// 1    ->   1  ->   2  ->   3   ->   3 -> null
// curr    curr.next
//update curr pointer when match found
//curr.next = curr.next.next  (2)

// 1      ->   2  ->   3   ->   3  -> null
// curr      curr.next
///move current pointer when no match is found
//curr = curr.next

// 1    ->   2  ->   3   ->   3  -> null
//         curr    curr.next
///move current pointer when no match is found
//curr = curr.next

// 1    ->   2  ->   3   ->   3  ->  null
//                 curr    curr.next
//update curr pointer when match is found
//curr.next = curr.next.next  (null)

const deleteDuplicates2 = function (head) {
  if (!head) {
    return head;
  }
  let prev = head;
  let current = head.next;
  while (current) {
    if (prev.val === current.val) {
      prev.next = current.next;
    } else {
      prev = prev.next;
    }
    current = current.next;
  }
  return head;
};

//list is guaranteed to be in sorted order
//head = [1,1,2]

// 1    ->   1  ->   2  ->   3   ->   3
//prev === curr
//prev.next = curr.next

//current = curr.next

// 1    ->   2  ->   3   ->   3
// prev !== curr
//prev = prev.next
//curr= curr.next

// 1    ->   2  ->   3   ->   3
//          prev !== curr
//prev = prev.next
//curr= curr.next

// 1    ->   2  ->   3   ->   3
//                  prev === curr
//prev.next = curr.next
//curr = curr.next
