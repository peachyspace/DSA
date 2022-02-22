/* 
Implementing  a linked list in JavaScript
methods of the Linked List:
    •push(value):inserting at the end of the Linked List
        * O(1) time
    •pop(): removing from the end of the Linked List
        * O(n) time
    •shift(): remove a node from the beginning of the Linked List
        * O(1) time
    •unshift(val): add a node to the beginning of the Linked List
        * O(1) time
    •get(index): retriving a node by the given position in the LL
        * O(n) time
    •set(index, value): change the value of a node located at a given index
        * O(n) time 
    •insert(index,val): adding a node to a linked list at a specific positon
        * O(1) time if adding to the beginning or end of LL
        * O(n) time any other position
    •remove(index)
        * O(1) time if removing from the beginning of the LL
        * O(n) time any other position
    •reverse()
        * O(n) time

*/

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}
class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }
  push(value) {
    //inserting at the end of the list
    let newNode = new Node(value);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.length++;
    return this; //returns whole Linked List
  }
  pop() {
    if (!this.head) {
      return null;
    }
    //fast & slow pointer
    let newTail = this.head;
    let current = this.head;
    while (current.next) {
      newTail = current; // lags behind
      current = current.next;
    }
    newTail.next = null;
    this.tail = newTail;
    this.length--;
    //if there is one node in the linked list(we didn't remove it)
    if (this.length === 0) {
      this.head = null;
      this.tail = null;
    }
    //return removed node
    return current;
  }
  shift() {
    //remove a node from the beginning of LL
    if (!this.head) {
      return null;
    }
    let oldHead = this.head;
    this.head = oldHead.next; //takes out old head
    this.length--;
    if (length === 0) {
      this.tail = null;
    }
    return oldHead;
  }
  unshift(val) {
    //add to the beginning of the node
    let newNode = new Node(val);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head; // newNode added to LL
      this.head = newNode;
    }
    this.length++;
    return this;
  }
  get(index) {
    //retriving a node by the position in the linked list
    if (index < 0 || index >= this.length) {
      return false;
    }
    let count = 0;
    let current = this.head;
    while (count !== index) {
      current = current.next;
      count++;
    }
    return current;
  }
  set(index, value) {
    //change the value of a node located at a given index
    let foundNode = this.get(index);
    if (!foundNode) {
      return false;
    }
    foundNode.val = value;
    return true;
  }
  insert(index, value) {
    //adding a node to a linked list at a specific a specific position
    if (index < 0 || index > this.length) {
      //if index === this.index just add to the end of LL
      return false;
    }
    if (index === 0) {
      this.unshift(val);
      return true;
    }
    if (index === this.length) {
      //adding to the end of LL
      this.push(val);
      return true;
    }
    let newNode = new Node(value);
    //In order to do this we must have access to the node at index - 1
    let prevNode = this.get(index - 1);
    newNode = prevNode.next; // both prevNode and newNode are pointing to the same node
    prevNode.next = newNode; // inserted newNode to LL && prevNode pointer updated
    this.length++;
    return true;
  }
  remove(index) {
    //removing a node from a given positon in LL
    if (index < 0 || index >= this.length) {
      //can't remove a position that is not there
      return false;
    }
    if (index === 0) {
      //head is the zeroth node
      this.shift();
      return true;
    }
    if (index === this.length - 1) {
      //applies to last node on the list
      this.pop();
      return true;
    }
    //we need access to the node at index-1 in order to remove
    let prevNode = this.get(index - 1);
    let removedNode = prevNode.next;
    prevNode.next = removedNode.next;
    this.length--;
    return removedNode;
  }
  reverse() {
    let prev = null;
    let current = this.head;
    let nextTemp = null;
    //we need to visit the last node in order to reverse its pointer
    while (current) {
      nextTemp = current.next; //save the node that is next to current
      current.next = prev; //reversed the current's pointer
      prev = current; //prev is now the current
      current = nextTemp; //current becomes nextTemp
    }
    //update head and tail of LL
    let temp = this.head;
    this.head = this.tail;
    this.tail = temp;
    return this.head;
  }
}
