/* 
937. Reorder Data in Log Files
https://leetcode.com/problems/reorder-data-in-log-files/
*/

/**
 * @param {string[]} logs
 * @return {string[]}
 */

const reorderLogFiles = (logs) => {
  const logBody = (s) => s.slice(s.indexOf(" ") + 1);
  const isNum = (char) => /\d/.test(char);
  const compare = (a, b) => {
    let n = logBody(a).localeCompare(logBody(b));
    if (n !== 0) {
      return n;
    }
    return a.localeCompare(b);
  };
  let digitLogs = [];
  let letterLogs = [];
  for (let i = 0; i < logs.length; i++) {
    let currentLog = logs[i];
    if (isNum(logBody(currentLog))) {
      digitLogs.push(currentLog);
    } else {
      letterLogs.push(currentLog);
    }
  }
  return [...letterLogs.sort(compare), ...digitLogs];
};

/*
Time: O( m * n log(n) ) n is the number of logs in the list and m is the max length of a single log
• The sort method takes O(n log(n)) time
• For each invocation of the compare( ) function, we would need up to O(m) time, since we compare the contents(characters) of the logs

Space Complexity:O( m +  m * log(n) ) ->   O(m log(n))
• For each invocation of the compare( ) function, we would need up to O(m) spaces to hold the parsed logs
• Quick sort takes O(log(n)) time and assuming that the space fo each element is O(1)
	◦ Since each log could be of O(m) space we would need O(m * log (n)) space to hold the intermediate values for sorting
*/
/*[
"dig1 8 1 5 1",
"let1 art can",
"dig2 3 6",
"let2 own kit dig",
"let3 art zero"
]
*/

/*[
"let1 art can",
"let3 art zero",
"let2 own kit dig",
"dig1 8 1 5 1",
"dig2 3 6"
]*/
// identifer, letter log
// identifer, number log
//order by letter then leave number order alone

/*
Helper Functions:
• logBody(string) 
	◦ gets you the  body of the letter or digital  log
	◦ returns string.slice(string.indexOf('  ') + 1);
• isNum(string)
	◦ return /\d/.test(c);
	◦ using regex
Compare function
• Assign n to logBody(a).localeCompare(logBody(b))
• if n doesn't equal to 0 then return n
• return a.localeCompare(b)
	◦ comparing the whole string a and b instead of just the log parts
Create digitLogs array
Create letterLogs array
Iterate through the logs array
• if the log part is a number  then push the current log to digitLogs 
• else push the currentLog to letterLogs
return[...letterLogs.sort(compare),...digitLogs]
*/
