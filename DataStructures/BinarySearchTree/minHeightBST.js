/* 
Min Height BST
https://www.algoexpert.io/questions/Min%20Height%20BST
*/

function minHeightBst(array) {
  return constructBST(array, null, 0, array.length - 1);
}
function constructBST(array, bst, startIdx, endIdx) {
  if (endIdx < startIdx) return;
  let middleIdx = Math.floor((endIdx + startIdx) / 2);
  let newNode = new BST(array[middleIdx]);
  if (!bst) {
    bst = newNode;
  } else {
    if (newNode.value < bst.value) {
      bst.left = newNode;
      bst = bst.left;
    } else {
      bst.right = newNode;
      bst = bst.right;
    }
  }
  constructBST(array, bst, startIdx, middleIdx - 1);
  constructBST(array, bst, middleIdx + 1, endIdx);
  return bst;
}

class BST {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }

  insert(value) {
    if (value < this.value) {
      if (this.left === null) {
        this.left = new BST(value);
      } else {
        this.left.insert(value);
      }
    } else {
      if (this.right === null) {
        this.right = new BST(value);
      } else {
        this.right.insert(value);
      }
    }
  }
}
/* 
Time:  O(n)
• We iterate through every element in the array in order to construct the tree
• The calculations and comparisons all are constant time operations 

Space:(n)
• 'n' i s length of the array given 
• we created a BST that has 'n' nodes
*/

/* 
keep picking middle value of tree or subtree
Steps:
• check if endIdx < startIdx
	◦ return 
	◦ no more nodes to add to the given bst 
		‣ no valid range given in order to find middleIdx 
• calculate middleIdx : Math.floor((endIdx + startIdx)/2)
	◦ In order to create a subtree with min height we need it to be balanced.
		‣ the middle node will roughly have the same amount of left and right nodes
• create newNode withe element at middle
• 
• if the node is null then newNode is the bst(root node)
• Else 
	◦ if newNode.value is less tan bst.value
		‣ bst.left is assigned to newNode
		‣ update bst to bst.left
	◦ else 
		‣ bst.right is assigned to newNode
		‣ update bst to bst.right
• construct the left subtree of the bst
	◦ constructBST( array, bst, startIdx, middleIdx - 1 ) 
		‣  updating end in order to get left side
		‣ when this function returns, the current bst's left subtree has been created  
• construct the right subtree of the bst
	◦ constructBST( array, bst, middleIdx + 1, endIdx)
		‣ updating start in order to get right side
		‣ when this function returns, the current bst's right subtree has been created
• return bst
	◦ In last function popped of the call stack, bst is the root of the main bst
*/
