/* 
Single Cycle Check
https://www.algoexpert.io/questions/Single%20Cycle%20Check
*/

function hasSingleCycle(array) {
  let numOfElementsVisited = 0;
  let currentIdx = 0;
  while (numOfElementsVisited < array.length) {
    //we wont enter this while loop
    //when visited array.length elements
    if (numOfElementsVisited > 0 && currentIdx === 0) {
      return false;
    }
    numOfElementsVisited++;
    currentIdx = getNextIdx(currentIdx, array);
  }
  return currentIdx === 0;
}

function getNextIdx(currentIdx, array) {
  let jump = array[currentIdx];
  let nextIdx = (currentIdx + jump) % array.length;
  return nextIdx >= 0 ? nextIdx : nextIdx + array.length;
  //takes care of negative indices that
  //would make us go out of bounds
  //negative index is making us go backwards
}

/* 
• tricky question:
• Approach 1: have an array that tracks the amount of times we visit the number at a certain index
• Approach 2: 
	◦ make sure we visit 'n' elements (n is length of given sum)
	◦ We have multiple cycles if:
		‣ if we are past index 0 and we go back to index 0
			• m(# of jumps) is greater than 1 but less than n(array.length)
			• we have not yet visited n elements
		‣ if once we visited or jumped through n elements, we're not back at the starting point(starting index)
*/

/* 
getNextIndex function
• jump = array[currentIndex]
• nextIdx = (currentIdx + jump) % array.length
	◦ [ 26,1, 2, 3, 4]
	◦ nextIdx = ( 0 + 26 ) % 5 = 1
		‣ you are doing 5 full sweeps(length 5) of the array of length 5 and on the 6th sweep you only do a partial sweep until index 1
		‣ modulo returns the remainder 
			• 26 / 5 = 5 remainder 1
• return nextIdx >= 0 ? nextIdx : nextIdx + array.length
	◦ do we have negative # ? yes
	◦ if nextIdx is a negative number
		‣ don't use a negative number as an index because that value doesn't exit
		‣ in order to not go out of bounds of the array we add the length of the array
			• negative index mean we are going backwards
*/
