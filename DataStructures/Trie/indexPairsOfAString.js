/* 
1065. Index Pairs of a String
https://leetcode.com/problems/index-pairs-of-a-string/
*/

/**
 * @param {string} text
 * @param {string[]} words
 * @return {number[][]}
 */
class TrieNode {
  constructor() {
    this.isEndOfWord = false;
    this.children = new Array(26).fill(null);
  }
}
class Trie {
  constructor() {
    this.root = new TrieNode();
  }
  insert(word) {
    let current = this.root;
    for (let i = 0; i < word.length; i++) {
      let currentLetterIndex = word.charCodeAt(i) - 97;
      if (!current.children[currentLetterIndex]) {
        //holds null instead of node
        current.children[currentLetterIndex] = new TrieNode();
      }
      current = current.children[currentLetterIndex]; // move to next node in the branch
    }
    current.isEndOfWord = true;
  }
}

var indexPairs = function (text, words) {
  let indexPairs = [];
  let trie = new Trie();
  //insert words in words array into Trie
  for (let i = 0; i < words.length; i++) {
    let currentWord = words[i];
    trie.insert(currentWord);
  }
  //iterate through the given text
  for (let i = 0; i < text.length; i++) {
    let endIndex = i;
    //for each letter in the text we will go down the Trie and see
    //if its part of a word in the Trie
    let current = trie.root.children[text.charCodeAt(i) - 97];
    while (current && endIndex < text.length) {
      if (current.isEndOfWord) {
        indexPairs.push([i, endIndex]);
        //'i' gives us access to idx of the 1st
        //letter in the word
        // we found a word from given array(words)
      }
      //go to next node in the branch
      endIndex++;
      let currentLetterIndex = text.charCodeAt(endIndex) - 97;
      current = current.children[currentLetterIndex];
      //if current is assigned null then we wont entr the while loop
    }
  }
  return indexPairs;
};
/* 
Time:  O( m * k ) + O( n * k ) 
• 'm' the length of the words array
• 'n' length of text string
• 'k' length of the maximum word in the words array
• 1st for loop: O( m * k ) time
	◦ for the length of the words array( O( m ) time ) we are:
		‣ inserting a word to the trie ( O( k ) time )
• 2nd for loop: O( n * k ) time
	◦ for the length of the text string ( O( n ) time ) we are
		‣ are going down a branch of at most 'k' nodes ( O( k ) time )

Space: O( m * k )
• 'm' the length of the words array
• 'k' length of the maximum word in the words array
• we are creating a trie in the 1st for loop
	◦ the trie will have 'm' words inside it and each word can have  a branch of 'k' nodes
*/

/* 
Steps:
• initialize a 
	◦ TrieNode
		‣ isEndOfWord property = false
		‣ children property  = new Array(26).fill(null)
	◦ Trie
		‣ root property = new TrieNode
• For each word in words:
	◦ insert word in Trie
• For each letter in text 
	◦ initialize current to root
	◦ endIdx = i 
		‣ Run while loop as long as current is not null and endIndex<text.length
			• if current rep.the last letter of a word in the words array
				◦ add [ i, endIndex ] to indexPairs array
			• at each iteration move on to the next node in the branch by 
				◦ incrementing endIndex 
				◦ find new endIndex corresponding index in current's children array and assign that value to current 
					‣ this makes us move to the next node in the branch 
						• next node can be a node or null
• return indexPairs
*/
