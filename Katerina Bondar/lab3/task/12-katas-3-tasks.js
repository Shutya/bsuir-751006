'use strict';

/**
 * Возвращает true если слово попадается в заданной головоломке.
 * Каждое слово может быть построено при помощи прохода "змейкой" по таблице вверх, влево, вправо,
 *  вниз.
 * Каждый символ может быть использован только один раз ("змейка" не может пересекать себя).
 *
 * @param {array} puzzle
 * @param {array} searchStr
 * @return {bool}
 *
 * @example
 *   var puzzle = [ 
 *      'ANGULAR',
 *      'REDNCAE',
 *      'RFIDTCL',
 *      'AGNEGSA',
 *      'YTIRTSP',
 *   ]; 
 *   'ANGULAR'   => true   (первая строка)
 *   'REACT'     => true   (начиная с верхней правой R и дальше ↓ ← ← ↓)
 *   'UNDEFINED' => true
 *   'RED'       => true
 *   'STRING'    => true
 *   'CLASS'     => true
 *   'ARRAY'     => true   (первая колонка)
 *   'FUNCTION'  => false
 *   'NULL'      => false 
 */
function findStringInSnakingPuzzle(puzzle, searchStr) {

    class RouteMap {
        constructor() {
            this._route = {};
            this._width = puzzle[0].length;
            this._height = puzzle.length;
        }

        _key(x, y) {
            return `${x},${y}`;
        }

        markAvailable(x, y) {
            this._route[this._key(x, y)] = false;
        }

        markVisited(x, y) {
            this._route[this._key(x, y)] = true;
        }

        isAvailable(x, y) {
            return x >= 0
                && x < this._width
                && y >= 0
                && y < this._height
                && !this._route[this._key(x, y)];
        }
    }

    function* getSiblings(x, y) {
        yield [x - 1, y];
        yield [x + 1, y];
        yield [x, y - 1];
        yield [x, y + 1];
    }

    function checkRoute(x, y, search, route) {
        if (!route.isAvailable(x, y) || puzzle[y][x] !== search[0]) {
            return false;
        }
        if (search.length === 1) {
            return true;
        }
        route.markVisited(x, y);
        const nextSearch = search.slice(1);

        for (let [sx, sy] of getSiblings(x, y)) {
            if (checkRoute(sx, sy, nextSearch, route)) {
                return true;
            }
        }

        route.markAvailable(x, y);
        return false;
    }

    for (let y = 0; y < puzzle.length; ++y) {
        for (let x = 0; x < puzzle[0].length; ++x) {
            if (checkRoute(x, y, searchStr, new RouteMap())) {
                return true;
            }
        }
    }
    return false;
}


/**
 * Возвращает все перестановки заданной строки.
 * Принимаем, что все символы в заданной строке уникальные.
 * Порядок перестановок не имеет значения.
 *
 * @param {string} chars
 * @return {Iterable.<string>} все возможные строки, построенные из символов заданной строки
 *
 * @example
 *    'ab'  => 'ab','ba'
 *    'abc' => 'abc','acb','bac','bca','cab','cba'
 */
function Perm(str) {
    let ret = [];

    if (str.length == 1) return [str];
    if (str.length == 2) return str != str[1] + str[0] ? [str, str[1] + str[0]] : [str];

    str.split('').forEach(function (chr, idx, arr) {
        let sub = [...arr];
        sub.splice(idx, 1);
        Perm(sub.join('')).forEach(function (perm) {
            ret.push(chr + perm);
        });
    });

    return ret.filter((elem, pos, arr) => {
        return arr.indexOf(elem) == pos;
    });
}
function* getPermutations(chars) {
    let ret = Perm(chars);
    for (let i = 0; i < ret.length; i++) {
        yield ret[i];
    }
}



/**
 * Возвращает наибольшую прибыль от игры на котировках акций.
 * Цены на акции храняться в массиве в порядке увеличения даты.
 * Прибыль -- это разница между покупкой и продажей.
 * Каждый день вы можете либо купить одну акцию, либо продать любое количество акций, купленных до этого, либо ничего не делать.
 * Таким образом, максимальная прибыль -- это максимальная разница всех пар в последовательности цен на акции.
 *
 * @param {array} quotes
 * @return {number} max profit
 *
 * @example
 *    [ 1, 2, 3, 4, 5, 6]   => 15  (купить по 1,2,3,4,5 и затем продать все по 6)
 *    [ 6, 5, 4, 3, 2, 1]   => 0   (ничего не покупать)
 *    [ 1, 6, 5, 10, 8, 7 ] => 18  (купить по 1,6,5 и затем продать все по 10)
 */
function getMostProfitFromStockQuotes(quotes) {
    if (!quotes.length) return 0;
    let maxNum = Math.max.apply(null, quotes);
    let indMax = quotes.lastIndexOf(maxNum);
    return quotes.slice(0, indMax).reduce((prev, curr) => prev += maxNum - curr, 0) +
        getMostProfitFromStockQuotes(quotes.slice(indMax + 1));
}


/**
 * Класс, предосатвляющий метод по сокращению url.
 * Реализуйте любой алгоритм, но не храните ссылки в хранилище пар ключ\значение.
 * Укороченные ссылки должны быть как минимум в 1.5 раза короче исходных.
 *
 * @class
 *
 * @example
 *    
 *     var urlShortener = new UrlShortener();
 *     var shortLink = urlShortener.encode('https://en.wikipedia.org/wiki/URL_shortening');
 *     var original  = urlShortener.decode(shortLink); // => 'https://en.wikipedia.org/wiki/URL_shortening'
 * 
 */
function UrlShortener() {
    this.urlAllowedChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
        "abcdefghijklmnopqrstuvwxyz" +
        "0123456789-_.~!*'();:@&=+$,/?#[]";
}

UrlShortener.prototype = {

    encode: function (url) {
        var res = '';
        for (let i = 0; i * 2 < url.length; i++) {
            res += String.fromCodePoint(url.codePointAt(2 * i) * 256 + (url.codePointAt(2 * i + 1) || 0))
        }
        return res;
    },

    decode: function (code) {
        var res = '';
        for (let i = 0; i < code.length; i++) {
            let c = code.codePointAt(i);
            res += String.fromCodePoint(c / 256 | 0) + (c % 256 ? String.fromCodePoint(c % 256) : '');
        }
        return res;
    }
}


module.exports = {
    findStringInSnakingPuzzle: findStringInSnakingPuzzle,
    getPermutations: getPermutations,
    getMostProfitFromStockQuotes: getMostProfitFromStockQuotes,
    UrlShortener: UrlShortener
};
