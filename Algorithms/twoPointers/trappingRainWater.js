/* 
42. Trapping Rain Water
https://leetcode.com/problems/trapping-rain-water/
*/
const trap = (height) => {
  if (height.length === 0) return 0;
  let maxL = height[0];
  let maxR = height[height.length - 1];
  let left = 0;
  let right = height.length - 1;
  let amtTrapped = 0;
  //the ends can’t hold water

  while (left < right) {
    //once the left === right there wont be any
    //changes to amtTrapped
    //the maxL or maxR will equal the height[l] or height[r]
    //respectively meaning that its subtraction will equal 0
    //maxL- height[l] = 0 OR maxR - height[r] = 0
    if (maxL < maxR) {
      left++;
      maxL = Math.max(maxL, height[left]);
      if (maxL - height[left] > 0) {
        amtTrapped += maxL - height[left];
      }
    } else {
      right--;
      maxR = Math.max(maxR, height[right]);
      if (maxR - height[right] > 0) {
        amtTrapped += maxR - height[right];
      }
    }
  }
  return amtTrapped;
};

/*
time: O(n)
- We iterate theough the array once

Space: O(1())
- created two pointers that dont take up more memory as the input grows
*/

/*
Calc water trapped at h[i] = min(maxL, maxR) - h[i]
• maxLis the highest value on the leftside of h[i] 
• maxR is the highest value from the right side of h[i]
• maxL and maxR will tell us where the water could potentially be trapped
• The min from (maxL, maxR) is needed because the water must be contained and if we use the min value then the water wont spill out from this container(Note: not  from positon h[i])
• Min value - h[i] because this will tell us if the water will be trapped or spill at position h[i]
We would have to create a table 
• 1st row has cells that hold the maxL value from position i 
• 2nd row has cells that hold the maxR value from position i
• 3rd row has cells that holds the min(maxL, maxR)
In order to get the solution we would do min(maxl, maxR) at position i - h[i] 


Creating the table is not needed and makes the algorithm very slow. We can optimize this algorithm by using pointers instead of a table and keeping track of the maxL so far and the maxR so far.
• We can take advantage of this because we dont need to know both the  maxL and maxR but instead, we only need to know the one that corresponds to  the smaller pointer

Left pointer has the smallest value:  
• We dont need the maxR height because we are interested in the minimum from ( maxL , maxR). No matter how big the maxR might get in the future, the current maxL will still be smaller
	◦ maxR will ONLY update if there is a height that is bigger than itself, hence its value will never be smaller than its current value
Right pointer has the smallest value:  vice versa ^

Left pointer === Right pointer
• Doesn't matter which one we move
• Either one we move will lead us to the same answer

We move the pointer whose max value is smaller because we want to maximize the max height. We maximize bc there could potentially be higher heights that could potentially trap water
• maxL and left pointer
• maxR and right pointer


*/
