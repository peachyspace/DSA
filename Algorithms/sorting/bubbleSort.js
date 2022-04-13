/* 
Bubble Sort
https://www.algoexpert.io/questions/Bubble%20Sort
*/

function bubbleSort(array) {
  let noSwap;
  for (let i = array.length; i > 0; i--) {
    noSwap = true;
    for (let j = 0; j < i - 1; j++) {
      if (array[j] > array[j + 1]) {
        let temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
        noSwap = false;
      }
    }
    if (noSwap === true) break;
  }
  return array;
}

/* 
Time: O(n^2)
• n is the total amount of elements in the array
• for each element in the array we are making n comparisons
• Best Case: if the data is sorted or nearly sorted then the time complexity is O(n)
Space: O(1)
• sorted in place
*/

/*
• create a variable called noSwap
• iterate from the end of the array to the beginning with the variable called i
	◦ set noSwap to true
	◦ Inner for loop iterates from the beginning of the array to and stops when it hits the element[i-1] next to the sorted boundary[i] 
		‣ if array[j] > array[j+1] then swap and set noSwap to false
	◦ after the inner for loop stops executing if noSwap is set to true then break
• return array
*/
