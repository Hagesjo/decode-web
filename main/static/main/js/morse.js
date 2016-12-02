//Listeners

$(document).ready(function() {
	new Clipboard('.copy');

	//input-fields
	$('#text').bind('input propertychange', function() {
		morseencode(this.value);
	});
	$('#morse').bind('input propertychange', function() {
		morsedecode(this.value);
	});
});

function morseencode(text) {
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
        '0' : ".----",
        '1' : "..---",
        '2' : "...--",
        '3' : "....-",
        '4' : ".....",
        '5' : "-....",
        '6' : "--...",
        '7' : "---..",
        '8' : "----.",
        '9' : "-----"
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
}

function morsedecode(text) {
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
        ".----" : '0',
        "..---" : '1',
        "...--" : '2',
        "....-" : '3',
        "....." : '4',
        "-...." : '5',
        "--..." : '6',
        "---.." : '7',
        "----." : '8',
        "-----" : '9'
    };
	words = text.trim().split('/');
    outp = [];
    for (i = 0; i < words.length; i++) {
        var word = words[i].trim().split(/\s+/);
        var current = []
        for (j = 0; j < word.length; j++) {
            if (translate[word[j]]) {
                current.push(translate[word[j]].toUpperCase());
            }
        }
        outp.push(current.join(""));
    }

	$('#text').val(outp.join(" "));
	//$('#text').val(dec);
}
