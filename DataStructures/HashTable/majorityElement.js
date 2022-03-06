/* 
169. Majority Element
https://leetcode.com/problems/majority-element/
*/
/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function (nums) {
  let hashTable = {};
  for (let i = 0; i < nums.length; i++) {
    let current = nums[i];
    if (!(current in hashTable)) {
      hashTable[current] = 0;
    }
    hashTable[current]++;
  }
  let keys = Object.keys(hashTable);
  for (let j = 0; j < nums.length; j++) {
    let current = nums[j];
    if (hashTable[current] > nums.length / 2) {
      return current;
    }
  }
};
/*
Time: O(n)
• We iterated trough each element 3 times regardless of the size of the array
Space: O(n)
• At worst case all the elements in the array are unique and so the length of the array dictates the amount of entries in the hash table
*/
/*
Use hash table 
then count the occurrence of each element(n: count)
Iterate through the array again and compare each value to n/2
*/
