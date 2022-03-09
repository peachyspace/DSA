/* 
max Subset Sum No Adjacent
https://www.algoexpert.io/questions/Max%20Subset%20Sum%20No%20Adjacent
*/
//Tabulation(bottom up approach)
function maxSubsetSumNoAdjacent(array) {
  // Write your code here.
  if (array.length === 0) {
    return 0;
  }
  if (array.length === 1) {
    //addrees edge case arr.length=1 when optimizing
    return array[0];
  }
  let table = new Array(array.length);
  table[0] = array[0];
  table[1] = Math.max(table[0], array[1]);

  for (let i = 2; i < array.length; i++) {
    table[i] = Math.max(table[i - 1], table[i - 2] + array[i]);
  }
  return table[array.length - 1];
}
/* 
  Time: O(n) 
• Iterated through the whole array once
• We do a couple of comparisons at each index which run on constant time
• n is the length of our input array

Space: O(n)
• we create maxSums array and it has the same length as the input array.
  */

/*
 Array is given to us
We create maxSums Array
Every index at maxSums array, we are storing the greatest sum that we can generate (with no adjacent numbers) up until and potentially including that index
• So because we're guaranteeing that all the numbers in maxSums represent the greatest sums, we can then rely on them to generate our maxSums of 'i'
	◦ 1) maxSums[i -1]   OR
	◦ 2) maxSums[i-2] + array[ i ]
		‣ maxSums[ i-2 ] doesn't include array [ i-1] and this means that they are NOT adjacent to each other
• Base case
	◦ maxSums[ 0 ] = array[ i ]
	◦ maxSums[ 1 ] = Math.max( maxSums[0], array[ 1 ] )
• Sample calculation in order to add an element to maxSums
	◦ maxSums[2] = max(maxSums[1], maxSums[ 0 ] + array[2] )

array  [75,105,120,75,90,135]
maxSum [75,105]
        0   1
 i=0 75
 i=1 105
 i=2 Math.max(table[1], table[0]+array[2]) 
     Math.max(105, 75 + 120)
		 Math.max(105, 195)
		 195 [75,105,195]
 i=3 Math.max(table[2], table[1]+array[3])
     Math.max(195, 105 + 75)
		 Math.max(195, 180)
		 195 [75,105,195,195]
 i=4 Math.max(table[3], table[2]+array[4])
     Math.max(195, 195 + 90)
		 Math.max(195, 285)
		 285 [75,105,195,195,285]
 i=5 Math.max(table[4], table[3]+array[5])
     Math.max(285, 195 + 135)
     Math.max(285, 330)
		 330
*/

//Tabulation(no array)
function maxSubsetSumNoAdjacent2(array) {
  if (array.length === 0) {
    return 0;
  }
  if (array.length === 1) {
    //addrees edge case arr.length=1
    return array[0];
  }
  let second = array[0];
  let first = Math.max(array[0], array[1]);
  for (let i = 2; i < array.length; i++) {
    let current = Math.max(first, second + array[i]);
    second = first; //prevents second === current
    first = current;
  }
  return first;
}
/* 
  Can you improve your solution?
Time: You have to iterate through each element the input array, so you cant improve that

Space: You created an array that is the same size as the input array. This array doesn't have to be used. By taking out the array the space complexity has become constant (O(1) )
• We only look at the previous two values of the sum and this tells us that we only need two stored values at any given point in time
• use variables first, second, as bas cases 
	◦ second = array[ 0 ]
	◦ first = Math.max( second, array[ 1 ] )
		‣ adjacent to array[ 2 ]
• At the end of each iteration update first and second
	◦ current = Math.max( first, second + array[ i ] )
	◦ first = current
	◦ second = first
  */
