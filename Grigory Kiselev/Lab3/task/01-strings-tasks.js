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
    return value1 + value2;
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
    return "Hello, " + firstName + " " + lastName + "!" ;
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
	var buf;
	buf = value.substr(7);
	buf = buf.substr(0, buf.length-1);
    return buf;
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
    return value.charAt(0);
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
    return value.trim();
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
	var result = "";
	for( var i = 0; i < count; i++)
	{
		result = result + value;
	}
	return result;
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
    return str.replace(value, "");
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
    return str.slice(1, -1);
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
	var gmails = [];
	var i = 0;
    while (str.indexOf(";") != -1)
	{
		gmails[i] = str.substr(0, str.indexOf(";"));
		str = str.slice(str.indexOf(";") + 1);
		i++;
	};
	gmails[i] = str;
	return gmails;
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
	var result = "";
	var i = 0;
    for(i = 0; i < height; i++)
	{
		for(var j = 0; j < width; j++)
		{
			if( (i == 0) && (j == 0))
			{
				result = result + "┌";
			}
			if( (i == 0) && (j == width-1))
			{
				result = result + "┐";
			}
			if( (i == height-1) && (j == 0))
			{
				result = result + "└";
			}
			if( (i == height-1) && (j == width-1))
			{
				result = result + "┘";
			}
			if( (i == 0) && (j != 0) && (j != width-1))
			{
				result = result + "─";
			}
			if( (i == height-1) && (j != 0) && (j != width-1))
			{
				result = result + "─";
			}
			if( (i != 0) && (i != height-1) && (j == width-1))
			{
				result = result + "│";
			}
			if( (i != 0) && (i != height-1) && (j == 0))
			{
				result = result + "│";
			}
			if( (i != 0) && (i != height-1) && (j != 0) && (j != width-1))
			{
				result = result + " ";
			}
		}
		result = result + "\n";
	};
	return result;
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
	var i = 0;
	var result = "";
	var buf = "";
    for( i = 0; i < str.length; i++)
	{
		if((str.charCodeAt(i) > 96) && (str.charCodeAt(i) < 123))
		{	
			if(str.charCodeAt(i) + 13 >= 123)
			{
				result = result + String.fromCharCode(str.charCodeAt(i) - 13);
			}
			else
			{
				result = result + String.fromCharCode(str.charCodeAt(i) + 13);
			}
		}
		else
		{
			if((str.charCodeAt(i) > 64) && (str.charCodeAt(i) < 91))
			{	
				if(str.charCodeAt(i) + 13 >= 91)
				{
					result = result + String.fromCharCode(str.charCodeAt(i) - 13);
				}
				else
				{
					result = result + String.fromCharCode(str.charCodeAt(i) + 13);
				}
			} 
			else
			{
				result = result + str.charAt(i);
			}
		}
		
	};
	return result;
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
	if (typeof value == "string" || value instanceof String)
	{
		return true;
	}
	else
	{
		return false;
	}
}


/**
 * Returns playid card id.
 * 
 * Playing cards inittial deck inclides the cards in the following order:
 * 
 *  'A♣','2♣','3♣','4♣','5♣','6♣','7♣','8♣','9♣','10♣','J♣','Q♣','K♣', 9827
 *  'A♦','2♦','3♦','4♦','5♦','6♦','7♦','8♦','9♦','10♦','J♦','Q♦','K♦', 9830
 *  'A♥','2♥','3♥','4♥','5♥','6♥','7♥','8♥','9♥','10♥','J♥','Q♥','K♥', 9829
 *  'A♠','2♠','3♠','4♠','5♠','6♠','7♠','8♠','9♠','10♠','J♠','Q♠','K♠'  9824
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
	var result = 0;
    var mast = ["♣", "♦", "♥", "♠"];
	function getMastNumber(symb){
		for ( var i = 0; i < 4; i++)
		{
			if(symb == mast[i])
			{
				return i;
			}
		}
	}
	
	function getValueNumber(symb){
		switch(symb){
			case "A" : return 0; break;
			case "J" : return 10; break;
			case "Q" : return 11; break;
			case "K" : return 12; break;
			default : return Number(symb) - 1;
		}
	}
	
	if (value.length == 3)
	{	
		switch(value){
			case "10♣" : result = 9; break;
			case "10♦" : result = 22; break;
			case "10♥" : result = 35; break;
			case "10♠" : result = 48; break;
			default : return Number(symb) - 1;
		}
	}
	else
	{
		result = getMastNumber(value.charAt(1)) * 13 + getValueNumber(value.charAt(0));
	}
	
	return result;
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
