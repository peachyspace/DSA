/* 
567. Permutation in String
https://leetcode.com/problems/permutation-in-string/
https://www.youtube.com/watch?v=UbyhOgBN834
Similar Problem: https://leetcode.com/problems/find-all-anagrams-in-a-string/solution/
*/

/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
const checkInclusion = function (s1, s2) {
  if (s1.length > s2.length) {
    return false;
  }
  let s1Count = new Array(26).fill(0);
  let s2Count = new Array(26).fill(0);
  //create freq. table of char in s1
  //create a freq table for the char's of the window in s2(window is of length s1)
  for (let i = 0; i < s1.length; i++) {
    s1Count[s1.charCodeAt(i) - 97]++;
    s2Count[s2.charCodeAt(i) - 97]++; //window is of length s1
  }
  let matches = 0;
  //validates start window before it moves
  //if matches sums to 26 then window valid else invalid
  for (let i = 0; i < 26; i++) {
    if (s1Count[i] === s2Count[i]) {
      matches++;
    }
  }
  let start = 0;
  //move window. We already included s1.length-1 elements
  for (let i = s1.length; i < s2.length; i++) {
    //let currentS2Char = s2[i]
    if (matches === 26) return true;
    // currentS2Char is added to the window
    s2Count[s2.charCodeAt(i) - 97]++;
    if (s1Count[s2.charCodeAt(i) - 97] === s2Count[s2.charCodeAt(i) - 97]) {
      matches++;
    } else if (
      s1Count[s2.charCodeAt(i) - 97] + 1 ===
      s2Count[s2.charCodeAt(i) - 97]
    ) {
      matches--;
    }
    //char at start index is removed from window
    s2Count[s2.charCodeAt(start) - 97]--;
    if (
      s1Count[s2.charCodeAt(start) - 97] === s2Count[s2.charCodeAt(start) - 97]
    ) {
      matches++;
    } else if (
      s1Count[s2.charCodeAt(start) - 97] - 1 ===
      s2Count[s2.charCodeAt(start) - 97]
    ) {
      matches--;
    }
    //move start pointer
    start++;
  }
  return matches === 26;
};

/*
Time: O( m + ( n - m ) ) -> O( n ) linear time
• we iterate through s1 (O(m))
• we iterate 26 times to calculate matches value of the window before we move it O(26)
• we iterate through the s2 string starting at m.length (O( n - m ))
	◦ since we start at m.length we do not iterate through the whole array
	◦ during each iteration we are executing operations that take up O(1) time
Space: O(1)
• Created two arrays that can have at most a length of 26
*/

/*
Shortened Steps
• Check if s1 is bigger than s2, if true then return false
• Create 2 arrays of length 26 that are filled with 0's
	◦ s1Count and s2Count
• Create frequency table of char in s1 
• Create a frequency table for the char's of the window in s2 (window is of length s1)
• Initialize matches to 0
• Calculate the amount of matches we have in the window before we move the window
• Initialize start to 0
• start iterating at s1.length in order to start moving window
	◦ if matches === 26 then return true
	◦ add the char at index i  to the window in s2
		‣ In s2Count, increment the value located at the index rep. the currentChar
		‣ If after we add to the window, the index representing currentChar has the same value in both s1Count and s2Count then increment matches by one
		‣ else if the addition to the window made s1Count[index rep. currChar ] bigger than s1[ index rep. currChar ] by one then decrement matches by one
	◦ remove the char at the index start from the window in s2
		‣ In s2Count, decrement the value located at the index rep. start char
		‣ If after we remove from the window, the char at index start has the same value in both s1Count and s2Count then increment by one
		‣ else if the removal from the window made  s1Count[ index rep. start char ]  smaller than s1[ index rep. start char] by one then decrement matches by one
	◦ move the start pointer 
• return matches === 26
*/

/* 
Where is the optimization?
Instead of comparing all the elements of the hashMap or array every time s2Count is updated, 
• keep track of number of elements which are already matching in the earlier hashMap/array
	◦ initial count of matching elements before we move window
• update just the count of the matching elements when we move the window to the right
	◦ addition of a char
	◦ removal of a char
*/

/* 
In depth Explaination:
• create two arrays of length 26 and are filled with 0's
	◦ 0th index contains count of letter a
	◦ 1st index 1 contains count of letter b
	◦ 2nd index contains count of letter c
	◦ ......
	◦ 25th index contains count of letter z
• iterate through s1 and update the frequency for each character in the frequency array of s1
	◦ at the same time we are going through s1 we also go through the first 'm' characters of s2. 
		‣ 'm' is the length s1
	◦ convert characters to indices and then increment its value
		‣ s1Count[ s1.charCodeAt( i ) - 97] ++
			• subtract by 'a''s ASII value because it will map the char to an index in s1Count array
			• 'a' is mapped to index 0 : 97 -  97 = 0
			• 'b' is mapped to index 1 : 98 -  97 = 1
		‣ s2Count[ s2.charCodeAt( i ) - 97 ] ++
• initialize matches variable to 0
/// We want to see if there are any matches even before we move the window at s2. 
• Iterate  26 times 
	◦ increment matches by 1 when  s1Count[ i ] == sCount[ i ] else increment by 0
		‣ matches += s1Count[ i ] === s1Count[ i ] ? 1 : 0
• Initiate start pointer to 0
//During each iteration we move the window and we update the matches variable after every addition and removal 
• iterate from s1.length up until but excluding s2.length. We start at s1.length index because we already initialized our windows with s1.length elements. (Ex: s1.length = 3 then 3 elements are in the window and we need to traverse from index 3 up to but excluding s2.length // arrays are zero indexed and so char at  index 0,1,2 of s2 have been mapped to s2Count )
	◦ if matches is equal to 26 then return true
//adding the character index i to the window
	◦ remember our character is not an index in our s2Count array but it takes part in calc. index 
		‣ index = s2.charCodeAt( r ) - 97  //this index represents the s2[ r ]
	◦ Increment value at the index we just calc.
		‣ s2Count[ index ] ++
	◦ After we increment it is possible that s2Count equals s1Count at the same index then increment matches by 1
		‣ if ( s1Count[index] === s2Count[index] ) matches++
	◦ else if we made s2Count[ index ] bigger than s1Count[ index ] by 1 then we must decrement matches by 1
		‣ else if( s1Count[index] +1 === s2Count[index] ) matches--
		‣ at this point we had a char that had the same freq. in s1Count and s2Count but we just changed that
//removing the character at index start from the window
	◦ Remember our character at start is not an index in our s2Count array but it takes part in calc. index 
		‣ index = s2.charCodeAt( start ) - 97  //this index represents the s2[ r ]
	◦ Decrement value at the index we just calc because we are removing that character the index represents from the window.
		‣ s2Count[ index ] --
	◦ After we decrement it is possible that s2Count equals s1Count at the same index then increment matches by 1
		‣ if ( s1Count[index] === s2Count[index] ) matches++
	◦ else if we made s2Count[ index ] smaller than s1Count[ index ] by 1 then we must decrement matches by 1
		‣ else if( s1Count[index] -1 === s2Count[index] ) matches--
		‣ at this point we had a char that had the same freq. in s1Count and s2Count but we just changed that
	◦ move start pointer because we want the window to have the length of s1
		‣ start++
• return matches === 26 
	◦ when we get out of the for loop it is possible that in the last iteration the matches is equal to 26 since we didn't check that after we updated matches
*/
