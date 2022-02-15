/* 
49. Group Anagrams
https://leetcode.com/problems/group-anagrams/
 */
const groupAnagrams = function (strs) {
  //let anagramGroups = []
  let anagramTable = {};
  for (let i = 0; i < strs.length; i++) {
    let currElement = strs[i];
    let splitStr = currElement.split(""); //string to array
    let sortedArray = splitStr.sort(); // sort array
    let sortedElement = sortedArray.join(""); //turn array to string
    if (!(sortedElement in anagramTable)) {
      anagramTable[sortedElement] = [];
    }
    anagramTable[sortedElement].push(currElement);
  }
  // let keys = Object.keys(anagramTable)
  // for(let j=0; j< keys.length; j++){
  //     let currentKey = keys[j]
  //     anagramGroups.push(anagramTable[currentKey])
  // }
  return Object.values(anagramTable);
};
//Time complexity: O(n * klog(k)) time
//Iterating through each element in the array (O(n))
//  * k represents the longest strng we are sorting
//  *.split('') -> O(k)
//  *sorting the currElement during each iteration  ( O(klog(k)) )
//  *.join('') -> O(k)
//  * O(k)+O(k)+nlog(k) drop the least significant term we get O(klog(k))

//Space complexity: O(n * k)
//k represents the longest strng we are sorting
//Since we are using a hashTable to store "n" strings of up to length "k" the space complexity is O(n*k)
//  * Hash tables have a space complexity of O(n) , n is the amount of keys stored in the hasTable
//  * In the worst case we will store "n" strings that are of length "k" in the hashTable
//If the elements were integers, we could consider them as O(n) because they are stored in SAME storage of 32 bits. However, in the case of strings, each character occupies 2 bytes and strings are also parameter in the question, so we have to consider that while calculating the space complexity.

//Steps:
//Iterate through the array named strs
//for each element we visit
//  *we .split('') ---> string to array
//  *we .sort() ---> characters in the array are sorted
//  *we .join('') ---> characters in array combined and become a string
//  *if the sortedElement is not in the anagramTable then
//      - add both sortedElement to table as key and an empty array as it's value
//  *update value of sortedElement key:
//      - anagramTable[sortedElement].push(currElement)
//return the values of amagramTable
