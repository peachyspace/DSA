/* 
210. Course Schedule II
https://leetcode.com/problems/course-schedule-ii/
*/

/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {number[]}
 */
const findOrder = function (numCourses, prerequisites) {
  const adjList = {};
  for (let i = 0; i < numCourses; i++) {
    adjList[i] = [];
  }
  for (let [course, preR] of prerequisites) {
    adjList[course].push(preR);
  }

  const pathSet = new Set();
  const visitedSet = new Set();
  const output = [];

  const dfs = (course) => {
    if (pathSet.has(course)) return false;
    if (visitedSet.has(course)) return true;

    pathSet.add(course);
    for (let preR of adjList[course]) {
      if (dfs(preR) === false) return false;
    }
    pathSet.delete(course);
    visitedSet.add(course);
    output.push(course);
    return true;
  };

  for (let course = 0; course < numCourses; course++) {
    if (dfs(course) === false) return [];
  }
  return output;
};

/* 
Time: O(v + e)
• We visit every vertex and edge

Space: O(v+e)
• we create an adj. list of size v+e
• the call stack would have at most v frames 
• we create path set that at worst case holds v courses
• we create a visited set that at worst case can hold v courses
*/

/* 
create a an adj. list
create a pathSet 
• holds the prereqs. of that must be completed in order to take a certain course
create visitedSet 
• holds the courses that can be completed
create output array

dfs
a course has 3 possible states
• visiting -> course is not added to the output but is in the path (cycle)
	◦ return false
• visited -> course in the visitedSet return true
	◦ this course can be completed and thus it's not part of cycle
• unvisited -> course not added to output or cycle
	◦ add to pathSet
	◦ iterate through the courses edges
		‣ if dfs(course) === false return false
	◦ take course out of the setPath
	◦ add course to visitSet and add it to output array
	◦ return true

call dfs on every course because we want to get every vertex in the output.Note: a dfs search on a course might put all the courses in the output since there are some courses that are not in the path of this course
•  if dfs(course) === false return []

return output
*/
