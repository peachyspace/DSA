/*
2. Add Two Numbers
https://leetcode.com/problems/add-two-numbers/
*/

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

const addTwoNumbers = function (l1, l2) {
  let sumLL = new ListNode();
  let tail = sumLL;
  let carry = 0;
  while (l1 || l2 || carry) {
    let num1;
    let num2;
    if (l1) {
      num1 = l1.val;
    } else {
      num1 = 0;
    }
    if (l2) {
      num2 = l2.val;
    } else {
      num2 = 0;
    }
    let sum = num1 + num2 + carry;
    let onesPlace = sum % 10; //one's place
    carry = Math.floor(sum / 10); //gives 1 if sum >=10
    tail.next = new ListNode(onesPlace); //adding to sumLL
    l1 = l1 ? l1.next : null; //null values can still enter while loop
    l2 = l2 ? l2.next : null; //null values can still enter while loop
    tail = tail.next;
  }
  return sumLL.next;
};
//reverse : 342 -> 243
//positve numbers
//not empty
//single digit

//   1,1,1,1,1,1---
//[9,9,9,9,9,9,9] |
//[9,9,9,9]       |
//               \/
//[8,9,9,9,0,0,0,1]
//
//adding two LL of different lengths
//carry over
//add remaining carry over

/*
Time: O(max ( m, n ) )
	◦ We iterated at most max( m, n ) times
		‣ At worst case the list are not of the same size
Space O( max( m, n ) )
	◦ We created a LL of length 'n' or 'm', whoever is the longest
		‣ At worst case the lists are not of the same size
*/
/*
Edge cases:
• Adding two LL of different lengths
	◦ just interpret null as a 0
• Having to add carry overs to the next sum
	◦ Create a carry variable saves the carry# from the last sum and in then in the next iteration it's add to the new sum 
		‣ carry = Math.floor( sum / 10 )
• Carry Overs that remain after both lists end
	◦ while loop runs there is still a carry#
	◦ after carry has been added to LL
		‣ the carry is assigned 0 and thus terminating the while loop
			• carry =  Math.floor( 1 /10 ) --> Math.floor( 0.1 ) --> 0

Pseudo Code:
• Create dummy node this makes inserting to an empty linked easier
• Create a tail node
	◦ makes adding to the end of the LL possible
• Create a carry variable that is initialized to 0
	◦ Putting outside the while loop allows us to add the the carry value to the next sum since it wont be overwritten
• While loop will run as long as either List1 or List2 or carry are truthy
	◦ first check if the list1 is not null
		‣ if true then assign 0 to the variable num1
	◦ check if list2 is not null
		‣ if true then assign 0 to the variable num2
	◦ Get the sum
		‣ num1 + mum2  + carry
	◦ Get ones digit of sum to tail by creating a new node with the one's value
		‣ onesPlace= sum % 10
	◦ Add onesPlace to newLL by creating a new node with the one's value
		‣ tail.next = new ListNode(onesPlace)
			• Remember we are creating a new LL 
	◦ Calculate carry over
		‣ carry = Math.floor( sum /10 )
	◦ Move list1
		‣ list1 = list ? list.next : null
			• null values can still enter the while loop
	◦ Move list2
		‣ list2 = list2 ? list.next : null
			• null values can still enter the while loop
	◦ Move tail
		‣ tail = tail.next
• return dummy.next
	◦ dummy nodes point to the head of the LL
*/
