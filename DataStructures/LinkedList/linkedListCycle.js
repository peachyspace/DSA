/* 
141. Linked List Cycle
https://leetcode.com/problems/linked-list-cycle/
*/

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

const hasCycle = function (head) {
  let fast = head;
  let slow = head;
  while (fast && fast.next) {
    //Chose fast bc it would the first pointer to reach the end of the list(null)
    fast = fast.next.next; // takes two steps and could be null
    slow = slow.next; //takes one step and could be null
    if (fast === slow) {
      //compare objects bc fast.next.next could be null
      return true;
    }
  }
  return false;
};

/*
Time: O(n) time
 ** 'n' is the length of Linked List and 'm' is the length of the cycle
 ** n >= m, so 'm' can never be greater than 'n'
 ** If we assume the worst case which is that 'n'==='m' then the time complexity is O(n+n) -> O(2n) -> O(n) (dropped coefficients )
    •We visit every node by the time to reach the end of the LL (O(n) time) or we visit less than or equal 'n' nodes by the time we reach the cycle(O(n) time)
    •We visit less than or equal to 'm' nodes in the circle (O(m)time)

Space: O(1)
    •We only used two pointers and the space that those pointers take stays constant as the input grows
        
*/
//return true if there is a cycle otherwuse return false
//head = [3,2,0,-4], pos = 1

//Imagine two pointers that are running a track but at different speeds.
//When they are running in a circle those two runners will eventually run in to each otther. So when the pointers are in the cycle then they will eventually meet.
//Fast pointer moves two steps ->fast.next.next
//Slow pointer moves one step ->slow.next
//No cycle: When the pointer reaches the end of the LL then the while loop teminates and we then return false
