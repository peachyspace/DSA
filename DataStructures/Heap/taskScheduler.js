/* 
621. Task Scheduler
https://leetcode.com/problems/task-scheduler/
*/

/**
 * @param {character[]} tasks
 * @param {number} n
 * @return {number}
 */
class MaxHeap {
  constructor() {
    this.values = [];
  }
  enqueue(element) {
    this.values.push(element);
    this.bubbleUp();
  }
  bubbleUp() {
    let childIndex = this.values.length - 1;
    //When we bubble up the value of the child will always be
    //the value of the newly added element in the enqueue function
    const child = this.values[this.values.length - 1];
    while (childIndex > 0) {
      //if childIdx is 0 then we that it doesn't have a parentIdx
      let parentIndex = Math.floor((childIndex - 1) / 2);
      let parent = this.values[parentIndex];
      if (child <= parent) break; //Heap now follows order prop.
      this.values[parentIndex] = child;
      this.values[childIndex] = parent;
      childIndex = parentIndex; //update childIndex
    }
  }
  dequeue() {
    let maxValue = this.values[0];
    let removed = this.values.pop();
    if (this.values.length > 0) {
      //edge case: after pop array is empty
      this.values[0] = removed; //new root node
      this.bubbleDown();
    }
    return maxValue;
  }

  bubbleDown() {
    let parentIndex = 0;
    //when we bubble down value of the parent is the value of the
    //node that was placed at the root in the dequeue function
    const parent = this.values[0];
    //let length = this.values.length
    while (true) {
      let leftChildIndex = 2 * parentIndex + 1; //Can be out of bounds
      let rightChildIndex = 2 * parentIndex + 2; //Can be out of bounds
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
const leastInterval = function (tasks, n) {
  const taskToCount = new Map();
  const maxHeap = new MaxHeap();
  //set up freq table
  for (let char of tasks) {
    //O(n)
    taskToCount.set(
      char,
      taskToCount.has(char) ? taskToCount.get(char) + 1 : 1
    );
  }

  //add counts to maxHeap
  for (let key of taskToCount.keys()) {
    //O(k), keys in map
    maxHeap.enqueue(taskToCount.get(key));
  }
  const coolDown = new Map();
  let currTime = 0;
  //use OR because there might be a case where either
  //maxHeap or cooldown will be empty and we want to
  //continue incrementing currTime
  while (maxHeap.values.length > 0 || coolDown.size > 0) {
    // subtract by 1 bc we include the expired task along wih n tasks
    // n minutes + 1 minute = time when cool down period of a task ends
    // time when cool down period of a task ends - n - 1 = time task was processed
    if (coolDown.has(currTime - n - 1)) {
      maxHeap.enqueue(coolDown.get(currTime - n - 1));
      coolDown.delete(currTime - n - 1);
    }
    if (maxHeap.values.length > 0) {
      let amtLeft = maxHeap.dequeue() - 1;
      if (amtLeft > 0) {
        coolDown.set(currTime, amtLeft);
      }
    }
    currTime++;
  }
  return currTime;
};

/*
Time: O(n * m)
- n is the length of tasks array
- m is the idle time
- in the worst case we could have a task array only filled with type of task
     - each task would have cool down time of n
     - [A,A,A] n=2, each'A' needs 2 min to cool down
        - A,_, _, A, _, _, A  3*2 approx.= 6
        
Space: O(1)
- The heap would have at most 26 elements
- the hashmap would have at most 26 elements
*/

/*
Return the least number of units of times that the CPU will take to finish all the given tasks
• By processing the most repeated task 1st we are 
  reducing the amt of time we take to complete the tasks
  beacuse it wil decrease the amount of idle(_) time used
     - aaaccbb  n = 2, a is the most repeated task
     - cabcab_a  length =8
     - acbacba  length= 7
•  use a max heap in order to process the most repeated task 
- set up freq table using a map
- add counts to maxHeap 
- iterate whlie maxHeap or haspmap are not empty, meaning that if only one is empty then will still iterate
- if tasks cool down period has expired then place task in the maxHeap and wait for it to be processed
    - dont need task name just amt left since coolDown has the time when task was processed and amt left, we know when we place it in the maxHeap its ready to be processed
- remove a task from heap and if task's amt left > 0 then insert it to coolDown hashmap
- increment currTime

*/
