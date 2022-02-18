/* 
15. 3Sum
https://leetcode.com/problems/3sum/
*/
var threeSum = function (nums) {
  //sort method mutates the array
  nums.sort((a, b) => a - b); //(O(n log(n)) time)
  let target = 0;
  let tripletArr = [];
  for (let i = 0; i < nums.length; i++) {
    let currNum = nums[i];
    if (currNum === nums[i - 1]) {
      //skipping duplicates
      continue;
    }
    let left = i + 1;
    let right = nums.length - 1;
    while (left < right) {
      let currSum = currNum + nums[left] + nums[right];
      if (currSum > target) {
        right--;
      } else if (currSum < target) {
        left++;
      } else {
        tripletArr.push([currNum, nums[left], nums[right]]);
        left++;
        right--;
        while (nums[left] === nums[left - 1] && left < right) {
          left++;
        }
        while (nums[right] === nums[right + 1] && left < right) {
          right++;
        }
      }
    }
  }
  return tripletArr;
};
/**
Time and space complexity:›
Time: O(n log(n)) + O(n ^2) = O(n^2)
	*Sorting the array on average will take O(n log (n))
	* One for loop to grab "a"  (O(n))
		•Visit every element in the array in the worst case 
	*While loop  grabs "b" and "c" (O(n))
		•Visiting every element in the array in the worst 		 case
		•The while loop runs for each of the for loops iteration(n times) 
Space: O(log(n))
	* Sorting does take extra memory in JavaScript
 */

//array not sorted
//target = 0
//three nummbers that have different indices
//return number not indices
//answer can have multiple triplets
//cant have the same set of triple indices [ [-1,0,1], [-1,0,1] ]
//_______________________________________________________________________
//Logic
//first sort the array
//for loop iterates through every number('a') in array
//check that 'a' is not a duplicate before you enter while loop
//if true then use 'continue' to move on to the next number in the array
//  while loop runs while left < right and grabs'b' and 'c'by using pointers
//      *calc. sum of 'a'+'b'+'c'
//      *if sum > target then decrement right
//      *if sum < target then increment left
//      *if sum === target then move both pointers
//          - add ['a','b','c'] to tripletArr
//          - move both in order to aviod duplicates
//          -while loop runs while 'L'is a duplicate of the last pointer.(This helps prevent dupes)
//              •increment left
//          -while loop runs while 'R' is a duplicate of last pointer. (This helps prevent dupes )
//              •decrement right
//return triplet Arr
//_______________________________________________________________________
//[-1,0,1,2,-1,-4]
////[-4,-1,-1,0,1,2] O(nlog(n))
//       *  ^     ^  -1 + -1 + 2 = 0
//                 Add [-1,-1,2]
// if sum found then move both pointers
//       *    ^ ^  -1 + 0 + 1 = 0
//                 Add [-1,0,1]
//          *  ^  ^ -1 + 0 + 2 = 1
//     Sum greater than target. Then decrease right
//          *  ^ ^  -1 + 0 + 1 = 0
//[[-1,-1,2],[-1,0,1]]
///________________________________________________________
////[-4,-1,-1,-1,0,1,2,2] O(nlog(n))
//       *  ^          ^  -1 + -1 + 2 = 0
//                         Add [-1,-1,2]
// if sum found then move both pointers
//moved left and right are duplicates of the last left and right
//left and right while loop will run until above statment is not true
//       *       ^ ^       0 + 1 + 1 = 2
//cant move pointers anymore and so for loop moves on to the next iteration
//skip the next couple of iterations in order to avoid duplicates
//               * ^ ^     0 + 1 + 2 = 3
//..................
