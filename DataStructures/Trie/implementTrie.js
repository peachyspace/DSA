/* 
208. Implement Trie (Prefix Tree)
https://leetcode.com/problems/implement-trie-prefix-tree/
*/

const TrieNode = function () {
  this.endOfWord = false;
  this.children = new Array(26).fill(null);
};
const Trie = function () {
  this.root = new TrieNode();
};

/**
 * @param {string} word
 * @return {void}
 */
Trie.prototype.insert = function (word) {
  let current = this.root;
  for (let i = 0; i < word.length; i++) {
    let currCharIndex = word.charCodeAt(i) - 97; //mapping char to its corresponding idx in current.children array
    if (!current.children[currCharIndex]) {
      //the letter doesn't exist in the trie
      current.children[currCharIndex] = new TrieNode(); //put node at char's idx in the arr
    }
    current = current.children[currCharIndex]; //becoming the next node
  }
  current.endOfWord = true; // at this point we are at the last letter
};

/**
 * @param {string} word
 * @return {boolean}
 */
Trie.prototype.search = function (word) {
  let current = this.root;
  for (let i = 0; i < word.length; i++) {
    let currCharIndex = word.charCodeAt(i) - 97;
    if (!current.children[currCharIndex]) {
      return false;
    }
    current = current.children[currCharIndex]; //becoming the next node
  }
  return current.endOfWord;
};

/**
 * @param {string} prefix
 * @return {boolean}
 */
Trie.prototype.startsWith = function (prefix) {
  let current = this.root;
  for (let i = 0; i < prefix.length; i++) {
    let currCharIndex = prefix.charCodeAt(i) - 97;
    if (!current.children[currCharIndex]) {
      return false;
    }
    current = current.children[currCharIndex]; //becoming the next node
  }
  return true; //we that there is at least one word that starts with this prefix in the trie
};

/**
 * Your Trie object will be instantiated and called as such:
 * var obj = new Trie()
 * obj.insert(word)
 * var param_2 = obj.search(word)
 * var param_3 = obj.startsWith(prefix)
 */

/* 
Insert:
Time:  O( k )
• 'k' is the length of the given word
• at each step of the algorithm we either examine or create a node in the trie till we reach the end of the given word. 
	◦ if a node exists at the index rep.current character in current's children then we create a new node 
	◦ if a node doesn't exist at the index rep.current character in current's children then we don't create a new node

Space: O( k )
• 'k' is the length of the given word
• in the worst case the newly inserted key doesn't share a prefix with the keys already inserted in the trie. We have to add 'k' new nodes, which takes up O( k ) space.



Search:
Time: O( k )
• 'k' is the length of the given word
• at each step of the algorithm we just iterate through the word given while moving the current variable
	◦ at worst case we actually find the key  and perform 'k' operations(traversals)

Space: O( 1 )
• All of the operations in the function use constant space



Starts With:
Time:  O( k  )
• 'k'is the length of the prefix given
• at each step of the algorithm we just iterate through the prefix given while moving the current variable
	◦ at worst case we iterate through the whole prefix

Space:
• All of our operations use constant space
*/

/* 
Create a class for:
• TrieNode:
	◦ endOfWord property set to false
	◦ children property set to new Array(26).fill(false)
• Trie:
	◦ root property that is assigned new TrieNode

Methods used:
Insert( word ):
• assign currentNode to root node
• iterate through the given word
	◦ in current nodes children array get the index rep. the current letter and assign it to currentLetterIndex
	◦ if the current letter is  not a child of currentNode
		‣ create a TrieNode 
		‣ in current nodes children array get the index rep. the current letter and assign it the newly created TrieNode
	◦ At every iteration update the current node to be currentNode.children[currentLetterIndex] 
		‣ we want to create a branch that rep. the given word
		‣ currentNode[currentLetterIndex] is a node that rep. the current letter and so we want to connect another node to it in the next iteration in order to create a branch
• Once out of the for loop, currentNode rep. the last letter of the given word and so in order to add that word to the trie we must 
	◦ assign the current node's endOfWord property to true

Search( word ):
• assign currentNode to root node
• iterate through the given word 
	◦ in current nodes children array get the index rep. the current letter and assign it to currentLetterIndex
	◦ if the current letter is not a child of currentNode
		‣ return false
	◦ else keep  moving down the branch
		‣ currentNode = currentNode.children[ currentLetterIndex ]
• return currentNode.endOfWord
	◦ Once out of the loop, we can see if the given word is actually inside of the trie by looking at endOfWord property of the node rep. the last letter of that word
		‣ if true then the given word is in the trie

startsWith( prefix ):
• assign currentNode to root node
• iterate through the given word 
	◦ in current nodes children array get the index rep. the current letter and assign it to currentLetterIndex
	◦ if the current letter is not a child of currentNode
		‣ return false
	◦ else keep  moving down the branch
• return true
	◦ By completing the for loop we know that the prefix exists in the Trie
*/
