'use strict';

/**
 * Возвращает массив из 32 делений катушки компаса с названиями.
 * Смотрите детали здесь:
 * https://en.wikipedia.org/wiki/Points_of_the_compass#32_cardinal_points
 *
 * @return {array}
 *
 * Пример возвращаемого значения :
 *  [
 *     { abbreviation : 'N',     azimuth : 0.00 ,
 *     { abbreviation : 'NbE',   azimuth : 11.25 },
 *     { abbreviation : 'NNE',   azimuth : 22.50 },
 *       ...
 *     { abbreviation : 'NbW',   azimuth : 348.75 }
 *  ]
 */
function createCompassPoints() {
}

/**
 * Раскройте фигурные скобки указанной строки.
 * Смотрите https://en.wikipedia.org/wiki/Bash_(Unix_shell)#Brace_expansion
 *
 * Во входной строке пары фигурных скобок, содержащие разделенные запятыми подстроки,
 * представляют наборы подстрок, которые могут появиться в этой позиции на выходе.
 *
 * @param {string} str
 * @return {Iterable.<string>}
 *
 * К СВЕДЕНИЮ: Порядок выходных строк не имеет значения.
 *
 * Пример:
 * 
 *   '~/{Downloads,Pictures}/*.{jpg,gif,png}'  => '~/Downloads/*.jpg',
 *                                                '~/Downloads/*.gif'
 *                                                '~/Downloads/*.png',
 *                                                '~/Pictures/*.jpg',
 *                                                '~/Pictures/*.gif',
 *                                                '~/Pictures/*.png'
 *
 *   'It{{em,alic}iz,erat}e{d,}, please.'  => 'Itemized, please.',
 *                                            'Itemize, please.',
 *                                            'Italicized, please.',
 *                                            'Italicize, please.',
 *                                            'Iterated, please.',
 *                                            'Iterate, please.'
 *
 *   'thumbnail.{png,jp{e,}g}'  => 'thumbnail.png'
 *                                 'thumbnail.jpeg'
 *                                 'thumbnail.jpg'
 *
 *   'nothing to do' => 'nothing to do'
 */
function* expandBraces(str) {
    const OPEN_BR = '{';
    const CLOSE_BR = '}';
    const SEPARATOR = ',';

    yield* parse(str);

    function parse(str) {
        let items = [''];
        let pos = 0;
        while (str[pos]) {
            if (str[pos] !== OPEN_BR) {
                items = combine(items, [readUntil([OPEN_BR])]);
            } else {
                pos += 1;
                items = combine(items, parseExpr());
            }
        }
        return items;

        function parseExpr() {
            let items = [];
            let sepCount = 0;
            while (str[pos] !== CLOSE_BR) {
                if (str[pos] === SEPARATOR) {
                    pos += 1;
                    sepCount += 1;
                } else {
                    items = items.concat(parseExprPart());
                }
            }
            if (items.length < sepCount + 1) items.push('');
            pos += 1;
            return items;
        }

        function parseExprPart() {
            let items = [''];
            while (str[pos] !== SEPARATOR && str[pos] !== CLOSE_BR) {
                if (str[pos] !== OPEN_BR) {
                    items = combine(items, [readUntil([SEPARATOR, OPEN_BR, CLOSE_BR])]);
                } else {
                    pos += 1;
                    items = combine(items, parseExpr());
                }
            }
            return items;
        }

        function combine(leftItems, rightItems) {
            const res = [];
            for (let left of leftItems)
                for (let right of rightItems)
                    res.push(left + right);
            return res;
        }

        function readUntil(chars) {
            let res = '';
            while (str[pos] && chars.every(x => x !== str[pos])) {
                res += str[pos];
                pos += 1;
            }
            return res;
        }
    }
}


/**
 * Возвращает ZigZag матрицу
 *
 * Основная идея в алгоритме сжатия JPEG -- отсортировать коэффициенты заданного изображения зигзагом и закодировать их.
 * В этом задании вам нужно реализовать простой метод для создания квадратной ZigZag матрицы.
 * Детали смотрите здесь: https://en.wikipedia.org/wiki/JPEG#Entropy_coding
 * https://ru.wikipedia.org/wiki/JPEG
 * Отсортированные зигзагом элементы расположаться так: https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/JPEG_ZigZag.svg/220px-JPEG_ZigZag.svg.png
 *
 * @param {number} n - размер матрицы
 * @return {array}  массив размером n x n с зигзагообразным путем
 *
 * @example
 *   1  => [[0]]
 *
 *   2  => [[ 0, 1 ],
 *          [ 2, 3 ]]
 *
 *         [[ 0, 1, 5 ],
 *   3  =>  [ 2, 4, 6 ],
 *          [ 3, 7, 8 ]]
 *
 *         [[ 0, 1, 5, 6 ],
 *   4 =>   [ 2, 4, 7,12 ],
 *          [ 3, 8,11,13 ],
 *          [ 9,10,14,15 ]]
 *
 */
function getZigZagMatrix(n) {
    let height = n;
    let width = n;

    let mtx = [];
    for (var i = 0; i < n; i++)
        mtx[i] = [];

    var i = 1, j = 1;
    for (var e = 0; e < n * n; e++) {
        mtx[i - 1][j - 1] = e;
        if ((i + j) % 2 == 0) {
            if (j < n) j++;
            else i += 2;
            if (i > 1) i--;
        } else {
            if (i < n) i++;
            else j += 2;
            if (j > 1) j--;
        }
    }
    return mtx;
}


/**
 * Возвращает true если заданный набор костяшек домино может быть расположен в ряд по правилам игры.
 * Детали игры домино смотрите тут: https://en.wikipedia.org/wiki/Dominoes
 * https://ru.wikipedia.org/wiki/%D0%94%D0%BE%D0%BC%D0%B8%D0%BD%D0%BE
 * Каждая костяшка представлена как массив [x,y] из значений на ней.
 * Например, набор [1, 1], [2, 2], [1, 2] может быть расположен в ряд ([1, 1] -> [1, 2] -> [2, 2]),
 * тогда как набор [1, 1], [0, 3], [1, 4] не может.
 * К СВЕДЕНИЮ: в домино любая пара [i, j] может быть перевернута и представлена как [j, i].
 *
 * @params {array} dominoes
 * @return {bool}
 *
 * @example
 *
 * [[0,1],  [1,1]] => true
 * [[1,1], [2,2], [1,5], [5,6], [6,3]] => false
 * [[1,3], [2,3], [1,4], [2,4], [1,5], [2,5]]  => true
 * [[0,0], [0,1], [1,1], [0,2], [1,2], [2,2], [0,3], [1,3], [2,3], [3,3]] => false
 *
 */
function canDominoesMakeRow(dominoes) {
    let res = "" + dominoes.shift();
    let i = 0;
    while (dominoes.length != 0) {
        if (dominoes[i][0] == res[0]) {
            res = dominoes[i].reverse() + res;
            dominoes.splice(i, 1);
            i = 0;
            continue;
        }
        if (dominoes[i][1] == res[0]) {
            res = dominoes[i] + res;
            dominoes.splice(i, 1);
            i = 0;
            continue;
        }
        if (dominoes[i][0] == res[res.length - 1]) {
            res = res + dominoes[i];
            dominoes.splice(i, 1);
            i = 0;
            continue;
        }
        if (dominoes[i][1] == res[res.length - 1]) {
            res = res + dominoes[i].reverse();
            dominoes.splice(i, 1);
            i = 0;
            continue;
        }
        i++;
        if (i == dominoes.length)
            return false;
    }
    return true;
}


/**
 * Возвращает строковое представление заданного упорядоченного списка целых чисел.
 *
 * Строковое представление списка целых чисел будет состоять из элементов, разделенных запятыми. Элементами могут быть:
 *   - отдельное целое число
 *   - или диапазон целых чисел, заданный начальным числом, отделенным от конечного числа черточкой('-').
 *     (Диапазон включает все целые числа в интервале, включая начальное и конечное число)
 *     Синтаксис диапазона должен быть использован для любого диапазона, где больше двух чисел.
 *
 * @params {array} nums
 * @return {bool}
 *
 * @example
 *
 * [ 0, 1, 2, 3, 4, 5 ]   => '0-5'
 * [ 1, 4, 5 ]            => '1,4,5'
 * [ 0, 1, 2, 5, 7, 8, 9] => '0-2,5,7-9'
 * [ 1, 2, 4, 5]          => '1,2,4,5'
 */
function extractRanges(nums) {
    let res = "";
    for (let j = 0; j < nums.length; j++) {
        let i = 0;
        if ((nums[j + 1] - nums[j] == 1) && (nums[j + 2] - nums[j] == 2)) {
            while (nums[j + 1] - nums[j] == 1) {
                i++;
                j++;
            }
            res += `${nums[j - i]}-${nums[j]},`;

        } else
            res += nums[j] + ",";
    }
    return res.slice(0, res.length - 1);
}
module.exports = {
    createCompassPoints: createCompassPoints,
    expandBraces: expandBraces,
    getZigZagMatrix: getZigZagMatrix,
    canDominoesMakeRow: canDominoesMakeRow,
    extractRanges: extractRanges
};
