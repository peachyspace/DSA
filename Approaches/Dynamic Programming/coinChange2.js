/* 
AlgoExpert: Number of ways to make change
https://www.algoexpert.io/questions/Number%20Of%20Ways%20To%20Make%20Change

518. Coin Change 2
https://leetcode.com/problems/coin-change-2/
*/

function numberOfWaysToMakeChange(n, denoms) {
  // Write your code here.
  let ways = new Array(n + 1).fill(0); // n+1 because we are including n
  ways[0] = 1; //there is only 1 way to make $0 and that is to give no change
  for (let i = 0; i < denoms.length; i++) {
    let currentCoin = denoms[i];
    for (let amount = 1; amount < ways.length; amount++) {
      if (currentCoin <= amount) {
        ways[amount] = ways[amount] + ways[amount - currentCoin];
      }
    }
  }
  return ways[n];
}

/* 
Time: O(n * c) 'n': array created, 'c':length of input array
• We iterate through each of the coins in the coins array(input) and for each of them, we iterated through OUR array of length n + 1
	◦ During each iteration through OUR array, we are applying the formula 
		‣ the formula is executed in constant time

Space: O(n) 
• We create an array of size n+1, essentially size n
• n is the length of the input array
*/

/* 
DP with Tabulation(bottom up approach)

Infinite amount of coins

Each of the indices represents a specific amount of money and it goes up to our target amount
Each value represents the minimum amount of ways we  have to make change using the denominations(coins given) to make change for the amount that is represented by the index
Base Case:
• index $0 : 1 way to make change 
	◦ The only way to make change for $0 is by using  no coins
At each index we ask:
• is the current coin <= the current index
	◦ Ex: can we use a $1 coin to make $0 -> No -> SKIP
	◦ Ex: can we use a $1coin to make $1 -> Yes ->
		‣ ways[1] += ways[1 - currentCoin]
			• ways[currentIdx] = ways[currentIdx] + ways[currentIdx- currentCoin]
				◦ this addition will always add up to the total unique ways to get to the target($) using the coins we have iterated through so far in the input array 
			• ways[1] =ways[1] + ways[1-1]
As we update the value of each index in the ways array, we are creating an array that holds the number of ways we can create change with the current coin (current element in the input array) for each dollar(index) leading up to the target amount. Repeat this for EVERY element in the input array.

Note: If we are given a $1 coin for any amount, all that we can do is use whatever that amount is times $1 coin.
• $2 : $2 * $1 = $2
• $8 : $8 * $1 = $8
_____________________________________________________________
Why ways[ i ] = ways[ i ] + ways[ i - currentCoin ]  addition will always add up to the total unique ways to get to the target($) using the coins we have iterated through so far in the input array 
input:  [1,5,10,25]   currentCoin = $5
ways:  [1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 1]
                       _              _
index:  0  1  2  3  4  5  6  7  8  9  10

if currentCoin <= amount:
ways[amount]  +=  ways[ amount- currentCoin ]
    ways[10] +=  ways[10 - 5]
    ways[10]  = ways[10] + ways[ 10 - 5 ]
    ways[10]  = ways[10] + ways[ 5 ]
    ways[10]  =    1     +      2
    ways[10]  =          3
  
In the case where $10 is the index and $5 coin is the currentCoin
• 1 way ($5 coin):  5 - 5
	◦ since 2 ways already includes 1111111111 we can use $5 coin and have  5 - 5 for one way
• 2 ways ($1coin &  $5 coin): 1111111111, 11111 - 5
• 3 ways($1coin & $5coin): 1111111111, 11111 - 5 ,  5  - 5

Note at this point we have iterated through $1 and $5 so far,  and so by only visiting these two coins we could create change for $10 in 3 ways.  We still have to iterate through the rest of the input array in order to get the actual answer which is 4

*/
