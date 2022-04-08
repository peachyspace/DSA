/* 
1046. Last Stone Weight
https://leetcode.com/problems/last-stone-weight/
*/

/**
 * @param {number[]} stones
 * @return {number}
 */
var lastStoneWeight = function (stones) {
  let heap = new MaxHeap();
  for (let i = 0; i < stones.length; i++) {
    heap.add(stones[i]);
  }
  while (heap.values.length > 1) {
    let max1 = heap.removeMax();
    let max2 = heap.removeMax();
    if (max1 - max2 !== 0) {
      heap.add(max1 - max2);
    }
  }
  return heap.values.length !== 0 ? heap.values[0] : 0;
};

class MaxHeap {
  constructor() {
    this.values = [];
  }
  add(element) {
    this.values.push(element);
    this.bubbleUp();
  }
  bubbleUp() {
    let childIndex = this.values.length - 1;
    const child = this.values[childIndex];
    while (childIndex > 0) {
      let parentIndex = Math.floor((childIndex - 1) / 2);
      let parent = this.values[parentIndex];
      if (child <= parent) break;
      this.values[childIndex] = parent;
      this.values[parentIndex] = child;
      childIndex = parentIndex;
    }
  }
  removeMax() {
    if (this.values.length === 0) return null;
    const max = this.values[0];
    let recentlyRemoved = this.values.pop();
    if (this.values.length > 0) {
      this.values[0] = recentlyRemoved;
      this.bubbleDown();
    }
    return max;
  }

  bubbleDown() {
    let parentIndex = 0;
    const parent = this.values[0];
    while (true) {
      let leftChildIndex = parentIndex * 2 + 1;
      let rightChildIndex = parentIndex * 2 + 2;
      let leftChild, rightChild;
      let swap = null;
      if (leftChildIndex < this.values.length) {
        leftChild = this.values[leftChildIndex];
        if (leftChild > parent) {
          swap = leftChildIndex;
        }
      }
      if (rightChildIndex < this.values.length) {
        rightChild = this.values[rightChildIndex];
        if (
          (swap === null && rightChild > parent) ||
          (swap !== null && rightChild > leftChild)
        ) {
          swap = rightChildIndex;
        }
      }
      if (swap === null) break;
      this.values[parentIndex] = this.values[swap];
      this.values[swap] = parent;
      parentIndex = swap;
    }
  }
}

/* 
Time: O(n(log n) ) + O(n(log n) ) -> 2O(n(log n) ) -> O(n(log n) )
- 'n' is the length of the stones array
• for loop iterates through each element in the stones array and during each iteration we use the heap's add method. ( O(n(log n) ) time)
• while loop  iterates for at most 'n' times and during each iteration we call the heap's removeMax method twice and add method once
	◦ O(n (log n + log n + log n)) -> O( n (log n) ) time

Space: O(n)
• we are creating a heap array of size 'n'
*/

/* 
Steps: 
• create a from the stones array
	◦ iterate through each element in the stones array (O(n) time)
		‣ during each iteration add the element to the heap(O(log n ) time)
• execute a while loop  as long as the heap has more than one element
	◦ assign the value returned by removeMax() to max1
	◦ assign the value returned by removeMax() to max2
	◦ add the diff of max1 and max2 if the diff is not equal to 1
• return heap.value.length !== 0 heap.values[0] : 0
	◦ heap could have one value or be empty
*/
