$(document).ready(function() {
    //input-fields
    $('#text').bind('input propertychange', function() {
        findWordsInMatrix(this.value);
    });
    $('#min-word-length').bind('input propertychange', function() {
        //parseWordMatrix(this.value);
        findWordsInMatrix(document.querySelector('#text').value);
    });
    $('#highlighter').bind('input propertychange', function() {
        highlightLetters(document.querySelector('#highlighter').value);
    });

});

function highlightLetters(letters) {
    var elems = document.querySelectorAll('td')
    elems.forEach((elem) => {
        if (!elem.classList.contains("locked")) {
            elem.style.background = 'none';
        }
        for (var i = 0; i < letters.length; i++) {
            if (elem.textContent.toLowerCase() === letters[i].toLowerCase()) {
                elem.style.background = '#21f821';
                elem.classList.add("locked");
            }

        }
    });
}

function range(start, end, step = 1) {
    if (start == end) {
        return [start]
    }

    if ((start < end && step < 0) || (start > end && step > 0)) {
        return [];
    }

    let result = [];

    if (start <= end) {
        for (let i = start; i <= end; i += step) {
            result.push(i);
        }
    } else {
        for (let i = start; i >= end; i += step) {
            result.push(i);
        }
    }

    return result;
}

// Only works for square matrixes with this approach
function parseWordMatrix(text) {
    if (text.length > 0) {
        document.querySelector("#gridinfo").classList.remove('hide')
    } else {
        document.querySelector("#gridinfo").classList.add('hide')
    }
    // parse rows
    var rows = [];
    var ret = [];
    var ref = [];

    // Cleanup, remove all whitespace
    splitted = text.trim().split('\n')
    splitted.forEach( (row, i) => {
        splitted[i] = row.replace(/\s/g, '');
    });
    loadGrid(splitted);
    splitted.forEach((row, i) => {
        rows.push(row.split(""));
        ret.push(row);
        ref.push(range(row.length * i, row.length * (i+1)-1));
        ret.push(row.split("").reverse().join(""));
        ref.push(range(row.length * (i+1)-1, row.length * i, -1));
    });

    // parse columns
    var columns = [];
    var refColumns = [];
    for (colIndex = 0; colIndex < rows[0].length; colIndex ++) {
        var column = []
        var refcolumn = []
        for (rowIndex = 0; rowIndex < rows.length; rowIndex++) {
            column.push( rows[rowIndex][colIndex]);
            refcolumn.push(rows[0].length * rowIndex + colIndex)
        }
        ret.push(column.join(""))
        ref.push(refcolumn);
        ret.push(column.reverse().join(""))
        ref.push(refcolumn.toReversed());
        columns.push(column)
        refColumns.push(refcolumn);
    }

    // parse diagonals
    for (i = 0; i < rows.length; i++) {
        diagonalStart = [];
        diagonalEnd = [];
        refDiagonalStart = [];
        refDiagonalEnd = [];
        for (j = 0; j + i < rows.length; j++) {
            if (j >= rows[i].length) {
                continue;
            }
            end = rows[i+j].length - 1
            diagonalStart.push(rows[i+j][j]);
            refDiagonalStart.push((i+j) * rows[0].length + j)
            diagonalEnd.push(rows[i+j][end - j]);
            refDiagonalEnd.push((i+j) * rows[0].length + end - j)
        }
        ret.push(diagonalStart.join(""))
        ref.push(refDiagonalStart)
        ret.push(diagonalStart.reverse().join(""))
        ref.push(refDiagonalStart.toReversed())
        ret.push(diagonalEnd.join(""))
        ref.push(refDiagonalEnd)
        ret.push(diagonalEnd.reverse().join(""))
        ref.push(refDiagonalEnd.toReversed())
    }

    for (i = 0; i < columns.length; i++) {
        diagonalStart = [];
        diagonalEnd = [];
        refDiagonalStart = [];
        refDiagonalEnd = [];
        for (j = 0; j + i < columns.length; j++) {
            if (j >= columns[i].length) {
                continue;
            }
            end = columns[i+j].length - 1
            diagonalStart.push(columns[i+j][j]);
            refDiagonalStart.push(refColumns[i+j][end-j])
            diagonalEnd.push(columns[i+j][end - j]);
            refDiagonalEnd.push(refColumns[i+j][j])
        }
        ret.push(diagonalStart.join(""))
        ref.push(refDiagonalStart)
        ret.push(diagonalStart.reverse().join(""))
        ref.push(refDiagonalStart.toReversed())
        ret.push(diagonalEnd.join(""))
        ref.push(refDiagonalEnd)
        ret.push(diagonalEnd.reverse().join(""))
        ref.push(refDiagonalEnd.toReversed())
    }

    return {"rows": ret, "refRows": ref};
}

function addWord(word, ref) {
    const li = document.createElement("li");
    li.innerHTML = word;
    li.addEventListener('mouseenter', () => {handleHover(ref)});
    li.addEventListener('click', () => {handleClick(li, ref)});
    const foundWordsElem = document.querySelector("#found-words")
    foundWordsElem.appendChild(li);
    foundWordsElem.addEventListener('mouseleave', () => {resetAfter(50)});
}

function handleClick(li, ref) {
    li.classList.toggle("locked")
    shouldLock = li.classList.contains("locked")
    if (shouldLock) {
        li.style.background = "#21f821";
    } else {
        li.style.background = "none";
    }

    ref.forEach((id) => {
        let elem = document.querySelector(`#ref-${id}`);
        if (shouldLock) {
            elem.classList.add("locked")
        } else {
            elem.classList.remove("locked")
        }
    });
}

function handleHover(ref) {
    document.querySelectorAll("td:not(.locked)").forEach(elem => {
        elem.style.background = 'none'
    })

    ref.forEach((id) => {
        let elem = document.querySelector(`#ref-${id}`);
        elem.style.background = "yellow";
    });
}

function resetAfter(delay) {
    setTimeout(
        (() => {
        document.querySelectorAll("td").forEach(elem => {
            if (elem.classList.contains("locked")) {
                elem.style.background = "#21f821";
            } else {
                elem.style.background = "none";
            }
        })
    }), delay);
}

function findWordsInMatrix(text) {
    document.querySelector("#found-words").innerHTML = "";

    var minLength = parseInt(document.querySelector('#min-word-length').value);
    let { rows, refRows } = parseWordMatrix(text);
    foundS = new Set();
    found = [];
    let refs = [];
    rows.forEach( (row, rowIndex) => {
        row = row.toLowerCase();
        for (i = 0; i <= row.length; i++) {
            for (j = i + 1; j <= row.length; j++) {
                if (j - i < minLength) {
                    continue
                }
                word = row.substring(i, j)
                if (words.has(word)) {
                    if (foundS.has(word)) {
                        continue
                    }
                    foundS.add(word)
                    found.push(word);
                    refs.push(refRows[rowIndex].slice(i, j));
                }
            }
        }
    });
    // Now, we have to be careful to not mess up the order of refs vs found.
    d = {}
    for (let i = 0; i < found.length; i++) {
        d[found[i]] = refs[i]
    }

    found.sort((a, b) => b.length - a.length);
    found.forEach((word) => {
        addWord(word, d[word]);
    });
}

function createTile(letter, tileNumber) {
    let tile = document.createElement("div");
    tile.classList.add("tile");
    tile.id = `tile-${tileNumber}`;
    tile.innerHTML = letter;
    return tile;
}

function loadGrid(letters) {
    grid = document.querySelector(`#grid`);
    if (grid == undefined) {
        return;
    }
    grid.innerHTML = ""

    var table = document.createElement("table")
    var tbody = table.createTBody();
    let i = 0
    for (var y = 0; y < letters.length; y++) {
        var row = tbody.insertRow(y);
        for (var x = 0; x < letters[y].length; x++) {
            var cell = row.insertCell(x);
            cell.setAttribute("id", `ref-${i}`)
            i += 1
            cell.textContent = letters[y][x];
        }
    }

    grid.appendChild(table);
}
