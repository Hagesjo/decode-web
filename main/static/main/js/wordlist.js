$(document).ready(function() {
    //input-fields
    $('#text').bind('input propertychange', function() {
        var foundWords = findWords(this.value);
        document.querySelector("#found-words").innerHTML = [...foundWords].join('\n');
    });
    $('#min-word-length').bind('input propertychange', function() {
        //parseWordMatrix(this.value);
        var foundWords = findWords(document.querySelector('#text').value);
        document.querySelector("#found-words").innerHTML = [...foundWords].join('<br>');
    });
});

function findWords(regex) {
    if (regex.length < 3) { // <3
        return new Set();
    }
    var minLength = parseInt(document.querySelector('#min-word-length').value);
    if (!!minLength) {
        minLength = 0;
    }
    var found = new Set();
    var re = new RegExp(regex.trim());
    words.forEach((word) => { 
        if (word.length < minLength) {
            return;
        }
        if (word.match(re)) {
            found.add(word);
        }
    })

    return found;
}
