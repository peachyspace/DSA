/* 
994. Rotting Oranges
https://leetcode.com/problems/rotting-oranges/
*/

//using an array
const orangesRotting = function (grid) {
  let time = 0;
  let freshOranges = 0;
  const queue = [];
  for (let m = 0; m < grid.length; m++) {
    for (let n = 0; n < grid[0].length; n++) {
      if (grid[m][n] === 1) {
        freshOranges++;
      } else if (grid[m][n] === 2) {
        queue.push([m, n, 0]);
      }
    }
  }

  const directions = [
    [-1, 0],
    [0, -1],
    [1, 0],
    [0, 1],
  ];

  while (queue.length && freshOranges) {
    const [m, n, mins] = queue.shift();

    if (grid[m][n] === 1) {
      grid[m][n] = 2;
      freshOranges--;
      time = mins;
    }
    //infect the neighbors of the rotten orange
    for (let [row, col] of directions) {
      const [newM, newN] = [m + row, n + col];
      //checking the the neighbor coordinate is valid
      if (
        newM < 0 ||
        newN < 0 ||
        newM > grid.length - 1 ||
        newN > grid[0].length - 1
      )
        continue;

      //make sure that neighbor is a fresh orange
      //since we dont wan to infect empty cells and rotten oranges
      if (grid[newM][newN] === 1) {
        queue.push([newM, newN, mins + 1]);
      }
    }
  }
  return freshOranges ? -1 : time;
};

/* 
Time: O((m*n)^2) + O(m*n)--> O((m*n)^2)
• given a gird of m*n length
• we iterate through every cell in the gird: O(m*n)
• The bfs traversal we traverse all the cells once: O((m*n) *(m*n))-> O((m*m)^2)
	◦ we do use the shift method most of the time traverse the cells and that is an O(n) operation. If we used a linked list in order to implement the queue then this operation would be O(1)

Space: O(m*n)
• BFS: the in the worst case the grid is filled with only rotten oranges, which means that the queue will be initialized with a length of m*n
	◦ typically the main space complexity lies in the bfs traversal not the initialization of the queue
*/

/* 
Don't use DFS
• DFS prioritizes going deep
• Using DFS would mean that we would contaminate other fresh oranges that are farther away from a rotting orange before we contaminate ALL of the rotting orange's neighbors 

Use BFS
• goes wide before it goes deeper
• the rotting oranges will contaminate their neighbors first, before the contamination hits other fresh oranges that are farther away
*/

/* 
create queue (use array or linked list)
Time is set to 0
We want to mimic the contamination of rotten orange and BFS traversal  allows us to do that. The Nested for loop adds ALL rotting oranges to the queue before we do a BFS traversal. There can be more than 1 rotting orange and so we can have multiple rotting oranges  that are simultaneously infecting fresh oranges
• when you see a fresh orange increment the freshOranges count
• when you see a rotten orange add it to the queue -> [r, .c 0]

direction array will help us check neighbors during BFS traversal  by storing coordinates. Adding these coordinates to the current coordinate will get us the top, left, bottom, and right neighbor
•  [[0,-1], [-1,0],[0,1], [1,0]]

Execute BFS while the queue is not empty AND there are still fresh oranges in the grid. If the queue is not empty and the number of freshOranges is 0 then we don't have to do BFS traversal anymore because we want to know how many min does it take to infect all the fresh oranges
• take a orange from the front of the queue - at one point the queue will also have fresh oranges to infect
• if the orange taken out is fresh then infect it 
	◦  assigning to 2
	◦ decrement the amount of freshOranges
	◦ assign time(levels) to min - we care about the last level we traverse through
• We want to add the current rotten orange's neighbors to the back of the queue in order to infect them
	◦ iterate through the direction array and 
		‣ During each iteration we create the coordinate of the rotten oranges neighbors. 
		‣ Make sure that the coordinate is within the grid 
		‣ Push the orange onto the queue if the orange is a freshOrange
			• [newM, newN, mins+1] this neighbor will be infected in the next level(min) and so we must increment mins by one in order to reflect that
if there are still freshOranges then return -1 else return time
*/

//Optimize time complexity by using a linked list

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}
class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }
  enqueue(value) {
    let newNode = new Node(value);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.length++;
  }
  dequeue() {
    if (!this.head) return;
    let removed = this.head;
    this.head = this.head.next;
    this.length--;
    if (this.length === 0) {
      this.head = null;
      //this.tail = null
    }
    return removed;
  }
}

const orangesRotting2 = function (grid) {
  let time = 0;
  let freshOranges = 0;
  const queue = new LinkedList();
  for (let m = 0; m < grid.length; m++) {
    for (let n = 0; n < grid[0].length; n++) {
      if (grid[m][n] === 1) {
        freshOranges++;
      } else if (grid[m][n] === 2) {
        queue.enqueue([m, n, 0]);
      }
    }
  }

  const directions = [
    [-1, 0],
    [0, -1],
    [1, 0],
    [0, 1],
  ];

  while (queue.length && freshOranges) {
    const [m, n, mins] = queue.dequeue().val;

    if (grid[m][n] === 1) {
      grid[m][n] = 2;
      freshOranges--;
      time = mins;
    }
    //infect the neighbors of the rotten orange
    for (let [row, col] of directions) {
      const [newM, newN] = [m + row, n + col];
      //checking the the neighbor coordinate is valid
      if (
        newM < 0 ||
        newN < 0 ||
        newM > grid.length - 1 ||
        newN > grid[0].length - 1
      )
        continue;

      //make sure that neighbor is a fresh orange
      //since we dont wan to infect empty cells and rotten oranges
      if (grid[newM][newN] === 1) {
        queue.enqueue([newM, newN, mins + 1]);
      }
    }
  }
  return freshOranges ? -1 : time;
};

/* 
Time: O(m*n) + O(m*n) = O(2(m*n)) -> O(m*n)
• given a gird of size m*n 
• we iterate through every cell in the gird 
• The bfs traversal we traverse all the cells once: O(m*n)
	◦ Since we used a linked list in order to implement the queue then this operation would be O(1) because dequeuing from the front and enqueuing to the back are both O(1) operations
Space: O(m*n)
• BFS: the in the worst case the grid is filled with only rotten oranges, which means that the queue will be initialized with a length of m*n
	◦ typically the main space complexity lies in the bfs traversal not the initialization of the queue
*/
