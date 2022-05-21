/* 
973. K Closest Points to Origin
https://leetcode.com/problems/k-closest-points-to-origin/
*/

/**
 * @param {number[][]} points
 * @param {number} k
 * @return {number[][]}
 */
class Node {
  constructor(point, distance) {
    this.point = point;
    this.distance = distance;
  }
}
class MaxHeap {
  constructor() {
    this.values = [];
  }
  enqueue(point, distance) {
    let newNode = new Node(point, distance);
    this.values.push(newNode);
    this.bubbleUp();
  }
  bubbleUp() {
    let childIndex = this.values.length - 1;
    const child = this.values[childIndex];
    while (childIndex > 0) {
      let parentIndex = Math.floor((childIndex - 1) / 2);
      let parent = this.values[parentIndex];
      if (child.distance <= parent.distance) break;
      this.values[childIndex] = parent;
      this.values[parentIndex] = child;
      childIndex = parentIndex;
    }
  }
  dequeue() {
    if (this.values.length === 0) return null;
    const max = this.peek();
    let recentlyRemoved = this.values.pop();
    if (this.values.length > 0) {
      //helps keep maxHeap empty if there are no elements in the maxHeap
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
        if (leftChild.distance > parent.distance) {
          swap = leftChildIndex;
        }
      }
      if (rightChildIndex < this.values.length) {
        rightChild = this.values[rightChildIndex];
        if (
          (swap === null && rightChild.distance > parent.distance) ||
          (swap !== null && rightChild.distance > leftChild.distance)
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

  peek() {
    return this.values[0];
  }
}
const distanceCalc = (x, y) => x ** 2 + y ** 2;

const kClosest = function (points, k) {
  const result = [];
  const maxHeap = new MaxHeap();
  for (let [x, y] of points) {
    let distance = distanceCalc(x, y);
    if (maxHeap.values.length < k) {
      maxHeap.enqueue([x, y], distance);
    } else if (distance < maxHeap.peek().distance) {
      //by keeping the size to be k we will get the
      //k points with the smallest to the origin
      //by the time the for loop terminates
      maxHeap.dequeue();
      maxHeap.enqueue([x, y], distance);
    }
  }

  for (let i = 0; i < k; i++) {
    result.push(maxHeap.dequeue().point);
  }

  return result;
};

/*
Time: O(log k) + O(k log k) --> O( log k)
• n is the length of the points array
• k is an integer given to us
• we iterate 'n' times and in each iteration we either :
	◦ enqueue(point, distance): O(log k) time
	◦ enqueue and dequeue: O(log k) time - > O(logk + logk) = O(log k) time
• we iterate 'k' times and for each iteration we
	◦ push the point property of the dequeued node
		‣ O(log k) time

Space:O(k)
• the maxHeap and the result array are both of length k
	◦ maxHeap will always contain at most k elements
*/

/* 
create result array
iterate through the points array
• calc the point's distance from the (0,0)
• if the maxHeap size is less than k 
	◦ add the point to the maxHeap 
		‣ maxHeap.enqueue(point, distance)
• else if the point's distance is less than top nodes's distance in the maxHeap . This means that the top node is farther form the origin than the point and so it must be removed
	◦ maxHeap.dequeue()
	◦ maxHeap.enqueue(point, distance)
iterate for 'k' times 
• result.push(maxHeap.dequeue().point)
return result
• You may return the answer in any order. The answer is guaranteed to be unique (except for the order that it is in).
*/
