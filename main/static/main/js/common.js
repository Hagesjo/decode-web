//Listeners

$(document).ready(function() {
	new Clipboard('.copy');

	//input-fields
	$('#text').bind('input propertychange', function() {
		textencode(this.value);
	});
	$('#base64').bind('input propertychange', function() {
		base64decode(this.value);
	});
	$('#rot13').bind('input propertychange', function() {
		rot13decode(this.value);
	});
	$('#ascii').bind('input propertychange', function() {
		asciidecode(this.value);
	});
	$('#binary').bind('input propertychange', function() {
		binarydecode(this.value);
	});
	$('#hex').bind('input propertychange', function() {
		hexdecode(this.value);
	});
	$('#letnum').bind('input propertychange', function() {
		letnumdecode(this.value);
	});

	//group-buttons
	$('#eightbin').click(function() {
		groupbylength('#binary', 8, binarydecode);
	});
	$('#sixteenbin').click(function() {
		groupbylength('#binary', 16, binarydecode);
	});
	$('#eighthex').click(function() {
		groupbylength('#hex', 2, hexdecode);
	});
	$('#sixteenhex').click(function() {
		groupbylength('#hex', 4, hexdecode);
	});
});

var allFunc = {};
allFunc['#ascii'] = asciiencode;
allFunc['#binary'] = binaryencode;
allFunc['#hex'] = hexencode;
allFunc['#letnum'] = letnumencode;
allFunc['#rot13'] = rot13encode;
allFunc['#base64'] = base64encode;


//All decode and encode functions

function textencode(text, skip) {
	for (var key in allFunc) {
		if (key != skip) {
			allFunc[key](text);
		}
	}
}

function base64encode(text) {
	$('#base64').val(btoa(unescape(encodeURIComponent(text))));
}

function base64decode(text) {
	dec = decodeURIComponent(escape(atob(text)));
	$('#text').val(dec);
	textencode(dec, "#base64");
}

function asciiencode(text) {
	var outp = "";
	for (i = 0; i < text.length; i++) {
		outp += text.charCodeAt(i).toString() + " ";
	}
	$('#ascii').val(outp.slice(0,-1));
}

function asciidecode(text) {
	var outp = "";
	text = text.split(" ");
	for (i = 0; i < text.length; i++) {
		if (text[i] <= 255 && text[i] >= 0) {
			outp += String.fromCharCode(text[i]);
		}
	}
	$('#text').val(outp);
	textencode(outp, "#ascii");
}


function binaryencode() {
	var text = $.trim($('#ascii').val());
	if (text == "") {
		$('#binary').val(text);
	}
	else {
		var outp = "";
		text = text.split(" ");
		for (i = 0; i < text.length; i++) {
			outp += parseInt(text[i]).toString(2) + " ";
		}
		$('#binary').val(outp);
	}
}	

function binarydecode(text) {
	text = text.trim().split(/\s+/);
	var outp = "";
	for (i = 0; i < text.length; i++) {
		outp += String.fromCharCode(parseInt(text[i], 2));
	}
	// hack to prevent trying to decode a null char whenever field is cleared
	if (outp == "\0") {
		outp = "";
	}
	$('#text').val(outp);
	textencode(outp, "#binary");
}


function hexencode() {
	var text = $.trim($('#ascii').val());
	if (text == "") {
		$('#hex').val(text);
	}
	else {
		var outp = "";
		text = text.split(" ");
		for (i = 0; i < text.length; i++) {
			outp += parseInt(text[i]).toString(16) + " ";
		}
		$('#hex').val(outp);
	}
}	

function hexdecode(text) {
	var outp = "";
	text = text.trim().split(/\s+/);
	for (i = 0; i < text.length; i++) {
		outp += String.fromCharCode(parseInt(text[i], 16));
	}
	// hack to prevent trying to decode a null char whenever field is cleared
	if (outp == "\0") {
		outp = "";
	}
	$('#text').val(outp);
	textencode(outp.trim(), "#hex");
}

function groupbylength(selector, size, decodefun) {
	text = $(selector).val().replace(/\s/g, "");
	outp = "";
	for (i = 0; i < text.length; i++) {
		outp += text[i];
		if ((i  + 1) % size == 0) {
			outp += " ";
		}
	}
	$(selector).val(outp.trim());
	decodefun(outp);
}


function letnumencode(text) {
	var outp = "";
	text = text.toLowerCase()
	for (i = 0; i < text.length; i++) {
		num = text.charCodeAt(i) - 96
		if (num > 26 || num < 0) {
			outp += text[i] + " ";
		} else {
			outp += num.toString() + " ";
		}
	}
	$('#letnum').val(outp);
}

function letnumdecode(text) {
	var outp = "";
	text = text.trim().split(/\s+/);
	for (i = 0; i < text.length; i++) {
		outp += String.fromCharCode(parseInt(text[i]) % 26 + 96);
	}
	$('#text').val(outp);
	textencode(outp.trim(), "#letnum");
}

function shift13(text) {
	var outp = "";
	text = text.toLowerCase()
	for (i = 0; i < text.length; i++) {
		num = text[i].charCodeAt();
		if (num > 96 && num < 123) {
			num = (num - 84) % 26 + 97;
		}
		outp += String.fromCharCode(num);
	}
	return outp;
}


function rot13encode(text) {
	outp = shift13(text);
	$('#rot13').val(outp);
}

function rot13decode(text) {
	outp = shift13(text);
	$('#text').val(outp);
	textencode(outp, "#rot13");
}
