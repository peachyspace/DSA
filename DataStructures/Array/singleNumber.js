/* 
136. Single Number
https://leetcode.com/problems/single-number/
*/
const singleNumber = function (nums) {
  let xorNum = 0; //nums[0]
  for (let i = 0; i < nums.length; i++) {
    let currNum = nums[i];
    xorNum = xorNum ^ currNum;
  }

  return xorNum; // computer knows the number represention of this binary number
};

/**
bit (binary repensation of a number)
Time: O(n)
    •We XOR of all the bits in the array together which requires us to visit every number in the array once(O(n))
Space: O(1)
    •No additonal space is taken
 */

//https://www.binaryconvert.com/convert_signed_int.html
//in JavaScript "^" represents the bitwise XOR operation
//  *XOR returns 0 if the integers are of the same value
//  *An array that has 2 duplicates for each integer in it and uses the XOR operatior on each  integer will get a value of zero
//If we take the XOR of 0 and any other number,it will return that bit
// 2 ^ 0 = 2 (XOR of 2 and 0 is 2)
//However if we take the XOR of the two same bits, it will return 0
// 2 ^ 2 = 0 (XOR of 2 and 2 is 0)
// 2^2^1 = 1 is the non repeating number
//Input: nums = [2,2,1]
//0: 00000000 00000000 00000000 00000000
//XOR
//2: 00000000 00000000 00000000 00000010
//_______________________________________
//2: 00000000 00000000 00000000 00000010

//2: 00000000 00000000 00000000 00000010
//XOR
//2: 00000000 00000000 00000000 00000010
//_______________________________________
//0: 00000000 00000000 00000000 00000000

//0: 00000000 00000000 00000000 00000000
//XOR
//1: 00000000 00000000 00000000 00000001
//_______________________________________
//1: 00000000 00000000 00000000 00000001
