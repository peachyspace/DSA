/* 
118. Pascal's Triangle
https://leetcode.com/problems/pascals-triangle/
*/

const generate = function (numRows) {
  let result = [[1]]; //1st level always has one subarray that holds #1

  for (let i = 1; i < numRows; i++) {
    //one level was already created
    let lastRow = result.length - 1;
    let temp = result[lastRow].slice(); //get copy of prev row
    temp.unshift(0); //first element is added to 0
    temp.push(0); //last element is added to 0
    let row = [];

    for (let j = 0; j < result[lastRow].length + 1; j++) {
      //row= prev+1
      row.push(temp[j] + temp[j + 1]); //temp has 2 more elements than prev
    }

    result.push(row);
  }
  return result;
};
/*
Time: O(n^2) 
• we iterate through each of  the array's subarray's  once: O(n) time
	◦ Each subarray (m is length of subarray)can be at most n items 
		‣ hence m===n at worst case
		‣ Total time complexity O(n^2) (total amount of time we iterate through the array)
Space: O(n^2)
• We are creating an array of length n and each element is at most has a length of n
*/

/*
[
[1],        When we are at the 1st row we create the 2nd row
[1,1],         0+1,  1+0
[1,2,1],       0+1, 1+1, 1+0
[1,3,3,1],     0+1, 1+2, 2+1, 1+0
[1,4,6,4,1]    0+1, 1+3, 3+3, 3+1, 1+0
]
*/

/*
[              Created in outer loop
[1],           [0,1,0]
[1,1],         [0,1,1,0]
[1,2,1],       [0,1,2,1,0]
[1,3,3,1],     [0,1,3,3,1,0]
[1,4,6,4,1]   
]
*/

/*
If you assign an array to another variable and modify the second variable's array elements, the original array is also modified
Create an array that has one subarray 
• res = [ [ 1 ] ]
	◦ The first row always has one subarray that holds the number one
W are going to iterate from the 1 to the numOfRows since already created the 1st row
• We are going to create a temporary array that has the old row and add's a 0 to the beginning and end of  it
		‣ we are not modifying the result array
• Initialize the row variable that  will be the next row in the triangle
• Inner loop is going to create the next row in the triangle and it's length will be the length of the previous subarray  +1 not TEMP
	◦ push the sum of  temp[j] and temp[j+1] to row array
• Once the for loop terminates we will push the row to result

Return the result
*/
