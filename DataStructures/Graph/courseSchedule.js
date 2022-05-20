/* 
207. Course Schedule
https://leetcode.com/problems/course-schedule/
*/
/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
const canFinish = function (numCourses, prerequisites) {
  const adjList = {};
  for (let n = 0; n < numCourses; n++) {
    //vertices
    adjList[n] = [];
  }
  for (let [course, preR] of prerequisites) {
    //edges
    adjList[course].push(preR);
  }
  const pathSet = new Set();
  const dfs = (course) => {
    //visiting vertex
    if (pathSet.has(course)) return false;
    if (adjList[course].length === 0) return true;
    pathSet.add(course);
    for (let preR of adjList[course]) {
      //visiting edges
      if (dfs(preR) === false) return false;
    }
    pathSet.delete(course);
    adjList[course] = [];
    return true;
  };

  for (let course = 0; course < numCourses; course++) {
    //checkig if we can complete a course
    if (dfs(course) === false) return false;
  }
  return true;
};

/* 
Time: O(v+e+v+e) --> O(v+e)
• in order to create the adj. list(graph), we took up O(v) time
• in order to add to the adj. list it took us O(e) time
• we visit every edge and vertices O(v+e) time

Space: O(v+ v + v + e) --> O(v+e)
• created an adj. list of size v + e
• created a set of size v
• in the worst case the call stack would have v frames on the call stack
*/

/* 
The dependency relationship of tasks can be described by a direct graph 
 let us build a graph: 

• Courses become graph nodes.
• Prerequisites become directed edges: for each “course A must be completed before B can be taken,” we add an edge from A->B. In other words, an incoming edge means that another course must be completed before this one.
*/

/* 
Create an adjacency list out of the given array and path set
• if the current course is in the path set then return false (loop detected)
	◦ the path loops back to course, hence we have a cycle
	◦ use path instead of visited because we do visit courses multiple times but what matters if a course is on the path more than once
• if course has no prereqs. then return true (empty prereq. array)
• else:
	◦ add to pathSet
	◦ loop through the prereq. of this course
		‣ if calling dfs on the prereq. returns false then we have found a loop and cannot complete this  course which makes us return false
	◦ remove the course from pathSet
	◦ assign an empty array to the course on the adj. list
	◦ at this point you have been able to take all the prereqs. of this course meaning you can complete this course hence you can return true

check if each course can be completed by calling dfs on each course
return true
*/
