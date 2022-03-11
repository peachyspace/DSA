/* 
AlgoExpert: Min Number of ways to make change
https://www.algoexpert.io/questions/Min%20Number%20Of%20Coins%20For%20Change
322. Coin Change
https://leetcode.com/problems/coin-change/
*/

function minNumberOfCoinsForChange(n, denoms) {
  let minCoinsNeeded = new Array(n + 1).fill(Infinity);
  minCoinsNeeded[0] = 0;
  for (let i = 0; i < denoms.length; i++) {
    let currentCoin = denoms[i];
    for (let amount = 0; amount < minCoinsNeeded.length; amount++) {
      if (currentCoin <= amount) {
        let leftOver = amount - currentCoin;
        let currentMinCoins = 1 + minCoinsNeeded[leftOver];
        minCoinsNeeded[amount] = Math.min(
          minCoinsNeeded[amount],
          currentMinCoins
        );
      }
    }
  }

  return minCoinsNeeded[n] !== Infinity ? minCoinsNeeded[n] : -1;
}
/* 
Time:( n * c )  'n' is the input target amount  'c' the size of the input array
• For each coin in the input array we iterate through the whole the array we created (minCoinsNeeded)
	◦ During all iterations through the array we created, we are just applying the formula that is a constant time operation 
		‣ We stored values in our minCoinsNeeded array and that allows us  to look up values in constant time

Space: O(n)   'n' is the input target amount 
• we created an array of size n + 1 and that is essentially size n
  */

/* 
  For each coin in the given input array, we will iterate through the whole array we created(minCoinsNeeded)

Create an array where each index($) represents an amount and it holds the minimum amount coins needed to create change for that amount
• Fill the array with the value Infinity because then any value will be less than infinity and thus allowing you to update the minCoinsNeeded values when we iterate through the array for the 1st time

Base Case: 
• Index $0 : The minimum amount of coins needed  to create $0 is 0

At each index we ask:
• Is the currentCoin less than or equal to index(amount)
	◦ When true we can use the currentCoin to create change for the index(amount)
	◦ What are the min amount coins needed in order to reach the index when we use the currentCoin(amount) :  index - currentCoin = leftOver
		‣ What is the minimum amount of coins needed to generate the leftOver?
			• minCoinsNeeded[ leftOver ] returns the answer
		‣ We add  1 + minCoinsNeeded[ leftOver ] in order to get the minimum amount of coins needed to generate the index(amount)
			• 1 represents the one coin in currentCoin
			• This addition always calculates the min. of coins needed to create change for an index(amount) since we know that minCoinsNeeded[ leftOver ] returns the min coins need to generated change for the leftOver amount 
				◦ By adding currentCoin to minCoinsNeeded[ leftOver ] we know that we have the min. coins needed to create change for the index(amount)
	◦ Check if  currentMinCoins < minCoinsNeeded[ index ]
		‣ If true then update minCoinsNeeded[ index ] to  currentMinCoins
			• This ensures that we always hold the min. coins that generate the index(amount)
• Return min Coins Needed to generate change for target 
	◦ if we were not able to create change for the target then minCoinsNeeded[target] will hold the value infinity since none of the coins in the input array could generate change for the target
		‣ [2,4] target=7    
		‣ minCoinsNeeded = [0, infinity, 1, infinity, 1, infinity, 2, infinity]
		‣ index(amount):    0      1     2      3     4      5     6      7    
	◦ minCoinsNeeded[target] = infinity then return -1
	◦ else return minCoinsNeeded[target] 
  */
