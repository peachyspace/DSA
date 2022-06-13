/* 
 1143. Longest Common Subsequence
 https://leetcode.com/problems/longest-common-subsequence/
*/

const longestCommonSubsequence = function (text1, text2) {
  let dp = Array(text1.length + 1);
  for (let i = 0; i <= text1.length; i++) {
    dp[i] = Array(text2.length + 1).fill(0);
  }
  for (let i = text1.length - 1; i >= 0; i--) {
    for (let j = text2.length - 1; j >= 0; j--) {
      if (text1[i] === text2[j]) {
        //match:take out the 1st char of both strings
        //in order to ADD the longest subsequence
        //of strings located diagonally from
        //the current strings corrdinate to the current position
        dp[i][j] = 1 + dp[i + 1][j + 1]; // 1 + potential digonal match
      } else {
        //NO match:take out 1st char of text1(go down)
        //then takeout 1st char of text2(go right)
        //the current strings longest subsequence is the
        //greatest subsequence length from the subsequence of
        //the strings below(take out 2st char) curr strings coordinates
        // OR the subsequence of the strings to the
        //right(take out 1st char) of
        //the coordinates of the current strings
        dp[i][j] = Math.max(dp[i + 1][j], dp[i][j + 1]);
      }
    }
  }
  return dp[0][0];
};
/* 
Time: O(m*n)
• m is the length of text1
• n is the length of text2
• the total amount of iterations is m*n because if we look at the grid of size m*n each cell(position) represents a subproblem
	◦ a grid with of size m*n has  m*n cells and therefore has m*n subproblems 

Space: O(m*n)
• We created a grid of size m*n that stores the solutions to the subproblems
• The max amount of frames in the call stack is Max(m, n), since we RETURN 0 when i or j is greater than the length of their respective string 
*/

const longestCommonSubsequence2 = function (text1, text2) {
  let x = text1.length;
  const dp = Array(text1.length);
  for (let i = 0; i < text1.length; i++) {
    dp[i] = Array(text2.length + 1).fill(null);
  }

  return helper(0, 0, text1, text2, dp);
};

const helper = (i, j, text1, text2, dp) => {
  if (i === text1.length || j === text2.length) return 0; //out of bounds
  if (dp[i][j] !== null) return dp[i][j];

  if (text1[i] === text2[j]) {
    return (dp[i][j] = 1 + helper(i + 1, j + 1, text1, text2, dp));
  } else {
    return (dp[i][j] = Math.max(
      helper(i + 1, j, text1, text2, dp),
      helper(i, j + 1, text1, text2, dp)
    ));
  }
};
/* 
Time: O(m*n)
• m is the length of text1
• n is the length of text2
• the total amount of recursive calls is m*n because if we look at the grid of size m*n each cell(position) represents a subproblem
	◦ a grid with of size m*n has  m*n cells and therefore has m*n subproblems 

Space: O(m*n)
• We created a grid of size m*n that stores the solutions to the subproblems
• The max amount of frames in the call stack is Max(m, n), since we RETURN 0 when i or j is greater than the length of their respective string 
*/

/*
return the LENGTH of the longest common subsbtr
-can be 0
-you can delete some char but no rearranging

how many sub problems do we need to solve
- we take out one or BOTH characters of the strings each time
- by taking out one character at a time from a string of length m, 
  we would need to take out m characters in order to have an empty string,
- by taking out one character at a time from a string of length n, 
  we would need to take out n characters in order to have an empty string
- str1 of length m and str2 of length n
- total subproblems = m * n because we want either one or both strings to be empty
Create a grid that is of size m*n, each coordinate represents the
length of the longest subsequence from the modified str1 and str2
- when you hit a base case you will start filling in some of the coordinates
  before the function call terminates we will fill the coordinate representing
  the longest subsequence created from the original str1 and str2

base case
- if EITHER i or j are equal to the length of their respective string then return 0
- if the dp[i][j] is not null then return the value at that coordinate


if: matching char : dp[i][j] = 1 +LCS(i+1, j+1)//prevents revisiting dupes
- LCS(i+1, j+1,t1 ,t2) increment i and j by 1 because we want to see if the
   next character is a match
- add 1 to LCS(i+1, j+1) because you found a match after the removal
  of a char from one of the strings
- every time we find a match we found a portion of the subsequence
  
else: NO match:dp[i][j]Math.max(LCS(i+1, j, t1 ,t2),LCS(i, j+1, t1 ,t2))//prevents dupes
- LCS(i+1, j, t1 ,t2): remove 1st char from t1 in order to check
  that if the 1st char of the new t1 substr, matches 1st char of t2
  - we take out a char bc the LCSubsequence DOSENT have to be consectutive 
  - A subsequence of a string is a new string generated from the 
    original string with some characters (can be none) deleted
  - LCS recursive function returns length of LCS
- LCS(i, j+1, t1 ,t2): remove 1st char from t2 in order to check
  that if the 1st char of the new t2 substr matches 1st char of t1
- Math.max(LCS(i+1, j, t1 ,t2),LCS(i, j+1, t1 ,t2)) bc we are trying to
  find the longest common subsequence
  - when we don't have matches we must accept the function call
    that returns the greater length
  
*/
