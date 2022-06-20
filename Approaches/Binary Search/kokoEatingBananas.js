/* 
875. Koko Eating Bananas
https://leetcode.com/problems/koko-eating-bananas/
*/

/**
 * @param {number[]} piles
 * @param {number} h
 * @return {number}
 */
const minEatingSpeed = function (piles, h) {
  let left = 0;
  let right = 0;
  for (let bananas of piles) {
    right = Math.max(right, bananas);
  }

  let minRate = right;

  while (left <= right) {
    let currentRate = Math.floor((left + right) / 2);
    let currentHours = 0;
    for (bananas of piles) {
      currentHours += Math.ceil(bananas / currentRate);
    }
    if (currentHours <= h) {
      minRate = Math.min(minRate, currentRate);
      //we want to see how low can we bring the currentRate
      //down in order to find the minRate
      right = currentRate - 1;
    } else {
      //Right now currentHours > piles.length
      //we want to get the currentHours to be at most
      //the length of piles in order to do that
      //we must increase the currentRate by moving left pointer
      left = currentRate + 1;
    }
  }
  return minRate;
};

/*
 Time: O(log(max(p)) * p)
 • p represents the amount of elements in the piles array
 • the max element in the piles array will tell us the length of the range we do the binary search on. [1.....maxPileOfBananas]
 • During each iteration of our binary search we iterate through the piles array
 
 Space: O(1)
 • we use pointer that take up constant space 
     ◦ the range we are iterating through is created by the pointers
         ‣ no additional arrays are need
 */

/* 
Koko can only eat one pile per hour
if we have 5 piles and we only have 2 hours then we can't eat all the piles within 2 hours
• we are guaranteed that the pile.length <= hours

We need to calculate the min number of bananas Koko can eat per hour in order to eat the bananas within h hours or less

in the best case the min number of bananas that can be eaten per hour is 1 
• 0 would mean that no bananas are eaten

in the worst case the min number of bananas eaten per hour is the max number in the piles array
• this ensures that Koko will eat all the piles in piles.length hours
• 3,6,7,11 -> min: 11 hence it will take 4 hours(piles.hours.length) in order to finish eating all the piles 

k = number of bananas eaten per hour
1 <= k  <= maxPileOfBananas  ->  [1.....maxPileOfBananas]

Instead of  doing a linear search from 1 to maxPileOfBananas 
We can instead do a binary search from 1 to maxPileOfBananas
*/

/* 
min = max(piles)  because the max pile will allow us to eat every pile in the piles array
Do binary search ( left <= right)
• iterate through piles at the current rate (range[mid]), how much time will take for Koko to   eat all the piles 
	◦ currentHours +=( currentPile / currentRate )
• check if currentHours <=  h
	◦ minHours = min(min, currentHours)
	◦ right = mid - 1
	◦ lets find a smaller current rate
•  currentHours > h
	◦ left = mid + 1
	◦ We want to eat the piles in less than or equal to h hours and so in order to minimize the current rate we must increase the amount of bananas eaten in an hour
		‣ we can't minimize the amount of hours because Koko van only eat one pile every hour
• when the left > right pointer we now have the min amount of bananas Koko can eat within h hours
*/
