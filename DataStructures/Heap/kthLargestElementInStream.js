/* 
703. Kth Largest Element in a Stream
https://leetcode.com/problems/kth-largest-element-in-a-stream/
*/

/**
 * @param {number} k
 * @param {number[]} nums
 */
const KthLargest = function (k, nums) {
  //adding nums and k as a property of KthLargest class
  //so can have a reference to them in KthLargest functions
  this.k = k;
  this.heap = new MinHeap();
  //constructing min heap of size k
  nums.forEach((element) => this.add(element));
};

/**
 * @param {number} val
 * @return {number}
 */
KthLargest.prototype.add = function (val) {
  if (this.heap.data.length < this.k) {
    this.heap.offer(val);
  } else if (this.heap.peek() < val) {
    //excluding small values bc we want to find kth largest num
    this.heap.offer(val);
    this.heap.poll();
  }
  return this.heap.peek();
};

class MinHeap {
  constructor() {
    this.data = [];
  }
  //offer is a python and java func that adds to a heap
  offer(val) {
    //O(log k) time
    this.data.push(val);
    this.bubbleUp();
  }
  bubbleUp(val) {
    //O(log k) time
    let childIndex = this.data.length - 1;
    const child = this.data[this.data.length - 1];
    while (childIndex > 0) {
      let parentIndex = Math.floor((childIndex - 1) / 2);
      let parent = this.data[parentIndex];
      if (child >= parent) break; //minHeap: child is bigger than parent
      this.data[childIndex] = parent;
      this.data[parentIndex] = child;
      childIndex = parentIndex;
    }
  }

  //poll is a python and java function that removes the
  //root and bubbles down in order to preserve the heaps order
  poll() {
    if (this.data.length === 0) return null;
    const result = this.data[this.data.length - 1];
    let recentlyAdded = this.data.pop();
    if (this.data.length !== 0) {
      this.data[0] = recentlyAdded;
      this.bubbleDown();
    }
    return result;
  }

  bubbleDown() {
    let parentIndex = 0;
    const parent = this.data[parentIndex];
    while (true) {
      let leftChildIndex = parentIndex * 2 + 1;
      let rightChildIndex = parentIndex * 2 + 2;
      let leftChild, rightChild;
      let swap = null;
      if (leftChildIndex < this.data.length) {
        leftChild = this.data[leftChildIndex];
        if (leftChild < parent) {
          //minHeap: child is bigger than parent
          swap = leftChildIndex;
        }
      }
      if (rightChildIndex < this.data.length) {
        rightChild = this.data[rightChildIndex];
        if (
          (swap === null && rightChild < parent) ||
          (swap !== null && rightChild < leftChild)
        ) {
          swap = rightChildIndex;
        }
      }
      if (swap === null) break;
      this.data[parentIndex] = this.data[swap];
      this.data[swap] = parent;
      parentIndex = swap;
    }
  }
  peek() {
    //O(1) time
    if (this.data.length === 0) {
      return null;
    }
    return this.data[0];
  }
}

/**
 * Your KthLargest object will be instantiated and called as such:
 * var obj = new KthLargest(k, nums)
 * var param_1 = obj.add(val)
 */

/* 
Time :
• Constructing the heap : O(n) * (O(log k)+ O(log k))-> O( n * log(k) ) time 
	◦ 'n' i s the length of the nums array
	◦ 'k' is the given k value
	◦ Build the heap iterating through the nums array: O(n) time
		‣ during each iteration call the add function on the current element.
			• This function calls the bubbleUp function which moves that element correct location in the heap: O( log k ) time
				◦ we use'k' because our min heap will never have more than nodes since we use the poll function after we bubble up to preserve the size
			• This function also calls the poll function which preserves the length of the heap to be k: O(log k) time
				◦ we use 'k' because after you remove the root and replace it with most recently added element, you then bubble down and that will take at most O(log( k + 1 )) -> O(log (k) ) comparisons 
• add function: O(m) * (O(log k) + O(log k) )-> O(m *log k) time
	◦ 'm' is the number of calls to the add method
	◦ we call the heap offer method which takes O(log k ) time
	◦ when the heap size exceed k we call the poll function and that takes O(log k) time

Space: O(k)
• k the given element named k
• when we construct the min heap in KthLargest object, its size is limited to  k. KthLargest's add method doesn't all the heap size to exceed k 
*/

/* 
Why are we using a min heap of size K instead of a max heap of size k?
• We only need min heap of size k because we only need the k largest values from the heap(array) 
	◦ We can remove the smallest number of the heap since it will never be the kth largest value
    ◦ By maintaining a min heap of size k, we are are always keeping the k largest values 
        - This is done by always removing the smallest values when the heap's size exceeds k  
*/

/* 
• KthLargest is an object that has
	◦ a k property
	◦ a heap property
	◦ adds each element in nums array to the heap
		‣ at each iteration we add one element of nums array to the heap by using the KthLargest method called add
• KthLargest' add method:
	◦ actually adds the element to the heap by using the heap's method called offer
		‣ I named it offer because  java has method called offer that also adds a value to a heap
	◦ return the kth largest value 
		‣ the kth largest value is root of the min heap of size k 
		‣ when the min heap length exceeds k we take out the smallest value, this ensures we have the kth largest value in the root
• MinHeap is a class that has:
	◦ data property that is set to an empty array
• MinHeap offer method:
	◦ adds to the minHeap while also preserving the order and structure(complete binary tree) property
		‣ adds the element to the data array
		‣ calls the bubbleUp method
• MinHeap bubbleUp method:
	◦ preserves the minHeaps order property
• MinHeap poll method:
	◦ I named it poll because  java has method called offer that also removes the root and bubbles down the recently added element from the root
	◦ Grabs most recently added element and removes it it then makes it root of the minHeap
		‣ if data array is empty then return null
		‣ Replace the root with the most recently added element if the data is not empty
			• helps maintain the min Heap to be of size k 
			• call the bubbleDown function
				◦ preserves order property  of min heap
• MinHeap bubbleDown method:
	◦ preserves minHeaps order property
• MinHeap peek property:
	◦ allows you see the smallest element in the min heap which is located at the root of the heap (index 0)
		‣ when the min heap length exceeds k we take out the smallest value, this ensures we have the kth largest value in the root
		‣ if data has a length of 0 return null
		‣ return this.data[0]
*/
