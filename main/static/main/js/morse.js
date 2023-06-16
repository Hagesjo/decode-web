//Listeners

$(document).ready(function() {
    new Clipboard('.copy');

    //input-fields
    $('#text').bind('input propertychange', function() {
        morseEncode(this.value);
    });
    $('#morse').bind('input propertychange', function() {
        morseChanged(this.value, true);
    });
    morseChanged($('#morse').text());
});

function morseEncode(text) {
    translate = {
        'A' : ".-",
        'B' : "-...",
        'C' : "-.-.",
        'D' : "-..",
        'E' : ".",
        'F' : "..-.",
        'G' : "--.",
        'H' : "....",
        'I' : "..",
        'J' : ".---",
        'K' : "-.-",
        'L' : ".-..",
        'M' : "--",
        'N' : "-.",
        'O' : "---",
        'P' : ".--.",
        'Q' : "--.-",
        'R' : ".-.",
        'S' : "...",
        'T' : "-",
        'U' : "..-",
        'V' : "...-",
        'W' : ".--",
        'X' : "-..-",
        'Y' : "-.--",
        'Z' : "--..",
        '1' : ".----",
        '2' : "..---",
        '3' : "...--",
        '4' : "....-",
        '5' : ".....",
        '6' : "-....",
        '7' : "--...",
        '8' : "---..",
        '9' : "----.",
        '0' : "-----"
    };
    text = text.trim().split(/\s+/);
    outp = [];
    for (i = 0; i < text.length; i++) {
        var word = text[i];
        var current = [];
        for (j = 0; j < word.length; j++) {
            current.push(translate[word[j].toUpperCase()]);
        }
        outp.push(current.join(" "));
    }
    $('#morse').val(outp.join(' / '));
    morseChanged(outp.join(' / '), false);
}

function morseChanged(text, setDecodedText) {
    [decoded, charSet, onlyMorse] = morseDecode(text)


    if (setDecodedText) {
        $('#text').val(decoded);
    }

    chars = Array.from(charSet);
    if (chars.length == 1) {
        chars.push(".");
    }

    if (chars.length != 2) {
        document.querySelector("#morse-a").classList.add("hide")
        document.querySelector("#morse-b").classList.add("hide")
        return;
    }

    if (onlyMorse) {
        document.querySelector("#morse-b").classList.add("hide")
        chars = ['.', '-']
    }

    document.querySelector("#a").innerHTML = chars[0] + " = -<br>" + chars[1] + " = .";
    document.querySelector("#morse-a").classList.remove("hide");
    aText = text.toUpperCase().replaceAll(chars[0], "tmp").replaceAll(chars[1], ".").replaceAll("tmp", "-");
    document.querySelector("#morse-a-text").innerText = morseDecode(aText)[0];

    if (onlyMorse) {
        return
    }

    document.querySelector("#b").innerHTML = chars[0] + " = .<br>" + chars[1] + " = -";
    document.querySelector("#morse-b").classList.remove("hide");
    bText = text.toUpperCase().replaceAll(chars[0], "tmp").replaceAll(chars[1], "-").replaceAll("tmp", ".");
    document.querySelector("#morse-b-text").innerText = morseDecode(bText)[0];

}


function morseDecode(text) {
    translate = {
        ".-" : 'A',
        "-..." : 'B',
        "-.-." : 'C',
        "-.." : 'D',
        "." : 'E',
        "..-." : 'F',
        "--." : 'G',
        "...." : 'H',
        ".." : 'I',
        ".---" : 'J',
        "-.-" : 'K',
        ".-.." : 'L',
        "--" : 'M',
        "-." : 'N',
        "---" : 'O',
        ".--." : 'P',
        "--.-" : 'Q',
        ".-." : 'R',
        "..." : 'S',
        "-" : 'T',
        "..-" : 'U',
        "...-" : 'V',
        ".--" : 'W',
        "-..-" : 'X',
        "-.--" : 'Y',
        "--.." : 'Z',
        ".----" : '1',
        "..---" : '2',
        "...--" : '3',
        "....-" : '4',
        "....." : '5',
        "-...." : '6',
        "--..." : '7',
        "---.." : '8',
        "----." : '9',
        "-----" : '0'
    };
    words = text.trim().split('/');
    outp = [];
    const charSet = new Set();
    for (i = 0; i < words.length; i++) {
        var word = words[i].trim().split(/\s+/);
        var current = []
        for (j = 0; j < word.length; j++) {
            if (translate[word[j]]) {
                current.push(translate[word[j]].toUpperCase());
            }
            for (k = 0; k < word[j].length; k++) {
                charSet.add(word[j][k].toUpperCase());
            }
        }
        outp.push(current.join(""));
    }
    var onlyMorse = (charSet.size == 1 && (charSet.has(".") || charSet.has("-")) ||
                    (charSet.has("-") && charSet.has(".") && charSet.size == 2))

    return [outp, charSet, onlyMorse];
}

