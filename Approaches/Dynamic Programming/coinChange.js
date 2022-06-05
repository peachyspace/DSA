/* 
322. Coin Change
https://leetcode.com/problems/coin-change/
*/

/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
const coinChange = function (coins, amount) {
  const minCoins = Array(amount + 1).fill(Infinity);
  minCoins[0] = 0;
  for (let coin of coins) {
    for (let i = coin; i < minCoins.length; i++) {
      //1 represents the current coin
      //we add the 1 bc we used the current coin
      //i - coin = remaining amt
      //minCoins[remaining amt] + 1
      minCoins[i] = Math.min(minCoins[i], minCoins[i - coin] + 1);
    }
  }
  return minCoins[amount] !== Infinity ? minCoins[amount] : -1;
};

/* 
Time: O(n * a) time
• Iterated through the coins array: O(n)
• For every coin the coins array we iterate through the whole minCoins array whose height is dictated by the amount +1: O(a)
Space: O(a) space
• created an array of length a
*/

/* 
create an array named minCoins of length amount + 1 
fill array with Infinity
minCoins[0] represents that there are 0 ways to create $0
iterate through the coins array
iterate the minCoins array -- here we fill up the minCoins array with the ways we can create a value(index) with the current coin and the coins included in the minCoins array so far
    - 1 represents the currentCoin
    - remainingNum = index - currentCoin
    - min = Math.min(minCoins[i], minCoins[ i - coin] + 1 )

return minCoins[amount]
*/
/*
https://leetcode.com/problems/coin-change/discuss/1132171/JavaScript-Solution-with-Explanation
*/
