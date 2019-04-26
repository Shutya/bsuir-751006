'use strict';

/********************************************************************************************
 *                                                                                          *
 * Plese read the following tutorial before implementing tasks:                             *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String  *
 *                                                                                          *
 ********************************************************************************************/



/**
 * Returns the result of concatenation of two strings.
 *
 * @param {string} value1
 * @param {string} value2
 * @return {string}
 *
 * @example
 *   'aa', 'bb' => 'aabb'
 *   'aa',''    => 'aa'
 *   '',  'bb'  => 'bb'
 */
function concatenateStrings(value1, value2) {
    return value1.concat(value2);
}


/**
 * Returns the length of given string.
 *
 * @param {string} value
 * @return {number}
 *
 * @example
 *   'aaaaa' => 5
 *   'b'     => 1
 *   ''      => 0
 */
function getStringLength(value) {
    return value.length;
}

/**
 * Returns the result of string template and given parameters firstName and lastName.
 * Please do not use concatenation, use template string :
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/template_strings
 *
 * @param {string} firstName
 * @param {string} lastName
 * @return {string}
 *
 * @example
 *   'John','Doe'      => 'Hello, John Doe!'
 *   'Chuck','Norris'  => 'Hello, Chuck Norris!'
 */
function getStringFromTemplate(firstName, lastName) {
    return `Hello, ${ firstName } ${ lastName }!`;
}

/**
 * Extracts a name from template string 'Hello, First_Name Last_Name!'.
 *
 * @param {string} value
 * @return {string}
 *
 * @example
 *   'Hello, John Doe!' => 'John Doe'
 *   'Hello, Chuck Norris!' => 'Chuck Norris'
 */
function extractNameFromTemplate(value) {
	return value.slice(7,-1);
}


/**
 * Returns a first char of the given string.
 *
 * @param {string} value
 * @return {string}
 *
 * @example
 *   'John Doe'  => 'J'
 *   'cat'       => 'c'
 */
function getFirstChar(value) {
   return value.slice(0,-(value.length - 1));    
}

/**
 * Removes a leading and trailing whitespace characters from string.
 *
 * @param {string} value
 * @return {string}
 *
 * @example
 *   '  Abracadabra'    => 'Abracadabra'
 *   'cat'              => 'cat'
 *   '\tHello, World! ' => 'Hello, World!'
 */
function removeLeadingAndTrailingWhitespaces(value) {
	  value = value.replace(/^\s*/,'').replace(/\s*$/,'');;
	  return value;
}

/**
 * Returns a string that repeated the specified number of times.
 *
 * @param {string} value
 * @param {string} count
 * @return {string}
 *
 * @example
 *   'A', 5  => 'AAAAA'
 *   'cat', 3 => 'catcatcat'
 */
function repeatString(value, count) {
   return value.repeat(count);
}

/**
 * Remove the first occurrence of string inside another string
 * 
 * @param {string} str
 * @param {string} value
 * @return {string}
 *
 * @example
 *   'To be or not to be', 'not'  => 'To be or to be'
 *   'I like legends', 'end' => 'I like legs',
 *   'ABABAB','BA' => 'ABAB'
 */
function removeFirstOccurrences(str, value) {
	return str.replace(value,''); 
}

/**
 * Remove the first and last angle brackets from tag string
 *
 * @param {string} str
 * @return {string}
 *
 * @example
 *   '<div>' => 'div'
 *   '<span>' => 'span'
 *   '<a>' => 'a'
 */
function unbracketTag(str) {
    return str.slice(1,-1);
}


/**
 * Converts all characters of the specified string into the upper case
 *
 * @param {string} str
 * @return {string}
 *
 * @example
 *   'Thunderstruck' => 'THUNDERSTRUCK'
 *  'abcdefghijklmnopqrstuvwxyz' => 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
 */
function convertToUpperCase(str) {
    return str.toUpperCase();
}

/**
 * Extracts e-mails from single string with e-mails list delimeted by semicolons
 *
 * @param {string} str
 * @return {array}
 *
 * @example
 *   'angus.young@gmail.com;brian.johnson@hotmail.com;bon.scott@yahoo.com' => ['angus.young@gmail.com', 'brian.johnson@hotmail.com', 'bon.scott@yahoo.com']
 *   'info@gmail.com' => ['info@gmail.com']
 */
function extractEmails(str) {
    return str.split(';');
}

/**
 * Returns the string representation of rectangle with specified width and height
 * using pseudograhic chars
 *
 * @param {number} width
 * @param {number} height
 * @return {string}
 *
 * @example
 *
 *            '┌────┐\n'+
 *  (6,4) =>  '│    │\n'+
 *            '│    │\n'+
 *            '└────┘\n'
 *
 *  (2,2) =>  '┌┐\n'+
 *            '└┘\n'
 *
 *             '┌──────────┐\n'+
 *  (12,3) =>  '│          │\n'+
 *             '└──────────┘\n'
 *
 */
function getRectangleString(width, height) {
   var str= new String;
   for(var j = 0; j < height; j++){
	for(var i=0; i<width; i++){
		if(i == 0 && j ==0){
			str = str.concat('┌');
			continue;
		}
		
		if(i == 0 && j == height - 1){
			str = str.concat('└');
			continue;
		}
		
		if(i == width - 1 && j == 0){
			str = str.concat('┐');
			continue;
		}
		
		if(i == width - 1 && j == height - 1){
			str = str.concat('┘');
			continue;
		}
		
		if(i != 0 && i != width - 1){
			if(j != 0 && j != height - 1){
				str = str.concat(' ');
			}
			else{
				str = str.concat('─');
			}
			continue;
		}
        else{
			str = str.concat('│');
		}
		
		
	}
	 str = str.concat('\n');
   }	
	
    return str;
}


/**
 * Encode specified string with ROT13 cipher
 * See details:  https://en.wikipedia.org/wiki/ROT13
 *
 * @param {string} str
 * @return {string}
 *
 * @example
 *
 *   'hello' => 'uryyb'
 *   'Why did the chicken cross the road?' => 'Jul qvq gur puvpxra pebff gur ebnq?'
 *   'Gb trg gb gur bgure fvqr!' => 'To get to the other side!'
 *   'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz' => 'NOPQRSTUVWXYZABCDEFGHIJKLMnopqrstuvwxyzabcdefghijklm'
 *
 */
function encodeToRot13(str) { 
	var str2 = new String;
	for(var i = 0; i < str.length; i++){
		if(str.charAt(i) == ' ' || str.charAt(i) == '?' || str.charAt(i) == '!'){
		  str2 = str2.concat(str.charAt(i));
		  continue;
		}
		if(str.charAt(i) == str.charAt(i).toUpperCase()){
	  	  if(str.charAt(i) <= 'M' && str.charAt(i) >= 'A'){
			  str2 =  str2.concat(String.fromCharCode(str.charCodeAt(i)+13));
		  }
		  else{
			  if(str.charAt(i) <= 'Z' && str.charAt(i) > 'M'){
			  str2 =  str2.concat(String.fromCharCode(str.charCodeAt(i)-13));
			  }
		  }
		}
		else{
		   if(str.charAt(i) <= 'm' && str.charAt(i) >= 'a'){
			  str2 =  str2.concat(String.fromCharCode(str.charCodeAt(i)+ 13));
		   }
		   else{
			   if(str.charAt(i) > 'm' && str.charAt(i) <= 'z'){
			  str2 = str2.concat(String.fromCharCode(str.charCodeAt(i) - 13));
               }else{
				   str2 = str2.concat(str.charAt(i));
			   }			  
		   }
		}
	}

	return str2;
}

/**
 * Returns true if the value is string; otherwise false.
 * @param {string} value
 * @return {boolean}
 *
 * @example
 *   isString() => false
 *   isString(null) => false
 *   isString([]) => false
 *   isString({}) => false
 *   isString('test') => true
 *   isString(new String('test')) => true
 */
function isString(value) {
	return (typeof value === 'string') || (value instanceof String);
}


/**
 * Returns playid card id.
 * 
 * Playing cards inittial deck inclides the cards in the following order:
 * 
 *  'A♣','2♣','3♣','4♣','5♣','6♣','7♣','8♣','9♣','10♣','J♣','Q♣','K♣',
 *  'A♦','2♦','3♦','4♦','5♦','6♦','7♦','8♦','9♦','10♦','J♦','Q♦','K♦',
 *  'A♥','2♥','3♥','4♥','5♥','6♥','7♥','8♥','9♥','10♥','J♥','Q♥','K♥',
 *  'A♠','2♠','3♠','4♠','5♠','6♠','7♠','8♠','9♠','10♠','J♠','Q♠','K♠'
 * 
 * (see https://en.wikipedia.org/wiki/Standard_52-card_deck)
 * Function returns the zero-based index of specified card in the initial deck above.
 * 
 * @param {string} value
 * @return {number}
 *
 * @example
 *   'A♣' => 0
 *   '2♣' => 1 
 *   '3♣' => 2
 *     ...
 *   'Q♠' => 50
 *   'K♠' => 51
 */
function getCardId(value) {
   var val = 0;
   if (value.length == 2){
   switch (value.charAt(0)){
	   case 'A': val = 0;
		         break;
	   case '2': val = 1;
	             break;
	   case '3': val = 2;
	             break;
	   case '4': val = 3;
                 break;
	   case '5': val = 4;
	             break;
	   case '6': val = 5;
	             break;
	   case '7': val = 6;
	             break;
	   case '8': val = 7;
	             break;
	   case '9': val = 8;
	             break;
 	   case 'J': val = 10;
                 break;
	   case 'Q': val = 11;
	             break;
	   case 'K': val = 12;
	             break;
    }
     switch (value.charAt(1)){
	    case '♣': val += 0; break;
	    case '♦': val += (13*1); break;
	    case '♥': val += (13*2); break;
	    case '♠': val += (13*3); break;
     }
   }
   else{
	   val = 9;
	   switch (value.charAt(2)){
	   case '♣': val += 0; break;
	   case '♦': val += (13*1); break;
	   case '♥': val += (13*2); break;
	   case '♠': val += (13*3); break;
     }
    }
	
   return val;
}


module.exports = {
    concatenateStrings: concatenateStrings,
    getStringLength: getStringLength,
    getStringFromTemplate: getStringFromTemplate,
    extractNameFromTemplate: extractNameFromTemplate,
    getFirstChar: getFirstChar,
    removeLeadingAndTrailingWhitespaces: removeLeadingAndTrailingWhitespaces,
    repeatString: repeatString,
    removeFirstOccurrences: removeFirstOccurrences,
    unbracketTag: unbracketTag,
    convertToUpperCase: convertToUpperCase,
    extractEmails: extractEmails,
    getRectangleString: getRectangleString,
    encodeToRot13: encodeToRot13,
    isString: isString,
    getCardId: getCardId
};
