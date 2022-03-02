/* 
1710. Maximum Units on a Truck
https://leetcode.com/problems/maximum-units-on-a-truck/
*/

/**
 * @param {number[][]} boxTypes
 * @param {number} truckSize
 * @return {number}
 */
const maximumUnits = function (boxTypes, truckSize) {
  //Sort number of units in descending order in order to get the max
  boxTypes.sort((a, b) => b[1] - a[1]);
  let max = 0;
  for (let i = 0; i < boxTypes.length; i++) {
    let currentNumOfBoxes = boxTypes[i][0];
    let currentUnits = boxTypes[i][1];
    if (currentNumOfBoxes <= truckSize) {
      max = max + currentNumOfBoxes * currentUnits;
      truckSize = truckSize - currentNumOfBoxes;
    } else {
      max = max + truckSize * currentUnits;
      return max;
    }
  }
  return max;
};

/*
Time:  O(n log(n)) + O(n) -> O(n log(n))
• The array sort method uses quick sort, which on average takes O(n log(n)) time
	◦ O(n^2) time at worst
• Iterating through the whole array takes O(n)
Space: O(log(n))
• The array sort method takes up O(log(n)) space
*/
//[[1,3],[2,2],[3,1]]
// 1 <= 4
// 2 <= 3
// 3 <= 1
//decrement 3 until it reaches 1

//type0-> 1 box: 3 units/items in each box
//type1-> 2 boxes: 2 units/items in each box
//type3-> 3 boxes: 1 unit/items in each box
//truck = 0
//truck + type0
//truck + (1*3) ->  0 + 3 =3
//truck = 3
//truck + type1
//truck + (2*2) -> 3 + 4 = 7
//truck = 7
//truck + type2
//truck + (1*1) -> 7 + 1 = 8
/*
You are asked to find the max amount of units that you can fit in the  truck of a certain size
Each box takes up the same amount of space but the only thing that distinguishes them is the amount of items inside of them 
• We can have 12 boxes that all carry one item
• We can have one box with 30 items
• The truck can have a max of 10 boxes
	◦ if we put 10 of the 12 boxes that have one item then the truck the the  total amount of items in the truck is 12.
	◦ However if we put  1 box that has 30 items and 9 boxes of the 12 that all carry one item. Then the total amount of items in the truck is 39.
	◦ From this we can see that its better to sort the subarrays by the amount of items in the boxes in a descending(high to low) order if we want to maximize the total amount of boxes in the truck
*/
/*
Sort the array by the amount of units in a descending order  (high to low) in order to get the max amount of units that we can fit in a truck of a certain size.
• boxTypes.sort((a, b) =>  b[1] -a[1])

Create a variable called max

iterate for the length of the array
• if the current amount of boxes  is less than or equal to the truck size
	◦ update max
		‣ max + (currentNumOfBoxes * currentUnits)
	◦ update truckSize
		‣ truckSize - currentNumOfBoxes
• else the current amount of boxes is greater than truck size
	◦ update max
		‣ max = max + (truckSize * currentUnits)
	◦ return max
Return max
*/
