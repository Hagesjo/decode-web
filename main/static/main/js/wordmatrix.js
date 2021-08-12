$(document).ready(function() {
    //input-fields
    $('#text').bind('input propertychange', function() {
        findWordsInMatrix(this.value);
    });
    $('#min-word-length').bind('input propertychange', function() {
        //parseWordMatrix(this.value);
        findWordsInMatrix(document.querySelector('#text').value);
    });
});


// Only works for square matrixes with this approach
function parseWordMatrix(text) {
    // parse rows
    var rows = [];
    var ret = new Set();
    splitted = text.trim().split('\n')
    splitted.forEach( row => {
        rows.push(row.split(""));
        ret.add(row);
        ret.add(row.split("").reverse().join(""));
    });

    // parse columns
    var columns = [];
    for (colIndex = 0; colIndex < rows[0].length; colIndex ++) {
        column = []
        for (rowIndex = 0; rowIndex < rows.length; rowIndex++) {
            column.push( rows[rowIndex][colIndex]);
        }
        ret.add(column.join(""))
        ret.add(column.reverse().join(""))
        columns.push(column)
    }

    // parse diagonals
    for (i = 0; i < rows.length; i++) {
        diagonalStart = [];
        diagonalEnd = [];
        for (j = 0; j + i < rows.length; j++) {
            if (j >= rows[i].length) {
                continue;
            }
            end = rows[i+j].length - 1
            diagonalStart.push(rows[i+j][j]);
            diagonalEnd.push(rows[i+j][end - j]);
        }
        ret.add(diagonalStart.join(""))
        ret.add(diagonalStart.reverse().join(""))
        ret.add(diagonalEnd.join(""))
        ret.add(diagonalEnd.reverse().join(""))
    }

    for (i = 0; i < columns.length; i++) {
        diagonalStart = [];
        diagonalEnd = [];
        for (j = 0; j + i < columns.length; j++) {
            if (j >= columns[i].length) {
                continue;
            }
            end = columns[i+j].length - 1
            diagonalStart.push(columns[i+j][j]);
            diagonalEnd.push(columns[i+j][end - j]);
        }
        ret.add(diagonalStart.join(""))
        ret.add(diagonalStart.reverse().join(""))
        ret.add(diagonalEnd.join(""))
        ret.add(diagonalEnd.reverse().join(""))
    }
    return ret;
}

function findWordsInMatrix(text) {
    var minLength = parseInt(document.querySelector('#min-word-length').value);
    rows = parseWordMatrix(text);
    found = new Set();
    rows.forEach( row => {
        row = row.toLowerCase();
        for (i = 0; i <= row.length; i++) {
            for (j = i + 1; j <= row.length; j++) {
                if (j - i < minLength) {
                    continue
                }
                word = row.substring(i, j)
                if (words.has(word)) {
                    found.add(word)
                }
            }
        }
    });
    document.querySelector("#found-words").innerHTML = [...found].join('<br>');
}
