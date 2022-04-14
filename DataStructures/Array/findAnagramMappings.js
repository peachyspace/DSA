/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var anagramMappings = function (nums1, nums2) {
  let hashTable = {};
  for (let i = 0; i < nums2.length; i++) {
    if (!(nums2[i] in hashTable)) {
      hashTable[nums2[i]] = i;
    } else {
      hashTable[nums2[i]] = i;
    }
  }
  let array = [];
  for (let i = 0; i < nums1.length; i++) {
    array.push(hashTable[nums1[i]]);
  }
  return array;
};

/*
Time: O(n) + O(n) = O(2n) -> O(n)
- 'n' is the length of of nums1 and nums2
- Iterated through nums2
- Iterated through nums1

Space: O(n)
-Created a hash table that has 'n' entires
*/

/*
Iterate through the nums2 array while making the elements, keys of the hashtable and its indices values.
Iterate through nums1 and push hashTable[nums1[i]] onto the array
*/
