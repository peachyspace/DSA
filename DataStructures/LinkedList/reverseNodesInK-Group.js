/*  
25. Reverse Nodes in k-Group
https://leetcode.com/problems/reverse-nodes-in-k-group/
*/

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * param {ListNode} head
 * param {number} k
 * return {ListNode}
 */
const reverseKGroup = function (head, k) {
  let dummy = new ListNode(0, head);
  let prevGroup = dummy;

  //loop will run while true
  while (true) {
    //need to find kth node
    let kth = findKth(prevGroup, k);
    if (!kth) {
      //their is not k nodes in group
      break; //leave the remaining nodes alone
    }
    let nextGroup = kth.next; //kth group is next to the 1st node in nextGroup
    //reverse part
    let prev = kth.next; //we want to eventually connect reveresed group back to LL
    let current = prevGroup.next;
    let next = null;
    while (current !== nextGroup) {
      //keep reversing as long current doesnt become nextGroup
      next = current.next;
      current.next = prev; //in the first iteration we begin connecting the partially reversed group to LL
      prev = current;
      current = next;
    }
    //save the the 1st node of the original group
    let temp = prevGroup.next;
    prevGroup.next = kth; // finish connectin the reveresed group to LL
    prevGroup = temp; //updat prevGroup to be the last node in the reveresed group.This node was once the first node of the original group
  }
  return dummy.next;
};

const findKth = function (current, k) {
  while (current && k > 0) {
    current = current.next;
    k--;
  }
  return current; //either be null or a node
};

/*
Time: O(n)
• We iterated over each node in the LL once

Space: O(1)
• We used pointers that take up constant space
*/

/*
Create a dummy node and pointers
• set dummy to head
• set groupPrev = dummy
	◦ the group before the group is reversed
• set current to head
• set nextGroup to null

Iterate while true (reversing part)
• Set kth to getKth( groupPrev, k)
	◦ if kth is not true, then that means that there are not k nodes in this group 
		‣ we don't have enough nodes to reverse
• If kth is false then break out of the loop since there no more valid groups to reverse
• Set nextGroup to kth.next
• set prev to kth.next
	◦ We don't use null because we don't want to split the LL
	◦ kth.next is the 1st node in the next Group and so we we are connecting the reversed group back to the LL
• set current to groupPrev.next
	◦ groupPrev is next to the 1st node of the group we are about to reverse
• set next to null
• iterate while current doesn't equal groupPrev.next
	◦ set next to current.next
	◦ set current.next to prev
		‣ reversal part
		‣ in the last iteration, we initiate connecting the reversed group to the LL
	◦ set prev to current
	◦ set current to next
• Save the 1st node in the group to temp
	◦ temp = groupPrev.next // still points to the original first node of the group
• When we are out of the while loop we finish connecting the reversed group to the LL
	◦ groupPrev.next =kth
		‣ kth node is the 1st node in the reversed group
• We want the last node of the reversed LL to be saved in groupPrev
	◦ groupPrev = temp
	◦ The last node in the reversed group was once the first node in the group

return dummy.next // points to the rearranged LL

getKth( current, k)
• iterate while current is true and k is greater than 0
	◦ move current
		‣ current = current.next
	◦ decrement k
• return current //kth node in the group
*/
