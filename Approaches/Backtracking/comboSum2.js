/* 
40. Combination Sum II
https://leetcode.com/problems/combination-sum-ii/
*/

/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
// var combinationSum2 = function(candidates, target) {

// };

const combinationSum2 = (candidates, target) => {
  const result = [];
  const combo = [];
  candidates = candidates.sort((a, b) => a - b);
  const dfs = (index, total) => {
    if (total === target) {
      result.push([...combo]);
      return;
    }
    //if(index >= candidates.length ) return
    if (index >= candidates.length || total > target) return;
    total += candidates[index];
    combo.push(candidates[index]);
    dfs(index + 1, total);

    total -= candidates[index];
    combo.pop();
    //excluding duplicates of candidates[i] aka current candidate
    let count = 0;
    while (
      index < candidates.length &&
      candidates[index] === candidates[index + 1]
    ) {
      console.log(candidates[index], candidates[index + 1], count++);
      index++;
      console.log(candidates[index], candidates[index + 1]);
    }
    dfs(index + 1, total);
  };
  dfs(0, 0);
  return result;
};

/* 
Time:  O(n *((log(n)))  + O(n * (2^n)) -> O(n * (2^n))
• n is the length of candidates array
• sort takes up O(n * log(n)) time
• We make two decisions: include or exclude a candidate, for each candidate in the candidates array. --> 2^n  combo arrays can be created
• we make a copy of each combo array and that is O(N) operation

Space: O(log(n) + O(n) -> O(n)
• the call stack will have at most frames
• sort takes up log(n) space
*/

/* 
In creating these combinations we either include or exclude the candidate in the candidates array
• this allows us to stop duplicates from occurring
• we could do this using
	◦ iterating the decision tree by 
		‣ include candidate: and adding candidate to total and combo array and then calling dfs by passing i+1 and total
		‣ exclude by taking out candidate from total and combo and then using a while loop to skip the the duplicates of the current candidate
	◦ iterating decision tree by 
		‣ using for loop to where
			• we include in the candidate in the  current iteration by adding it to total and combo array and then calling dfs
				◦ after dfs returns make sure to take out candidate from total and combo array
			• we exclude the current candidate it taking out of total and combo array and thus excluding it from the next iteration.
				◦ if( i !== index &&  candidates[i] === candidates[i-1] ) allows us to skip duplicates 
*/

const combinationSum2a = (candidates, target) => {
  const result = [];
  const combo = [];
  candidates = candidates.sort((a, b) => a - b);
  const dfs = (index, total) => {
    // console.log(total)
    if (total === target) {
      result.push([...combo]);
      return;
    }
    //dont use index for base case bc the
    //canidates array could be bigger than
    //the target
    //we are focused on finding unique
    //combos that add up to target
    if (total > target) return;

    for (let i = index; i < candidates.length; i++) {
      if (i !== index && candidates[i] === candidates[i - 1]) continue;
      total += candidates[i];
      combo.push(candidates[i]);
      dfs(i + 1, total);
      total -= candidates[i];
      combo.pop();
    }
  };
  dfs(0, 0);
  return result;
};
