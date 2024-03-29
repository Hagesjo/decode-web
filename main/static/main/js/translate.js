$(document).ready(function() {
    new Clipboard('.copy');

    //input-fields
    $('#text').bind('input propertychange', function() {
        nthencode(this.value);
        caesarencode(this.value);
        reverseencode(this.value);
        transpose(this.value);
        atbash(this.value);
    });
});


function nthencode(text) {
    var outp = [];
    for (i = 1; i < Math.floor(text.length / 2); i++) {
        outp[i] = [];
        for (j = 0; j < i; j++) {
            for (k = 0; k < text.length; k += i ) {
                outp[i].push(text[k+j]);
            }
        }
        outp[i] = outp[i].join("");
    }
    outp.splice(0, 1);
    $('#nth').val(outp.join("\n"));
}

function caesarencode(text) {
    var outp = [];
    for (i = 0; i < 26; i++) {
        outp[i] = [];
        for (j = 0; j < text.length; j++) {
            var code = text.charCodeAt(j);
            if (code >= 65 && code <= 90) {
                outp[i].push(String.fromCharCode(((code - 65 + i) % 26) + 65));
            }
            else if (code >= 97 && code <= 122) {
                outp[i].push(String.fromCharCode(((code - 97 + i) % 26) + 97));
            }
            else {
                outp[i].push(text[j]);
            }
        }
        outp[i] = " ".repeat(2 - i.toString().length) + i + ": " + outp[i].join("");
    }
    $('#caesar').val(outp.join("\n"));
}

function reverseencode(text) {
    var outp = "";
    for (var i = text.length - 1; i >= 0; i--) {
        outp += text[i];
    }
    $('#reverse').val(outp);
}

function transpose(text) {
    var lines = text.split("\n");
    var outp = [];
    var width = lines[0].length

    for (i = 0; i < width; i++) {
        outp.push("");
    }

    for (i = 0; i < lines.length; i++) {
        for (j = 0; j < width; j++) {
            outp[j] += lines[i][j];
        }
    }
    $('#transpose').val(outp.join("\n"));
}

function atbash(text) {
    var alphabet = "abcdefghijklmABCDEFGHIJKLMNOPQRSTUVWXYZnopqrstuvwxyz";
    var rev = Array.from(alphabet).reverse();
    var outp = [];
    for (i = 0; i < text.length; i++) {
        var c = text[i];
        outp.push(rev[alphabet.indexOf(c)] ?? c)
    }
    $('#atbash').val(outp.join(""));
}
