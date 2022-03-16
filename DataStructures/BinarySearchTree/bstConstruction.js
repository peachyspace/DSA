/* 
450. Delete Node in a BST
https://leetcode.com/problems/delete-node-in-a-bst/
AlgoExpert: https://www.algoexpert.io/questions/BST%20Construction
*/

class BST {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }

  insert(value) {
    let newNode = new BST(value);
    let current = this;
    while (true) {
      if (value < current.value) {
        if (current.left) {
          current = current.left;
        } else {
          current.left = newNode;
          break;
        }
      } else {
        if (current.right) {
          current = current.right;
        } else {
          current.right = newNode;
          break;
        }
      }
    }
    // Do not edit the return statement of this method.
    return this;
  }

  contains(value) {
    let current = this;
    while (current) {
      if (value < current.value) {
        current = current.left;
      } else if (value > current.value) {
        current = current.right;
      } else {
        return true;
      }
    }
    return false;
  }

  remove(value, parent = null) {
    let current = this;
    while (current) {
      if (value < current.value) {
        parent = current;
        current = current.left;
      } else if (value > current.value) {
        parent = current;
        current = current.right;
      } else {
        // we found target bc target(value) === current.value
        /* subcases(SC):
                      -SC1:current has two child nodes
                      -SC2:current is the root node (dosent have SC1 bc we passed it)
                      -SC3:current is a left child (address SC2)
                          •current has one child or no child (passed SC1)
                      -SC4:current is a right child
                          •current has one child or no child (passed SC1)
                  */
        if (current.left !== null && current.right !== null) {
          //SC1
          current.value = current.right.getMinValue(current.right);
          current.right.remove(current.value, current);
          //calling remove function on right so when current = this
          //this key word refers to the obj that is calling remove
          //which in this case is current.right
          //This allows to start searching for min value at
          //current.right(right subtree) instead of starting at the beginning of the tree
        } else if (parent === null) {
          //SC2 (root only has 1 child or no child)
          if (current.left) {
            //make left subtree the main subtree
            current.value = current.left.value;
            current.right = current.left.right;
            current.left = current.left.left;
          } else if (current.right) {
            //make right subtree the main subtree
            current.value = current.right.value;
            current.left = current.right.left;
            current.right = current.right.right;
          } else {
            //current is the only node in the BST// do nothing
          }
        } else if (parent.left === current) {
          //SC3: current is a left child
          //at this point current has one child or no child
          //child could be left OR right
          parent.left = current.left !== null ? current.left : current.right;
        } else if (parent.right === current) {
          //SC4: current is a right child
          //at this point current has on child or no child
          //child could be left OR right
          parent.right = current.left !== null ? current.left : current.right;
        }

        break; // at this point we have removed the target(value)
      }
      // Do not edit the return statement of this method.
    }
    return this;
  }

  getMinValue(node) {
    //find the leftmost node of a subtree
    let current = node;
    /*when current.left is null then you have found 
          smallest(leftmost) value of the subtree passed 
          (in this case right subtree)
          -The leftmost node won't have a left child
          */
    while (current.left) {
      current = current.left;
    }
    return current.value;
    //all we want is the value of the leftmost node of the subtree passed
    //in this case right subtree
  }
}

/* 
insert
Time:  Best, Average: O(log(n)), Worst: O(n)
• On average every time we explore a node we cut the binary tree in half
• At worst case we have a binary tree that is skewed to the left or right. In this case we could potentially explore all the nodes in the binary tree
Space: O(1)
• We use constant space

contain
Time:  Best, Average: O(log(n)), Worst: O(n)
• On average every time we explore a node we cut the binary tree in half
• At worst case we have a binary tree that is skewed to the left or right. In this case we could potentially explore all the nodes in the binary tree
Space: O(1)
• We use constant space

remove
Time:  Best, Average: O(log(n)), Worst: O(n)
• On average every time we explore a node we cut the binary tree in half
	◦ getMinValue: every time we explore a new node we cut the binary tree in half (O(log(n))
	◦ the remove method calls itself once and that means that we traverse the binary tree in O(log(n)) time again 
		‣ O(log(n)) + O(log(n)) + O(log(n))  = 3O(log(n)) = O(log(n))
• At worst case we have a binary tree that is skewed to the left or right. In this case we could potentially explore all the nodes in the binary tree
	◦ getMinValue: We could potentially explore every node in the binary tree (O(n))
	◦ the remove method calls itself once and that means that we traverse the binary tree in O(n) time again 
		‣ O(n) + O(n) + O(n) = 3O(n) = O(n)
Space: O(1)
• We use constant space
• The remove method calls itself once only if the node to be removed has two child nodes 
*/

/* 
Removal (value, parent = null )
current = this
keep track off current and its parent node
iterate while current is true
• if the value < current.value
	◦ parent = current
	◦ current = current.left
• else if value > current.value
	◦ parent = current
	◦ current = current.right
• value === current.value(quite a few sub cases)
	◦ IF (hard)sub-case: the target node has two children nodes.
		‣ Grab smallest(leftmost) value in right subtree and replace the target.value with the that value. BST property (left child is < parent and parent < right child) is preserved
			• current.value = current.right.getMinValue( )
			• The smallest(leftmost) right value of the right subtree  is now the parent node because that value is bigger than all the nodes in the left subtree. 
			• The smallest(leftmost) right value of the right subtree is now the parent node of the subtree and is less than all the nodes in the right subtree.
		‣ Delete the smallest(leftmost) value of the right subtree by replacing it with targets left child , however if that child is null then the right child
			• current.right.remove( current.value, current )
			• this is an easy case because its a leaf node and therefore it has no children
	◦ ELSE IF: target is the the root node(has no parent node)
		‣ At this point we know that the target node has only one child since we past the 1st if statement
		‣ if child node is the left node then make left subtree the main tree
			• current.value = current.left.value
			• current.right = current.left.right
			• current.left = current.left.left
		‣ if child node is the right node then make right subtree the main tree
			• currentNode.value = current.right.value
			• currentNode.right = current.right.right
			• current.left = current.right.left
		‣ However the root node has no children then discuss with interviewer on how to proceed. If you delete the root then you delete the binary search tree
			• for AlgoExpert do nothing
	◦ ELSE IF: (easy)sub-case: the current(target) node is a left child node
		‣ current either has one child or no child, which means we only need to connect at most one subtree to the parent of current
			• "at most" because there can be case where there is no child( no branches)
		‣ deletes smallest(leftmost) node in right subtree when remove method is recursively called
		‣ parent.left = current.left !== null ? current.left : current.right
				◦ if left is true then we connect it to parent
					‣ that means right is null
	◦ ELSE IF: (easy)sub-case: the current(target) node is a right child node
		‣ current either has one child or no child, which means we only need to connect one subtree to the parent of current
			• "at most" because there can be case where there is no child( no branches)
		‣ parent.right = current.left !== null ? current.left : current.right
			• left value is used if not null because it will preserve the BST property (left child is < parent and parent < right child) 
	◦ BREAK after we hit one of the conditionals since we have already removed the node from the BST
  return the binary tree

getMinValue(node)
• let current = node
• while current.left 
	◦ current = current.left
		‣ reassigning current to the left value so we can get to the leftmost value of the right subtree
• return current.value
	◦ all we want is the value of the smallest(leftmost) node in the right subtree
*/
