/* 1268. Search Suggestions System 
https://leetcode.com/problems/search-suggestions-system/
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
    prefix += char;
    suggestedArray.push(trie.getWordsStartingWith(prefix));
  }
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
    //allows us to push products to result in a lexicographical order
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
