/* 
904. Fruit Into Baskets
https://leetcode.com/problems/fruit-into-baskets/
*/

/**
 * @param {number[]} fruits
 * @return {number}
 */
const totalFruit = function (fruits) {
  let hashMap = new Map();
  let maxLength = -Infinity;
  let start = 0;
  for (let i = 0; i < fruits.length; i++) {
    let currentFruit = fruits[i];
    hashMap.set(currentFruit, hashMap.get(currentFruit) + 1 || 1);
    while (hashMap.size > 2) {
      let startFruit = fruits[start];
      if (hashMap.get(startFruit) - 1 === 0) {
        hashMap.delete(startFruit);
      } else {
        hashMap.set(startFruit, hashMap.get(startFruit) - 1);
      }
      start++;
    }
    //at this point we know that the window is valid
    //we need to check if the current length is greater than the maxLength
    maxLength = Math.max(maxLength, i - start + 1);
  }
  return maxLength;
};
/*
Time: O(n)
• n is the length of the given array
• we iterate the array at most twice (for loop, while loop )
Space: O(1)
• Only used constant space
*/

/* 
Map data structure (stores key-value pairs)
• already iterable so no need for Object.keys.
• access to the number of propertied in the map  
	◦ map.size returns # properties in map
	◦ hash table doesn't know how many properties are inside it
• map.set( key, value )
• map.get( key )
• map.delete( key )
• Map key uniqueness 
	◦ There are no duplicate keys in a map 
*/

/*
 
t0, t1, t2  t3
[0, 1,  2,  1] three types of fruits: 0,1,2
2 baskest (each basket can contain an unlimited amt of one type of fruit)
return max amount of fruits I can pick
valid window has only two types of fruit

use a map 
• we can get the total # of properties in the map
	◦ useful because we will know when the the map has only 2 properties 
start =0
maxLength = -Infinity

during each iteration add a fruit to the window
• add current fruit to window
	◦ hashMap.set( currentFruit, hashMap.get(currentFruit) +1  | |  1 )
	◦ adding a new key-value pair in each iteration because maps don't allow duplicates and so any duplicate will be overwritten with this new entry
	◦ hashMap.get(currentFruit) +1  | |  1 
		‣ checks if the key doesn't exist in the map than assign the value to  1
• while the window is valid ( map only has to properties) decrement values of properties in map
	◦ grab property startFruit = fruits[ start ]
	◦ if the properties value minus 1is 0 then delete the key-value pair
	◦ else set the startFruit and hashMap.get(startFruit) - 1 as a key-value pair
		‣ decrement the value of startFruit when creating a key value pair
	◦ move start by one (increment start)
• update maxLength
	◦ Math.max(maxLen, i - start + 1 )
	◦ At this point the window is valid and we need to check if it's current length is bigger than maxLength

return maxLength

*/
