/* 
211. Design Add and Search Words Data Structure
https://leetcode.com/problems/design-add-and-search-words-data-structure/
*/

const Node = function () {
  this.isEnd = false;
  this.children = {};
};
const WordDictionary = function () {
  this.root = new Node();
};

/**
 * Adds a word into the data structure.
 * @param {string} word
 * @return {void}
 */
WordDictionary.prototype.addWord = function (word) {
  let current = this.root;
  for (let i = 0; i < word.length; i++) {
    let char = word[i];
    if (!current.children[char]) {
      current.children[char] = new Node();
    }
    current = current.children[char];
  }
  current.isEnd = true;
};

/**
 * Returns if the word is in the data structure. A word could contain the dot character '.' to represent any one letter.
 * @param {string} word
 * @return {boolean}
 */
WordDictionary.prototype.search = function (word) {
  let root = this.root;
  const dfs = (start, current) => {
    for (let i = start; i < word.length; i++) {
      let char = word[i];
      if (word[i] === ".") {
        //only for words with '.'
        let children = Object.keys(current.children);
        for (let child of children) {
          if (current.children[child] && dfs(i + 1, current.children[child])) {
            return true;
          }
        }
        return false;
      } else {
        //only for words that don't contain '.'
        if (!current.children[char]) return false;
        current = current.children[char];
      }
    }
    return current.isEnd;
  };
  return dfs(0, root);
};

/* 
Search:

Time: defined: O(m) OR undefined: O(n * m^26) 
• m is the length of the word being searched
• n is the total number of words in the trie
• in the best case the word we search doesn't have any '.' then the time complexity would be O(m)
• in the worst case the word we search has only '.''s  and is one character longer than any other word in the trie then would have to search through every word in the trie
	◦ for every word(n) in the trie we could search through 26 paths for the length of the word(m) being searched.Time complexity: O(n * m^26)

Space: defined: O(1) OR undefined: O(m)
• for defined words we don't use any additional space O(1) since we are not using recursion to search but instead the for loop which doesn't take up any additional space 
• for undefined words(words that contain '.''s) we do use recursion to search and so the most frames on the call stack will the the length of the word(m) being searched
*/

/* 
Note the node.children property uses a hash table and not an array
• Leet code times out if we use an array 

Search method
let current = root
iterate for the length of the word
• when char is a comma-> we can potentially go through 26 different paths because the '.' can match any of the 26 characters
	◦ not possible iteratively because if we go down one path and don't find the word then we can't go back up to another path, which is why we use recursion
		‣ for every child in the current node's children hash table we will recursively call dfs on the child by passing the starting index, and child
			• if true returned then return true
		‣ return false since 
• else
	◦ if a node is not in the charIdx then return false
	◦ else move on the next node
  return current.isEnd
return dfs(0, root)
*/
