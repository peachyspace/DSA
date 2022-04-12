/* 
Selection Sort 
AlgoExpert: https://www.algoexpert.io/questions/Selection%20Sort
*/

function selectionSort(array) {
  for (let i = 0; i < array.length; i++) {
    let smallest = i;
    for (let j = i + 1; j < array.length; j++) {
      let current = j;
      if (array[current] < array[smallest]) {
        smallest = current;
      }
    }
    if (smallest !== i) {
      let temp = array[i];
      array[i] = array[smallest];
      array[smallest] = temp;
    }
  }
  return array;
}
/*
Time: O(n^2)
• we traverse through the whole array: O(n)
	◦ during each iteration we traverse through the rest of the array:O(n)
Space: O(1)
• we sorted the array in place
*/

/*
iterate through the array
• create smallest = index
• for each iteration we must traverse through the rest of the array and find smallest number
• after we traverse the array we must check if  smallest !== index
	◦ swap the values at i and smallest 
return array
*/
