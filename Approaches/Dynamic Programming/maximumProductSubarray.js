/* 
152. Maximum Product Subarray
https://leetcode.com/problems/maximum-product-subarray/

https://leetcode.com/problems/maximum-product-subarray/discuss/416395/JavaScript-Solution-w-Explanation
*/

/**
 * @param {number[]} nums
 * @return {number}
 */
const maxProduct = function (nums) {
  let prevMax = 1; //multiplying by 1 doesn't change num
  let prevMin = 1;
  let currentMax, currentMin;
  let result = nums[0]; //if the nums.length === 1
  for (let num of nums) {
    currentMax = Math.max(prevMax * num, num, prevMin * num);
    currentMin = Math.min(prevMax * num, num, prevMin * num);
    prevMax = currentMax;
    prevMin = currentMin;
    result = Math.max(result, currentMax);
  }
  return result;
};

/* 
Time: O(n),  n is the length of nums array
-Iterating through the array once: O(n)
- Math.max and Math.min always compare three values
Space:
-we create variables that hold an integer and as the input(array) grows the space that these variables take up doesn't change
*/

/* 
The intuition is that we store the information about our previous maximum product, and as we iterate through the array, we keep using our previous maximum to calculate the new maximum product
The tricky part of this problem is that negative numbers exist in the input array. This causes situations where the smallest previous product (a negative number) can become the largest product if the next number in line is also a negative number.
keep track of currMax = max(num*prevMax, num, num*prevMin)
- we acknowledge that the currMax product can come from max subarray, min subarray or new subarray
keep track of currMin = min(num*prevMax, num, num*prevMin)
- we acknowledge that the currMin product can come from max subarray, min subarray or new subarray
result will hold the largest product of the sub arrays so far

    // given the new number, the new maximun can have 3 conditions
    // 1. number(+) * prevMax(+) is the largest -- use min subarray ->  currMax can be a product of min subarray
    // 2. number(+) it self is the largest -- create new subarray -> currMax can be a product of a new subarray
    // 3. number(-) * prevMin(-) is the largest -- use max subarray -> currMax can be a product of max subarray  
*/
