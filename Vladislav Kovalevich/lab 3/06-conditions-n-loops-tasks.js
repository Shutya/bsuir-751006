'use strict';

/**************************************************************************************************
 *                                                                                                *
 * Plese read the following tutorial before implementing tasks:                                   *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling  *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration              *
 *                                                                                                *
 **************************************************************************************************/


/**
 * Returns the 'Fizz','Buzz' or an original number using the following rules:
 * 1) return original number
 * 2) but if number multiples of three return 'Fizz'
 * 3) for the multiples of five return 'Buzz'
 * 4) for numbers which are multiples of both three and five return 'FizzBuzz'
 *
 * @param {number} num
 * @return {any}
 *
 * @example
 *   2 =>  2
 *   3 => 'Fizz'
 *   5 => 'Buzz'
 *   4 => 4
 *  15 => 'FizzBuzz'
 *  20 => 'Buzz'
 *  21 => 'Fizz'
 *
 */
function getFizzBuzz(num) {
	if(num % 3 == 0 && num % 5 == 0){
		return 'FizzBuzz';
	}
	else{
		if(num % 3 == 0){
			return 'Fizz';
		}else{
		   if(num % 5 == 0){
			  return 'Buzz';
		   }else{
			   return num;
		   }
		}
	}
}


/**
 * Returns the factorial of the specified integer n.
 *
 * @param {number} n
 * @return {number}
 *
 * @example:
 *   1  => 1
 *   5  => 120
 *   10 => 3628800
 */
function getFactorial(n) {
	var factorial = 1;
	if(n == 0 ){
		return 1;
	}else{
        for(var i = 1; i <= n; i++){
		   factorial *= i;
    	};	
	}
	return factorial;
}


/**
 * Returns the sum of integer numbers between n1 and n2 (inclusive).
 *
 * @param {number} n1
 * @param {number} n2
 * @return {number}
 *
 * @example:
 *   1,2   =>  3  ( = 1+2 )
 *   5,10  =>  45 ( = 5+6+7+8+9+10 )
 *   -1,1  =>  0  ( = -1 + 0 + 1 )
 */
function getSumBetweenNumbers(n1, n2) {
	var sum = 0;
    for(var i = n1; i <= n2; i++){
		sum += i;
    };	
	return sum;
}


/**
 * Returns true, if a triangle can be built with the specified sides a,b,c and false in any other ways.
 *
 * @param {number} a
 * @param {number} b
 * @param {number} c
 * @return {bool}
 *
 * @example:
 *   1,2,3    =>  false
 *   3,4,5    =>  true
 *   10,1,1   =>  false
 *   10,10,10 =>  true
 */
function isTriangle(a,b,c) {
    if(a + b > c && a + c > b && b + c > a){
		return true;
	}else{
		return false;
	}
}


/**
 * Returns true, if two specified axis-aligned rectangles overlap, otherwise false.
 * Each rectangle representing by object 
 *  {
 *     top: 5,
 *     left: 5,
 *     width: 20,
 *     height: 10
 *  }
 * 
 *  (5;5)
 *     -------------  
 *     |           | 
 *     |           |  height = 10
 *     ------------- 
 *        width=20    
 * 
 * NOTE: Please use canvas coordinate space (https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes#The_grid),
 * it differs from Cartesian coordinate system.
 * 
 * @param {object} rect1
 * @param {object} rect2
 * @return {bool}
 *
 * @example:
 *   { top: 0, left: 0, width: 10, height: 10 },
 *   { top: 5, left: 5, width: 20, height: 20 }    =>  true
 * 
 *   { top: 0, left: 0, width: 10, height: 10 },
 *   { top:20, left:20, width: 20, height: 20 }    =>  false
 *  
 */
function doRectanglesOverlap(rect1, rect2) {
    throw new Error('Not implemented');
}


/**
 * Returns true, if point lies inside the circle, otherwise false.
 * Circle is an object of 
 *  {
 *     center: {
 *       x: 5,       
 *       y: 5
 *     },        
 *     radius: 20
 *  }
 * 
 * Point is object of 
 *  {
 *     x: 5,
 *     y: 5
 *  }
 * 
 * @param {object} circle
 * @param {object} point
 * @return {bool}
 *
 * @example:
 *   { center: { x:0, y:0 }, radius:10 },  { x:0, y:0 }     => true
 *   { center: { x:0, y:0 }, radius:10 },  { x:10, y:10 }   => false
 *   
 */
function isInsideCircle(circle, point) {
    throw new Error('Not implemented');
}


/**
 * Returns the first non repeated char in the specified strings otherwise returns null.
 *
 * @param {string} str
 * @return {string}
 *
 * @example:
 *   'The quick brown fox jumps over the lazy dog' => 'T'
 *   'abracadabra'  => 'c'
 *   'entente' => null
 */
function findFirstSingleChar(str) {
	for(var i = 0; i< str.length; i++){
		if(str.indexOf(str.charAt(i)) == str.lastIndexOf(str.charAt(i))){
			return str.charAt(i);
		}
	}
	return null;
}


/**
 * Returns the string representation of math interval, specified by two points and include / exclude flags.
 * See the details: https://en.wikipedia.org/wiki/Interval_(mathematics)
 *
 * Please take attention, that the smaller number should be the first in the notation
 *
 * @param {number} a
 * @param {number} b
 * @param {bool} isStartIncluded
 * @param {bool} isEndIncluded
 * @return {string}
 *
 * @example
 *   0, 1, true, true   => '[0, 1]'
 *   0, 1, true, false  => '[0, 1)'
 *   0, 1, false, true  => '(0, 1]'
 *   0, 1, false, false => '(0, 1)'
 * Smaller number has to be first :
 *   5, 3, true, true   => '[3, 5]'
 *
 */
function getIntervalString(a, b, isStartIncluded, isEndIncluded) {
    var str = new String;
	if(a > b){
		var c = a;
		a = b;
		b = c;
	}
	
	if(isStartIncluded){
		str = str.concat('[', a, ', ', b);
	}else{
		str = str.concat('(', a, ', ', b);
	}
	
	if(isEndIncluded){
		str = str.concat(']');
	}else{
		str = str.concat(')');
	}
	
	return str;
}


/**
 * Reverse the specified string (put all chars in reverse order)
 *
 * @param {string} str
 * @return {string}
 *
 * @example:
 * 'The quick brown fox jumps over the lazy dog' => 'god yzal eht revo spmuj xof nworb kciuq ehT'
 * 'abracadabra' => 'arbadacarba'
 * 'rotator' => 'rotator'
 * 'noon' => 'noon'
 */
function reverseString(str) {
	var str2 = new String();
    for(var i = 0; i < str.length; i++){
	    str2 = str2.concat(str.charAt(str.length - i - 1));		
	}
	return str2;
}


/**
 * Reverse the specified integer number (put all digits in reverse order)
 *
 * @param {number} num
 * @return {number}
 *
 * @example:
 *   12345 => 54321
 *   1111  => 1111
 *   87354 => 45378
 *   34143 => 34143
 */
function reverseInteger(num) {
    var str = String(num);
	var str2 = new String();
	for(var i = 0; i < str.length; i++){
	    str2 = str2.concat(str.charAt(str.length - i - 1));		
	}
	return Number(str2);
}


/**
 * Validates the CCN (credit card number) and return true if CCN is valid
 * and false otherwise.
 *
 * See algorithm here : https://en.wikipedia.org/wiki/Luhn_algorithm
 *
 * @param {number} cnn
 * @return {boolean}
 *
 * @example:
 *   79927398713      => true
 *   4012888888881881 => true
 *   5123456789012346 => true
 *   378282246310005  => true
 *   371449635398431  => true
 *
 *   4571234567890111 => false
 *   5436468789016589 => false
 *   4916123456789012 => false
 */
function isCreditCardNumber(ccn) {
	var str = String(ccn);
	var str2 = String();
	var sum = 0;
	var val = 0;
	var count = 0;
	
//	str2 = str.split("").reverse().join("");
	str2 = str;
	//console.log(str2);
	var flag = false;
	
	if(str.length % 2 == 0){
		flag = true
	}
	
	//console.log(flag);
	
	
	if(flag){ 
	  //return true;
     for(var i = 0; i< str2.length; i++){
	  	 val = Number(str2.charAt(i));
		 if(i == 0 || i % 2 == 0){
		   val = val * 2;
		   if(val > 9){
              val = val - 9;
	 	   }
		 }
		// console.log(val);
		 sum +=val;
	   } 
	}else{
		//return false;
	  for(var i = 0; i< str2.length; i++){
	  	val = Number(str2.charAt(i));
		if(i == 1 || i % 2 != 0){
		  val = val * 2;
		  if(val > 9){
             val = val - 9;
	    	}
		}
		// console.log(val);
		 sum +=val;
	   } 
	  // console.log(sum);
	}
	
	return sum % 10 === 0;
}


/**
 * Returns the digital root of integer:
 *   step1 : find sum of all digits
 *   step2 : if sum > 9 then goto step1 otherwise return the sum
 *
 * @param {number} n
 * @return {number}
 *
 * @example:
 *   12345 ( 1+2+3+4+5 = 15, 1+5 = 6) => 6
 *   23456 ( 2+3+4+5+6 = 20, 2+0 = 2) => 2
 *   10000 ( 1+0+0+0+0 = 1 ) => 1
 *   165536 (1+6+5+5+3+6 = 26,  2+6 = 8) => 8
 */
function getDigitalRoot(num) {
	var str = String(num);
	var sum = 0;
    for(var i = 0; i< str.length; i++){
		var val = Number(str.charAt(i));
		sum +=val;
	}
	
	var str2 = String(sum);
	var sum2 = 0;

	for(var i = 0; i< str2.length; i++){
		var val = Number(str2.charAt(i));
		sum2 +=val;
	}
	return sum2;
}


/**
 * Returns true if the specified string has the balanced brackets and false otherwise.
 * Balanced means that is, whether it consists entirely of pairs of opening/closing brackets
 * (in that order), none of which mis-nest.
 * Brackets include [],(),{},<>
 *
 * @param {string} str
 * @return {boolean}
 *
 * @example:
 *   '' => true
 *   '[]'  => true
 *   '{}'  => true
 *   '()   => true
 *   '[[]' => false
 *   ']['  => false
 *   '[[][][[]]]' => true
 *   '[[][]][' => false
 *   '{)' = false
 *   '{[(<{[]}>)]}' = true 
 */
function isBracketsBalanced(str) {
	var str2 = str;
	var flag = true;
	var i;
	
	var ar1 = ['[', '{', '(', '<'];
	var ar2 = [']', '}', ')', '>'];
	
	while (flag) {
		flag = false;
		
		for (i = 0; i < str2.length; i++) {
			if (ar2.includes(str2.charAt(i))) {
				var ch1 = ar1[ar2.indexOf(str2.charAt(i))];
				var pos = str2.lastIndexOf(ch1, i);
				
				if (pos >= 0) {
				    var str3 = "";
					
					var str4 = "";
					if (i >= (pos + 1)) {
						str4 = str2.substring(pos + 1, i);
					}
					
					var fl = false;
					if (str4.length > 0) {
						fl = ar1.some(function(elem, index) {
							return (str4.indexOf(elem) >= 0);
						});
					}
					
					if (pos >= 0) {
						str3 = str3 + str2.substring(0, pos);
					}
					str3 = str3 + str4;
				    if ((str2.length) >= (i + 1)) {
						str3 = str3 + str2.substring(i + 1);
					}

				    i = str2.length + 2;
					if (!fl) {
			            str2 = str3;
				        flag = true;
					}
				}
			}
		}
	}
	
	if (str2.length == 0) {
		return true;
	} else {
		return false;
	}
}


/**
 * Returns the human readable string of time period specified by the start and end time.
 * The result string should be constrcuted using the folliwing rules:
 *
 * ---------------------------------------------------------------------
 *   Difference                 |  Result
 * ---------------------------------------------------------------------
 *    0 to 45 seconds           |  a few seconds ago
 *   45 to 90 seconds           |  a minute ago
 *   90 seconds to 45 minutes   |  2 minutes ago ... 45 minutes ago
 *   45 to 90 minutes           |  an hour ago
 *  90 minutes to 22 hours      |  2 hours ago ... 22 hours ago
 *  22 to 36 hours              |  a day ago
 *  36 hours to 25 days         |  2 days ago ... 25 days ago
 *  25 to 45 days               |  a month ago
 *  45 to 345 days              |  2 months ago ... 11 months ago
 *  345 to 545 days (1.5 years) |  a year ago
 *  546 days+                   |  2 years ago ... 20 years ago
 * ---------------------------------------------------------------------
 *
 * @param {Date} startDate
 * @param {Date} endDate
 * @return {string}
 *
 * @example
 *   Date('2000-01-01 01:00:00.100'), Date('2000-01-01 01:00:00.200')  => 'a few seconds ago'
 *   Date('2000-01-01 01:00:00.100'), Date('2000-01-01 01:00:05.000')  => '5 minutes ago'
 *   Date('2000-01-01 01:00:00.100'), Date('2000-01-02 03:00:05.000')  => 'a day ago'
 *   Date('2000-01-01 01:00:00.100'), Date('2015-01-02 03:00:05.000')  => '15 years ago'
 *
 */
function timespanToHumanString(startDate, endDate) {
   /* var str = new String();
	//var m = endDate.getMinutes() - startDate.getMinutes();
	var d = (endDate - startDate);
	
	
	console.log(d);
	
	if(d/1000 <= 45){
		return "a few seconds ago";
	}
	
	if(d/1000 <= 90){
		return "a minute ago";
	}
	
	if(d<= 45*1000*60){
		//var m = (endDate.getUTCMinutes - startDate.getUTCMinutes);
		
		console.log(d/1000/60);
		return  Math.round(d/1000/60) + " minutes ago";
	}*/
	
	//return str;
	throw new Error('Not implemented');
}


/**
 * Returns the string with n-ary (binary, ternary, etc, where n<=10) representation of specified number.
 * See more about
 * https://en.wikipedia.org/wiki/Binary_number
 * https://en.wikipedia.org/wiki/Ternary_numeral_system
 * https://en.wikipedia.org/wiki/Radix
 *
 * @param {number} num
 * @param {number} n, radix of the result
 * @return {string}
 *
 * @example:
 *   1024, 2  => '10000000000'
 *   6561, 3  => '100000000'
 *    365, 2  => '101101101'
 *    365, 3  => '111112'
 *    365, 4  => '11231'
 *    365, 10 => '365'
 */
function toNaryString(num, n) {
	var s = new String();
	while(num > 0){
		s = String(s) + String(num%n);
		num = Math.floor(num/n);
	}
	return s.split("").reverse().join("");
}


/**
 * Returns the commom directory path for specified array of full filenames.
 *
 * @param {array} pathes
 * @return {string}
 *
 * @example:
 *   ['/web/images/image1.png', '/web/images/image2.png']  => '/web/images/'
 *   ['/web/assets/style.css', '/web/scripts/app.js',  'home/setting.conf'] => ''
 *   ['/web/assets/style.css', '/.bin/mocha',  '/read.me'] => '/'
 *   ['/web/favicon.ico', '/web-scripts/dump', '/webalizer/logs'] => '/'
 */
function getCommonDirectoryPath(pathes) {
	var arr = new Array();
	var arr1 = new Array();
	var strres = new String();
	
	var min = 20000;
	
	for(var i = 0; i < pathes.length; i++){
		arr = pathes[i].split("/");
		arr1[i] = arr;
		if(arr.length < min){
			min = arr.length;
		}
	}
	
	for(var i = 0; i < min; i++){
	    var flag = true;
		var str = arr1[0][i];
		for(var j = 1; j < arr1.length; j++){
			if(arr1[j][i] != str){
				flag = false;
			}
		}
		if(flag == true){
			strres += str + '/';
		}
	}
	
	return strres;
}


/**
 * Returns the product of two specified matrixes.
 * See details: https://en.wikipedia.org/wiki/Matrix_multiplication
 *
 * @param {array} m1
 * @param {array} m2
 * @return {array}
 *
 * @example:
 *   [[ 1, 0, 0 ],       [[ 1, 2, 3 ],           [[ 1, 2, 3 ],
 *    [ 0, 1, 0 ],   X    [ 4, 5, 6 ],     =>     [ 4, 5, 6 ],
 *    [ 0, 0, 1 ]]        [ 7, 8, 9 ]]            [ 7, 8, 9 ]]
 *
 *                        [[ 4 ],
 *   [[ 1, 2, 3]]    X     [ 5 ],          =>     [[ 32 ]]
 *                         [ 6 ]]
 *
 */
function getMatrixProduct(m1, m2) {
   var m3 = new Array();
   var i = 0;
   var s = 0;
   
   for(var i = 0; i < m1.length; i++){
	   m3[i] = [];
   }
  
   for(var s = 0; s< m2[0].length; s++){
      for(var i = 0; i < m1.length; i++){   
	     var Sum = 0;
	     for(var j = 0; j < m2.length; j++){
		     Sum+=m1[i][j] * m2[j][s];
	     }
	     m3[i][s] = Sum;
	  }
   }
   return m3;
}


/**
 * Returns the evaluation of the specified tic-tac-toe position.
 * See the details: https://en.wikipedia.org/wiki/Tic-tac-toe
 *
 * Position is provides as 3x3 array with the following values: 'X','0', undefined
 * Function should return who is winner in the current position according to the game rules.
 * The result can be: 'X','0',undefined
 *
 * @param {array} position
 * @return {string}
 *
 * @example
 *
 *   [[ 'X',   ,'0' ],
 *    [    ,'X','0' ],       =>  'X'
 *    [    ,   ,'X' ]]
 *
 *   [[ '0','0','0' ],
 *    [    ,'X',    ],       =>  '0'
 *    [ 'X',   ,'X' ]]
 *
 *   [[ '0','X','0' ],
 *    [    ,'X',    ],       =>  undefined
 *    [ 'X','0','X' ]]
 *
 *   [[    ,   ,    ],
 *    [    ,   ,    ],       =>  undefined
 *    [    ,   ,    ]]
 *
 */
function evaluateTicTacToePosition(position) {
	for(var s = 0; s < position.length; s++){
      for(var i = 0; i < position.length; i++){
		  var count = 0;
		  for(var j = 0; j < position[i].length; j++){
			  if(position[i][j] == position[s][0] && position[s][0] != ' '){
				  count ++; 
			  } 
		  }
		  if(count == 3){
			//  console.log(1);
			  return position[s][0];
		  }
		  
	  }
	}
	
	for(var s = 0; s < position.length; s++){
      for(var i = 0; i < position.length; i++){
		  var count = 0;
		  for(var j = 0; j < position[i].length; j++){
			  if(position[j][i] == position[0][s] && position[s][0] != ' '){
				  count ++; 
			  } 
		  }
		  if(count == 3){
            //  console.log(2);
			  return position[0][s];
		  }
		  
	  }
	}
	
	var str = new String(position[0][0]);
	var count = 0;
	for(var s = 0; s < position.length; s++){
      for(var i = 0; i < position.length; i++){
		if(i == s && str == position[s][i] && position[s][i] != ' '){
			count++;
		}		  
	  }
	}
	
	if(count == 3){
		//console.log(3);
	  return position[0][0];
	}
	
	var str = new String(position[0][position.length - 1]);
	var count = 0;
	for(var s = 0; s < position.length; s++){
      for(var i = 0; i < position.length; i++){
		if(i + s == 2 && str == position[s][i] && position[s][i] != ' '){
			count++;
		}		  
	  }
	}
	
	if(count == 3){
		//console.log(4);
	  return position[0][position.length - 1];
	}
	
	var str = new String('undefined');
	return undefined;
	
}


module.exports = {
    getFizzBuzz: getFizzBuzz,
    getFactorial: getFactorial,
    getSumBetweenNumbers: getSumBetweenNumbers,
    isTriangle: isTriangle,
    doRectanglesOverlap: doRectanglesOverlap,
    isInsideCircle: isInsideCircle,
    findFirstSingleChar: findFirstSingleChar,
    getIntervalString : getIntervalString,
    reverseString: reverseString,
    reverseInteger: reverseInteger,
    isCreditCardNumber: isCreditCardNumber,
    getDigitalRoot: getDigitalRoot,
    isBracketsBalanced: isBracketsBalanced,
    timespanToHumanString : timespanToHumanString,
    toNaryString: toNaryString,
    getCommonDirectoryPath: getCommonDirectoryPath,
    getMatrixProduct: getMatrixProduct,
    evaluateTicTacToePosition : evaluateTicTacToePosition
};
