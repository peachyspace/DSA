/* 
347. Top K Frequent Elements
https://leetcode.com/problems/top-k-frequent-elements/
*/

//heap
const topKFrequent = function (nums, k) {
  let hash = {};
  for (let number of nums) {
    if (!(number in hash)) {
      hash[number] = 0;
    }
    hash[number]++;
  }

  let minHeap = new MinHeap();
  let keys = Object.keys(hash);
  for (let key of keys) {
    if (minHeap.values.length < k) {
      minHeap.enqueue(key, hash[key]);
    } else if (hash[key] > minHeap.peek().freq) {
      minHeap.dequeue();
      minHeap.enqueue(key, hash[key]);
    }
  }

  const freqArray = [];
  for (let i = 0; i < k; i++) {
    freqArray.push(minHeap.dequeue().val);
  }
  return freqArray;
};
class Node {
  constructor(val, freq) {
    this.val = val;
    this.freq = freq;
  }
}
class MinHeap {
  constructor() {
    this.values = [];
  }
  enqueue(val, freq) {
    let newNode = new Node(val, freq);
    this.values.push(newNode);
    this.bubbleUp();
  }
  bubbleUp() {
    const child = this.values[this.values.length - 1];
    let childIndex = this.values.length - 1;
    while (childIndex > 0) {
      let parentIndex = Math.floor((childIndex - 1) / 2);
      let parent = this.values[parentIndex];
      //let swap = false
      if (child.freq >= parent.freq) {
        break;
      }
      //if(swap === false) break
      this.values[childIndex] = parent;
      this.values[parentIndex] = child;
      childIndex = parentIndex;
    }
  }
  peek() {
    if (this.values.length === 0) return null;
    return this.values[0];
  }
  dequeue() {
    if (this.values.length === 0) return null;
    let removed = this.values[0];
    let replacement = this.values.pop();
    if (this.values.length !== 0) {
      this.values[0] = replacement;
      this.bubbleDown();
    }
    return removed;
  }
  bubbleDown() {
    const parent = this.values[0];
    let parentIndex = 0;
    while (true) {
      let leftIndex = parentIndex * 2 + 1;
      let rightIndex = parentIndex * 2 + 2;
      let left, right;
      let swap = null;

      if (leftIndex < this.values.length) {
        left = this.values[leftIndex];
        if (left.freq < parent.freq) {
          swap = leftIndex;
        }
      }
      if (rightIndex < this.values.length) {
        right = this.values[rightIndex];
        if (
          (swap === null && right.freq < parent.freq) ||
          (swap !== null && right.freq < left.freq)
        ) {
          swap = rightIndex;
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
Time: O(n * log k) 
• we iterate through the array in order to create the hash table: O(n)
• we iterate through the arrayO(n)
	◦ throughout the iteration we are doing O(log k) work when we enqueue and/or dequeue
• we iterate through the array again

Space: O( n + k)
• create a hash table of size n
• create a heap of size k
*/

/* 
Priority queue
Use a min heap to hold the most freq numbers in the array
• as we iterate the array the min will hold the most freq numbers SO FAR and by the time we reach the end of the array, the heap will have the most freq numbers
	◦ this accomplished by preventing the heap's length to be less than k and by removing the top element when the current number's freq is greater than top element  freq in order to add the current number
*/

//bucket sort
const topKFrequent2 = function (nums, k) {
  const hash = {};
  const bucket = Array(nums.length);
  for (let number of nums) {
    if (!(number in hash)) {
      hash[number] = 0;
    }
    hash[number]++;
  }
  let keys = Object.keys(hash);
  for (let key of keys) {
    if (!bucket[hash[key]]) {
      bucket[hash[key]] = [];
    }
    bucket[hash[key]].push(key);
  }

  const output = [];
  for (let i = bucket.length - 1; i > 0; i--) {
    if (!bucket[i]) continue;
    for (let j = 0; j < bucket[i].length; j++) {
      if (output.length === k) break; //break ends inner loop only
      output.push(bucket[i][j]);
    }
  }
  return output;
};

/* 
Time: O(n), n is the length of nums array
• We iterate through the nums array. O(n)
• we iterate through bucket array, whose length is equal to nums array O(n)

Space: O(n)
• The hash table in the worst case would have n entries
• the bucket array will always have a length of n
*/

/* 
n is the length of the nums array
Bucket sort
• create and fill a freq table using nums array
• create a bucket array of length n
	◦ each index of the bucket array represents a frequency
	◦ index 2 would hold the numbers that have a frequency of 2
• create output array
• iterate through bucket array in order to fill output array until it's length is k
• return output array
*/
