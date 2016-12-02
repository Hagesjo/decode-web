//Listeners

$(document).ready(function() {
	new Clipboard('.copy');

	//input-fields
	$('#text').bind('input propertychange', function() {
		trumpencode(this.value);
	});

	$('#trump').bind('input propertychange', function() {
		trumpdecode(this.value);
	});
});

function trumpencode(text) {
    var d = {}
    d["1"] = "4AEFHKTXYfijkmntuxy";
    d["0"] = "-012356789BCDGIJLMNOPQRSUVWZ_abcdeghloqrsvwz";
	text = text.trim().split(/\s+/);
    ret = "";
    for (i = 0; i < text.length; i++) {
        word = text[i];
        for (j = 0; j < word.length; j++) {
            ret += word.charCodeAt(j).toString(2) + " ";
        }
    }
    var outp = ""
    for (i = 0; i < ret.length; i++) {
        if (ret[i] != " ") {
            outp += d[ret[i]][Math.floor((Math.random() * d[ret[i]].length))]
        }
        else {
            outp += "\n";
        }
    }
	$('#trump').val(outp);
    return outp;
}

function trumpdecode(text) {
    text = text.trim().split(/\s+/)
    var alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnoqrstuvwxyz0123456789_-";
    var value = "100011010010000000010001100000010011101100001100110000010000000";
    var outp = "";
	for (i = 0; i < text.length; i++) {
        var word = text[i];
        for (j = 0; j < word.length; j++) {
           outp += value[alpha.indexOf(word[j])];
        }
        outp += " ";
	}
	$('#text').val(binarydecode(outp));
    return outp; 
}

