/*
359. Logger Rate Limiter
https://leetcode.com/problems/logger-rate-limiter/
*/

var Logger = function () {
  this.hashTable = {};
};

/**
 * @param {number} timestamp
 * @param {string} message
 * @return {boolean}
 */
Logger.prototype.shouldPrintMessage = function (timestamp, message) {
  // console.log('[ ]: ',!(this.hashTable[message]),this.hashTable[message], 'in: ',!(message in this.hashTable))

  if (!(message in this.hashTable)) {
    this.hashTable[message] = timestamp;
    return true;
  }
  if (timestamp - this.hashTable[message] >= 10) {
    this.hashTable[message] = timestamp;
    return true;
  } else {
    return false;
  }
};

/*
Time: O(1)
• Hash table look ups and insertions take on average O(1) time

Space: O(m) 
• m is the amount unique  incoming messages
*/

/**
 * Your Logger object will be instantiated and called as such:
 * var obj = new Logger()
 * var param_1 = obj.shouldPrintMessage(timestamp,message)
 */

/*
Check if a message has been sent 10 min ago
• new message alwqays returns true
    •add message to hash Table
• duplicate message check if newTimestamp - oldTimestamp >=10
	◦ duplicate must be come 10 sec after original message
	◦ add new message and timestamp if duplicate comes 10 min after original 
	◦ return true
• else return false
Note: [ ]: !(this.hashTable[message]) returns the value and if the value is 0 that can be interpreted as false ,
While the in operator !(message in this.hashTable) returns true or false
- true if key was found
-false if key was not found
*/
