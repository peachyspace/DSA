/* 
88. Merge Sorted Array
https://leetcode.com/problems/merge-sorted-array/
*/

/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
const merge = function (nums1, m, nums2, n) {
  let last = m + n - 1;

  while (m > 0 && n > 0) {
    if (nums1[m - 1] > nums2[n - 1]) {
      nums1[last] = nums1[m - 1];
      m--;
    } else {
      //nums2[n] is greater than or equal to nums1[m]
      nums1[last] = nums2[n - 1];
      n--;
    }
    last--;
  }
  //if n is not zero then insert the remaining numbers to nums1
  while (n > 0) {
    nums1[last] = nums2[n - 1];
    n--;
    last--;
  }
};

/*
Time: O(m + n)
• We iterate both arrays that are of size m and n.
Space: O(1)
• Three pointers are always used regardless of the input size
*/

//two arrays are sorted in acsending order
//nums1 = length m
//nums2 = length n
//diff lengths
//merge the arrays into nums1

//[1,2,3,0,0,0]
//     ^     ^

//[2,5,6]
//     ^

/*
We are given  two pointers that both  point to the last element (the last non-zero number in the case of num1)
Every time you use m or n to access an element in the array you must decrease it by one since arrays are indexed at 0

create another pointer that is at the end of num1
• last = m + n +1

iterate trough num1 and num2 in a reverse order
• runs while m is bigger than zero and n is bigger than zero
	◦ if the m pointer at nums1 is greater than the n pointer at nums2
		‣ swap the values between the last pointer and m pointer
		‣ decrement m
	◦ else swap the values between n pointer and last pointer, since  n is greater than m
		‣ decrement n
	◦ regardless of which pointer you decrement you always decrement the last pointer of num1
fill nums1 with left over num2 elements . This happens when m pointer has an index of zero but n pointer has not.
• while loop runs while n is greater than 0
	◦ swap values between n and last pointer
	◦ decrement n
	◦ decrement last

note since we are returning num1, we wont ever miss numbers from that array but we can miss numbers in num2 since we are not returning num2 
 
*/
