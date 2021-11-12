/* 
1268. Search Suggestions System 
https://leetcode.com/problems/search-suggestions-system/

Trie + DFS
_________________________________________________________
m
• mobile
• moneypot
• monitor
mo
• mobile
• moneypot
• monitor
mou
• mouse
• mousepad
mous
• mouse
• mousepad
mouse
• mouse
• mousepad
*/

function suggestedProducts(products, searchWord) {
  let trie = new Trie();
  for (let i = 0; i < products.length; i++) {
    trie.insert(products[i]);
  }
  let prefix = "";
  let suggestedArray = [];
  for (let j = 0; j < searchWord.length; j++) {
    let char = searchWord[j];
    prefix += char; // String concatenation is O(m) operation
    suggestedArray.push(trie.getWordsStartingWith(prefix));
  }
  //'m' is the length of the searchword
  return suggestedArray;
}

class TrieNode {
  constructor(value) {
    this.value = value;
    this.children = {};
    this.isComplete = false;
  }
}
class Trie {
  constructor() {
    this.rootNode = new TrieNode();
  }
  insert(word) {
    let currentNode = this.rootNode;
    for (let i = 0; i < word.length; i++) {
      let currChar = word[i];
      if (currentNode.children[currChar]) {
        currentNode = currentNode.children[currChar];
      } else {
        let trieNode = new TrieNode(currChar);
        //adding key value pair to the children dictionary(object)
        currentNode.children[currChar] = trieNode;
        currentNode = trieNode;
      }
    }
    currentNode.isComplete = true;
  }

  dfsWithPrefix(currentNode, prefix, result) {
    if (result.length === 3) {
      return;
    }
    if (currentNode.isComplete === true) {
      result.push(prefix);
    }
    /*  
Here we are iterating through the children of the last character of the initial substring passed to the function dfsWithPrefix.
 If substring is "mo" then the first character we do a
 recursive dfs traversal is "b" because we traverse down the trie tree in an alphabetically increasing order. 
 • This for loop is iterating through the lowercase alphabet
 • Lowercase ASCII characters are represented in the range of 97-122
 • a === 97, z === 122  => a->z
 */
    for (let c = 97; c <= 122; c++) {
      let currChar = String.fromCharCode(c);
      if (currentNode.children[currChar]) {
        this.dfsWithPrefix(
          currentNode.children[currChar],
          prefix + currChar,
          result
        );
      }
    }
  }
  getWordsStartingWith(subStr) {
    const result = [];
    let currentNode = this.rootNode;
    for (let i = 0; i < subStr.length; i++) {
      let currChar = subStr[i];
      if (currentNode.children[currChar]) {
        currentNode = currentNode.children[currChar];
      } else {
        return result;
      }
    }
    //Reached the end of subStr and now use DFS
    this.dfsWithPrefix(currentNode, subStr, result);
    return result;
  }
}

/* 
'M' is the total number of characters in  the products array
'm' is the length of the searchWord
'n' is the total number of nodes in the trie
Time Complexity: O(m^2)
• To build the trie it takes a time complexity of O(m)
• DFS traversal takes O(26) --> O(1) time because in the worst case we recursively call dfsWithPrefix 26 times.
• In the function named suggestedProducts we are iterating through the search word (O(m)) and during each iteration we are concatenating a string(O(m)), hence O(m^2)
Space Complexity: O(n)
• O(26n) -> O(n)
  • 26 is the alphabet size.
  • Each node in the trie can have up to 26 children
*/
