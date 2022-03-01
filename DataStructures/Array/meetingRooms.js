/* 
252. Meeting Rooms
https://leetcode.com/problems/meeting-rooms/
*/

/**
 * param {number[][]} intervals
 * return {boolean}
 */
 const canAttendMeetings = function(intervals) {
    intervals.sort((a[0], b[0]) => a[0] - b[0] )
    for(let i=1; i< intervals.length; i++){
        let end = intervals[i-1][1]
        let start = intervals[i][0]
        if(start < end){
            return false
        }
    }
    return true
}

/*
Time: O(n * log(n)) + O(n) --> O(n * log(n))
• sorting the array takes O(n * log(n))
	◦ V8 engine uses quick sort for long arrays and since we are focusing on worst case  we use quickSort
	◦ quickSort on average takes O(n * log(n)) time but takes O(n^2) time at the worst case
• iterating through the array take O(n) time

Space: O(log(n))
• the array sort method takes O(log(n)) space
*/
//can attend meeting?

//sort  sub arrays by start time
//[0,30],[5,10],[15,20]
//   e    s
//5,10 can fit inside 0,30
//start < end  no -> return false

//sort the array
//[7,10],[2,4]
//[2,4], [7,10]
//   e    s
//start > end  yes

//if empty return true
//sort the subarrays
//iterate over the arrays
// if start < end then return false
//once out of loop  return true
/*
sort the subarrays by their star times, so we can iterate once through the sub array while we compre array[ i ][0] to array[i - 1][1]
• intervals.sort((subA, subB) => subA[0] - subB[0])
• same as intervals.sort((a, b) => a[0] - b[0])
	◦ array's sort method mutates the array so there is no need to use a variable
iterate through the times but initiate i to 1 so we can have access to the previous time subArray
• get the previous times end time
• get the current time's start time
• if start < end then return false
	◦ a meeting cannot occur if the previous meeting is still in session
return true since all the times in the interval don't overlap
*/