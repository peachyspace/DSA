/* 
1166. Design File System
https://leetcode.com/problems/design-file-system/

Trie
__________________________________________________

Input: 
["FileSystem","createPath","createPath","get","createPath","get"]
[ [],["/leet",1],["/leet/code",2],["/leet/code"],["/c/d",1],["/c"] ]

//             FileSystem
//          /                
// leet (1)     
//       /
//  code(2)

Output: 
[null, true, true, 2, false,-1]

• true --> we can create a path  for 'leet' (it holds 1) because '/leet' only requires only path from fileSystem and that exists
• true --> we can create a path for 'code'(it holds 2) because '/code' requires a path  that goes from fileSystem to leet and that exists
• 2 --> the path '/leet/code' leads to the file named code and it holds 2
• false --> we can't create a path for  '/d' because it requires a path from '/c' and that doesn't exist
• -1 --> the path '/c' doesn't exist

PSEUDO  CODE
Create File class 
Create Trie --> instantiate the File object and assign it to rootFile
Insert to Trie 
  - Assign the the rootFile to currentNodeFile
  - Split the string to create a array that excludes '/' and only  holds the file names 
  - Iterate through array of file names
  - during each iteration check if the currentFile is
      • is a child of the currentNodeFile and not the last file in the array
            - go to next node in trie
      • is not a child of the currentNodeFile and is the last file of the array
            - create a new file in the FileSystem
      • then either the parent file doesn't exist or the path given is a duplicate a path that already exists in the fileSystem
	        - return false
 Once out of the for loop return true

Search Trie
 Split array again 
 Iterate through the  pathArray  ('/a/b' ---->  a->b) and 
  - If  a file in the path given is not found then return -1
  - If you complete iterating  through the files then return last file's  value 
*/

const FileSystem = function () {
  this.rootFile = new File();
};

const File = function (name, value) {
  (this.name = name), (this.value = value), (this.children = {});
};

/**
 * @param {string} path
 * @param {number} value
 * @return {boolean}
 */
FileSystem.prototype.createPath = function (path, value) {
  let currentNodeFile = this.rootFile;
  let pathArray = path.split("/"); // '/leet/code' -> ['', leet, code]
  for (let i = 1; i < pathArray.length; i++) {
    let currentFile = pathArray[i];
    let isFileFound = currentNodeFile.children[currentFile];
    if (isFileFound && i !== pathArray.length - 1) {
      //prevents duplicates
      currentNodeFile = currentNodeFile.children[currentFile];
    } else if (!isFileFound && i === pathArray.length - 1) {
      let newFile = new File(currentFile, value);
      currentNodeFile.children[currentFile] = newFile;
    } else {
      return false; // the parent file doesn't exist or the path is a duplicate of another path and so we can't create the path
    }
  }
  return true;
};

/**
 * @param {string} path
 * @return {number}
 */
FileSystem.prototype.get = function (path) {
  let currentNodeFile = this.rootFile;
  const pathArray = path.split("/"); // '/leet/code' -> ['', leet, code]
  for (let i = 1; i < pathArray.length; i++) {
    let currentFile = pathArray[i];
    let isFileFound = currentNodeFile.children[currentFile];
    if (isFileFound) {
      currentNodeFile = currentNodeFile.children[currentFile];
    } else {
      return -1;
    }
  }
  return currentNodeFile.value;
};

/**
 * Your FileSystem object will be instantiated and called as such:
 * var obj = new FileSystem()
 * var param_1 = obj.createPath(path,value)
 * var param_2 = obj.get(path)
 */

/* 
Why use a trie?
 • The advantage of using a trie is that we are able to save on space.
    • All the paths sharing common prefixes(file parents) can be represented by a common branch in the tree
• The disadvantage of using a trie is that the get method is no longer O(1) (This occurs when you use a hastable) and instead it's O(t) 

Time Complexity:
• create : It takes O(t) time to add a path to the trie if it contains 't' files.
• get : It takes O(t) time to find a path in the trie if it contains 't' files.

Space Complexity:
• create : In the worst case the path given does not have any common files in the FileSystem and so the space complexity will increase by O(t) every time we utilize the create method
• get : O(t) because we are creating a new array of length 't' when we use the get method 
*/
