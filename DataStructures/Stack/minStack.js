/* 
155. Min Stack
https://leetcode.com/problems/min-stack/
*/

const MinStack = function () {
  this.data = [];
  this.minStack = [];
};

MinStack.prototype.push = function (val) {
  this.data.push(val);
  if (this.minStack.length === 0) {
    this.minStack.push(val);
  } else {
    if (val <= this.minStack[this.minStack.length - 1]) {
      this.minStack.push(val);
    }
  }
};

MinStack.prototype.pop = function () {
  let removed = this.data.pop();
  if (removed === this.minStack[this.minStack.length - 1]) {
    this.minStack.pop();
  }
  return removed;
};

MinStack.prototype.top = function () {
  return this.data[this.data.length - 1];
};

MinStack.prototype.getMin = function () {
  return this.minStack[this.minStack.length - 1];
};

/* 
Time: O(1)
- all the operations take up constant time

Space: O(2n) -> O(n)
- n is the total amount of operations performed
- The worst case would be that ALL the operations are push
  and so the space used up by this.data would be O(n) 
    - If all the numbers pushed are pushed in decreasing order then
      this.minStack would take up O(n) space since every proceeding
      number will be smaller than the last which means we push ALL
      the numbers onto the this.minStack 
*/

/* 
minStack top element will be the min value pushed SO FAR
The bottom elements will bigger than the min value pushed so far
When we add an element to the stack, we might need to add the minStack
- Only add to minStack when  minStack is empty or value added <=top element 
When we remove an element from the stack, we might need to update the minStack
- Only remove the top element from minStack when top element === removed element

*/
