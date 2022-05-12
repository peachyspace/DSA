/**
 * @param {number[]} prices
 * @return {number}
 */
const maxProfit = function (prices) {
  let left = 0; //buy
  let right = 1; //sell --> you can sell after you buy
  let maxProfit = 0;
  while (right < prices.length) {
    let buy = prices[left];
    let sell = prices[right];
    if (buy < sell) {
      let currProfit = sell - buy;
      if (currProfit > maxProfit) {
        maxProfit = currProfit;
      }
    } else {
      left = right; //keeps left to be pointing at the min
    }
    right++;
  }
  return maxProfit;
};
/*
Time: O(n)
- Iterated through the array once
Space: O(1)
- created two pointers
*/
/*
buy low
sell high
 1,2,3,4,5,6
[7,1,5,3,6,4] buy day 2($1) then sell day 5($6)
Output: 5
 1,2,3,4,5
[7,6,4,3,1] buy day 5 but cant sell 
Output: 0

 1,2,3,4,5,6
[7,1,5,3,0,9] buy day 5($0) then sell day 6($9)
Output: 9

right pointer increments by 1 during each iteration so we can calulate current profit
left pointer should always hold the min value so far

iterate through the array 
-if sell > buy then
    - when the currProfit > maxProfit, update maxProfit
- else update left to right,so left pointer can hold the min value so far
- increment right
*/
