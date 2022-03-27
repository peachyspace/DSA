/* 
Yongest common ancestor
https://www.algoexpert.io/questions/Youngest%20Common%20Ancestor
*/

class AncestralTree {
  constructor(name) {
    this.name = name;
    this.ancestor = null;
  }
}

function getYoungestCommonAncestor(topAncestor, descendantOne, descendantTwo) {
  let depthOne = getDescendantDepth(descendantOne, topAncestor);
  let depthTwo = getDescendantDepth(descendantTwo, topAncestor);
  //Finding out which descendant is lower
  if (depthOne > depthTwo) {
    //get lower node to the same level as other node
    //Then find the 1st where they meet/ lowest common ancestor
    return backtrackingAncestralTree(
      descendantOne,
      descendantTwo,
      depthOne - depthTwo
    );
  } else {
    //get lower node to the same level as other node
    //Then find the 1st where they meet/ lowest common ancestor
    return backtrackingAncestralTree(
      descendantTwo,
      descendantOne,
      depthTwo - depthOne
    );
  }
}

function getDescendantDepth(descendant, topAncestor) {
  let depth = 0;
  while (descendant !== topAncestor) {
    depth++;
    descendant = descendant.ancestor;
  }
  return depth;
}

function backtrackingAncestralTree(lowerDescendant, higherDescendant, diff) {
  while (diff > 0) {
    diff--;
    lowerDescendant = lowerDescendant.ancestor;
  }
  //at this point the two desendats are at the same level
  //we can now move the descendants at the same time
  while (lowerDescendant !== higherDescendant) {
    //move both descendants upwards at the same time
    lowerDescendant = lowerDescendant.ancestor;
    higherDescendant = higherDescendant.ancestor;
  }
  return lowerDescendant; // you can return either descendant
  //both are are at the youngest common descendant
}

/* 
  Time: O(D)
• 'D' is the depth of the lowest descendant because that is going to be the longest iteration we have to do
	◦ remember big O focuses on worst case and that looks at how much time will algorithm take to execute as the input grows
		‣ In this case the input growing would mean we would get a node that has more depth
Space: O(1)
• All the executions we make take up constant space
  */

/* 
Youngest common ancestor is the first common ancestor the two descendants have
Steps
• We have to start at the descendants given (starting below the root node)
	◦ we can iterate simultaneously from the descendants and then stop when both nodes have the same ancestor
	◦ Edge case: The given descendants do not have the same depth/level. This will allows to find a common ancestor(top ancestor/root) but not the youngest common ancestor
		‣ In order to find the youngest common ancestor we must get both nodes to the same depth/level
			• Before we iterate simultaneously we must find out the depths/level of both of the given descendants
			• Move the deepest given node up to the depth/level of the other given node
			• When both nodes are at the same depth/level we can iterate up the tree and stop once we are at the same value. At that point we found the youngest common ancestor
				◦ this may occur once we get the deepest given node at the same level as the other given node
*/

/* 
getYoungestCommonAncestor(topAncestor, descendantOne, descendantTwo) 
• get the depths of the two given descendants and assign them to depthOne or depthTwo
• if depthOne > depthTwo
	◦ descendantOne is lower than descendantTwo
	◦ return the value returned by backtrackingAncestralTree( lowestDescendant, higherDescendant, depthOne - depthTwo)
• else depthTwo > depthOne
	◦ descendantTwo is lower than descendantOne
	◦ return the value returned by backtrackingAncestralTree( lowestDescendant, higherDescendant, depthTwo - depthOne)

getDescendantDepth(node, ancestorNode)
• check descendant !== topAncestor
	◦ check first so we don't jump to null
• increment depth 
• then move/jump descendant

diff is the difference in depths between the two descendants
backtrackingAncestralTree( lowestDescendant, higherDescendant, diff)
• move lowerDescendant up to higherDescendant
	◦ use while loop that stops once the diff ===0
• move both descendants at the same time and stop when both have the same value
	◦ this allows you to find the lowest common ancestor
• return either descendant because they both are at the lowest common ancestor
*/
