/* 
39. Combination Sum
https://leetcode.com/problems/combination-sum/
*/

/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */

const combinationSum = (candidates, target) => {
  const result = [];
  const dfs = (start, currentSum, sumArray) => {
    if (currentSum === target) {
      result.push([...sumArray]);
      return;
    }
    if (currentSum > target) return;
    for (let i = start; i < candidates.length; i++) {
      currentSum += candidates[i];
      sumArray.push(candidates[i]);
      dfs(i, currentSum, sumArray);
      sumArray.pop();
      currentSum -= candidates[i];
      //dfs(i+1,currentSum, sumArray)
    }
  };
  dfs(0, 0, []);
  return result;
};

/* 
total number of steps: O( (n ^ t )  )
total number of steps to copy over the sumArray: O( (n ^ t ) * t )

O( (n ^ t ) ) + O( (n ^ t ) * t ) --> O( (n ^ t ) * t )
Time: O( (n ^ t ) * t )
• n is the length of the given array
• t is the given target
• Total number of recursive calls in the recursive tree( branch factor ^ height of tree): O( n ^ t )
	◦ height of tree is t
		‣ all the candidates will be positive numbers ranging from 1 to 500
			• this means that the worst case would be that the smallest candidate is 1 and therefore the height of the decision tree will be at most whatever the target is
				◦ candidate = [1,5,6], target 7: 
					‣ sum array = [1,1,1,1,1,1,1] -> 1+1+1+1+1+1+1 =7 
	◦ For each number in the given array we can either include it or exclude it, meaning that each number has two decisions(branch factor).
		‣ [1, 2, 3]
		‣ 1st level: 3 decisions
			• 3  ->  n
		‣ 2nd level: 9 decisions because each of the previous 3 decisions now have 3 decisions
			• 3 * 3  ->  n * n
		‣ 3rd level: 27 decisions because each the previous 9 decisions now have 9 decisions 
			• 3 * 3 * 3  ->   n * n * n
• Total subsets created = total number of recursive calls
• We could be COPYING over a sumArray of length n for each combination sum we create
	◦ t is the given target
	◦ m is the minimal value among the candidates
	◦ copying arrays is an  O(t) operation
		‣ t= 7 and  min. candidate =1 then the leaf of the longest path will have [1,1,1,1,1,1,1]  meaning that the longest path will be 7 nodes long 

Space: O(t)
• t is the given target
• We don't include the output in the space complexity
• The call stack will have at most t frames because the longest path(height) of the tree could be t nodes long
	◦ in the worst case the minimum candidate is 1 meaning that the longest path(aka height) will have t/1 = t nodes
*/

/* 
create result and sumArray = []
create currSum = 0
DFS with backtracking
• base case: currSum === target
	◦ result.push([...sumArray]
	◦ return
• base case: start >=candidates.length OR currSum > target
	◦ return
• from start index iterate to the end of the candidates array
Note: the For loop helps us exclude the previous candidate in sumArray and also move on to the next candidate. This is happens because there are only unique candidates(numbers) in the candidates's array
	◦ Decision to include: add candidate[i] to sumArray
	◦ add candidate[i] to currSum
	◦ Explore inclusive decision (start, currSum, sumArray)
		‣ start stays the same so we can see if including candidate[i] multiple times will get us to equal the target
		‣ note we are traversing from start to candidates.length, which means we are excluding the candidates behind start

call DFS with backtracking(0,0,[])
return result
*/

const combinationSum2 = (candidates, target) => {
  const result = [];
  const dfs = (i, currentSum, sumArray) => {
    if (currentSum === target) {
      result.push([...sumArray]);
      return;
    }
    if (i >= candidates.length || currentSum > target) return;

    currentSum += candidates[i];
    sumArray.push(candidates[i]);
    dfs(i, currentSum, sumArray);
    sumArray.pop();
    currentSum -= candidates[i];
    dfs(i + 1, currentSum, sumArray);
  };
  dfs(0, 0, []);
  return result;
};

/* 
Time: O( (2 ^ t) * t )
• n is the length of the given array
• t is the given target
• Total number of recursive calls in the recursive tree( branch factor ^ height of tree)
	◦ height of tree is t
		‣ all the candidates will be positive numbers ranging from 1 to 500
			• this means that the worst case would be that the smallest candidate is 1 and therefore the height of the decision tree will be at most whatever the target is
				◦ candidate = [1,5,6], target 7: 
					‣ sum array = [1,1,1,1,1,1,1] -> 1+1+1+1+1+1+1 =7 
	◦ For each number in the given array we can either include it or exclude it, meaning that each number has two decisions(branch factor).
		‣ [1, 2, 3]
		‣ 1st level: 2 decisions (include or exclude 1)
			• 2
		‣ 2nd level: 4 decisions because each of the previous 2 decisions now have 2 decisions (include or exclude 2)
			• 2 * 2
		‣ 3rd level: 8 decisions because each the previous 4 decisions now have 2 decisions (include or exclude 3)
			• 2 * 2 * 2
• Total subsets created = total number of recursive calls
• We could be COPYING over a sumArray of length t for each sumArray we create
	◦ copying arrays is an O(t) operation
		‣ t= 7 and  min. candidate =1 then the leaf of the longest path will have [1,1,1,1,1,1,1]  meaning that the longest path will be 7 nodes long 

Space: O(t)
• We don't include the output in the space complexity
• The call stack will have at most t frames because the longest path(height) of the tree could be t
	◦ in the worst case the minimum candidate is 1 meaning that the longest path will be t nodes long. 

*/

/* 
create result and sumArray = []
create currSum = 0
DFS with Include and exclude backtracking
• base case: currSum === target
	◦ result.push([...sumArray]
	◦ return
• base case: start >=candidates.length OR currSum > target
	◦ return
• Decision to include: add candidate[i] to sumArray
• add candidate[i] to currSum
• Explore inclusive decision (i, currSum, sumArray)
	◦ i stays the same so we can see if including candidate[i] multiple times will get us to equal the target
• Decision to exclude(undo): remove candidate from sumArray
• Explore decision to exclude ( i+1; currSum. sumArray)
	◦ i+1 so we don't add candidate[i] to sumArray again
	◦ removes duplicate sumArrays from being added to result 
		‣ [2,2,3]  [2,3,2] [3,2,2]
Call DFS with Include and exclude backtracking(0,0,[])
return result
*/
