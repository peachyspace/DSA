/* 
286. Walls and Gates
https://leetcode.com/problems/walls-and-gates/
*/

/**
 * @param {number[][]} rooms
 * @return {void} Do not return anything, modify rooms in-place instead.
 */
const wallsAndGates = function (rooms) {
  const wall = -1;
  const gate = 0;
  const empty = 2147483647;
  const isOutOfBounds = (i, j) =>
    i < 0 ||
    j < 0 ||
    i > rooms.length - 1 ||
    j > rooms[0].length - 1 ||
    rooms[i][j] !== empty;

  const queue = [];

  for (let m = 0; m < rooms.length; m++) {
    for (let n = 0; n < rooms[0].length; n++) {
      if (rooms[m][n] === gate) queue.push([m, n]);
    }
  }
  const directions = [
    [-1, 0],
    [0, -1],
    [1, 0],
    [0, 1],
  ];

  let level = 0;
  while (queue.length) {
    //take out all the rooms that are on the same level
    const size = queue.length;
    for (let i = 0; i < size; i++) {
      let [m, n] = queue.shift();
      for (let [moveM, moveN] of directions) {
        let [newM, newN] = [m + moveM, n + moveN];
        if (isOutOfBounds(newM, newN)) continue;
        rooms[newM][newN] = level + 1;
        queue.push([newM, newN]);
      }
    }
    //you removed all the rooms from the same and now you can move to the next level and so increment level
    level++;
  }
};

/* 
Time: O(m*n)
• We iterated through the whole grid 
	◦ we didn't redo bfs traversals since we don't add a room to the queue multiple times. 
	◦ If we had more than one gate we would still iterate for the size of the gird since once we set the rooms distance we essentially marked it as visited

Space: O(m*n)
• at worst case the grid is filled with only gates and thus the queue will be filled with m*n gates
*/

/* 

We can iterate through the grid and look for a gate and from there call bfs
• calling bfs would mean that empty cells will be overwritten only ONCE since BFS guarantees that we search all the rooms of distance 'd' before searching rooms of distance "d" + 1. This means that we we are doing a level by level traversal and at each level we are guaranteeing that the empty rooms hold the shortest distance to a gate. Time Complexity: O(m*n) Every time we fill an empty room with it's shortest distance from the gate, because we don't push it on to the queue again. The next time we encounter this filled room the distance will be longer than the 1st time we encountered it
	◦ At the  0th level of the queue we have the two gates
	◦ At the 1st level of queue we have the rooms that surround gate1 or gate 2 which all have a distance of 1
		‣ fill those rooms with 1, if however the neighbor room is NOT empty then don't push it to the queue
	◦ At the 2nd level of queue we have the rooms that surround gate1 or gate 2 which all have a distance of 2
		‣ fill those rooms with 2, if however the neighbor room is NOT empty then don't push it to the queue
	◦ At the 3rd level of queue we have the rooms that surround gate1 or gate 2 which all have a distance of 3
		‣ fill those rooms with 3, if however the neighbor room is NOT empty then don't push it to the queue
*/
