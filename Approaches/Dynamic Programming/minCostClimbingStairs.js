/* 
746. Min Cost Climbing Stairs
https://leetcode.com/problems/min-cost-climbing-stairs/
*/

const minCostClimbingStairs = function (cost) {
  cost.push(0);
  for (let i = cost.length - 3; i >= 0; i--) {
    cost[i] = Math.min(cost[i] + cost[i + 1], cost[i] + cost[i + 2]);
  }
  return Math.min(cost[0], cost[1]);
};

/* 
Time:O(n) 
• Looking up the min cost to reach index n, tales O(1) time
• We look up for each element in the cost array, takes O(n) time

Space: O(1) 
• We store the min cost of jumps of each index in the  cost array, so we are not taking up any additional space
*/

/* 
Steps:
• push the value 0 to the cost array
	◦ we did this so our array can have a top step
	◦ this also helps avoid errors
• Do the following because we are guaranteed to have a cost array with two elements
• do a reverse iteration through the cost array starting at the third to last index
	◦ update the value of the current index  by adding the min of the value between  currentIndex+1 or currentIndex + 2 
• return the min between the values at index 0 or 1

 start at the 3rd to last index because the min cost to get to the top stair will always be the original value at the 2nd to last index. ex:
• [10, 15, 20, 0]
•  0     1    2   3  index
•  1     2    3   4  length
• 1 jump cost: $20 + cost at index 3($0: at top of the stairs)
• 2 jumps cost: out of bounds(past the top of the stairs)
• min cost of jumps: $20
*/
