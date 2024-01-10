$(document).ready(function() {
    //input-fields
    $('#text').bind('input propertychange', function() {
        findPlusWord(this.value.toLowerCase());
    });
});

function makeHash(word) {
    symbols = Array.from("abcdefghijklmnopqrstuvwxyz");
    var letters = Array.apply(null, Array(symbols.length)).map(Number.prototype.valueOf, 0);
    for (var i = 0; i < word.length; i++) {
        index = symbols.indexOf(word[i]);
        if (index != -1) {
            letters[index] += 1;
        }
    }

    return letters.toString()
}

function findPlusWord(phrase) {
    let ret = [];
    symbols = Array.from("abcdefghijklmnopqrstuvwxyz");
    ws = phrase.split(/(\s+)/)
    ws.forEach((word) => { 
        console.log("huh", word);
        if (word.length < 3) {
            return
        }
        console.log(makeHash(word))
        word = word.replace(/\W/g, '')
        for (var i = 0; i < symbols.length; i++) {
            let hash = makeHash(word + symbols[i]);
            if (hashes.has(hash)) {
                ret.push({[`${word}+${symbols[i]}`]: fromWord[hash]});
            }
        }
    })

    if (ret) {
        $('#found-words').text(JSON.stringify(ret, null, 4));
        $('#stats').removeClass('hide');
    } else {
        console.log("no res");
        $('#stats').addClass('hide');
    }
}
