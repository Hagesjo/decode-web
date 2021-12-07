//Listeners

$(document).ready(function() {
    new Clipboard('.copy');

    //input-fields
    $('#text').bind('input propertychange', function() {
        textencode(this.value, []);
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
    $('#binary-0').bind('input propertychange', function() {
        console.log("tjenna");
        binarydecode($('#binary').val());
    });
    $('#binary-1').bind('input propertychange', function() {
        console.log("tjenna");
        binarydecode($('#binary').val());
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

function textencode(text, nums, skip) {
    for (var key in allFunc) {
        if (key != skip) {
            allFunc[key](text, nums);
        }
    }
}

function base64encode(text, nums) {
    // Hack
    if (text == "\0") {
        $('#base64').val("");
        return
    }
    $('#base64').val(Base64.btoa(text));
}

function base64decode(text) {
    dec = Base64.atob(text);
    $('#text').val(dec);
    textencode(dec, [], "#base64");
}

function asciiencode(text, nums) {
    if (nums.length != 0) {
        var outp = nums.join(" ");
        $('#ascii').val(outp);
        return;
    }

    var outp = "";
    for (i = 0; i < text.length; i++) {
        outp += text.charCodeAt(i).toString() + " ";
    }
    outp = outp.slice(0, -1);
    $('#ascii').val(outp);
    return outp;
}

function asciidecode(text) {
    var outp = "";
    var nums = text.split(/\s+/);
    for (i = 0; i < nums.length; i++) {
        if (nums[i] <= 255 && nums[i] >= 0) {
            outp += String.fromCharCode(nums[i]);
        }
    }
    $('#text').val(outp);
    textencode(outp, nums, "#ascii");
    return outp;
}


function binaryencode(text, nums) {
    var text = $.trim($('#ascii').val());
    if (text == "") {
        $('#binary').val(text);
    } else {
        var outp = "";
        text = text.split(/\s+/);
        for (i = 0; i < text.length; i++) {
            var curr_bin = parseInt(text[i]).toString(2);
            if (curr_bin.length > 8) {
                outp += "0".repeat(Math.max(0, 16 - curr_bin.length)) + curr_bin + " ";
            } else {
                outp += "0".repeat(Math.max(0, 8 - curr_bin.length)) + curr_bin + " ";
            }
        }
        $('#binary').val(outp);
    }
    return outp;
}    

function binarydecode(text) {
    bin0 = document.querySelector("#binary-0").value
    bin1 = document.querySelector("#binary-1").value
    if (bin0 != "" && bin1 != "") {
        text = text.replaceAll(bin0, "tmp").replaceAll(bin1, "1").replaceAll("tmp", "0");
    }
    text = text.trim().split(/\s+/);

    var outp = "";
    var nums = [];
    for (i = 0; i < text.length; i++) {
        if (text[i] == "") {
            continue;
        }
        var num = parseInt(text[i], 2);
        nums.push(num);
        outp += String.fromCharCode(num);
    }
    // hack to prevent trying to decode a null char whenever field is cleared
    if (outp == "\0") {
        outp = "";
    }
    $('#text').val(outp);
    textencode(outp, nums, "#binary");
    return outp;
}


function hexencode(text, nums) {
    var text = $.trim($('#ascii').val());
    if (text == "") {
        $('#hex').val(text);
    }
    else {
        var outp = "";
        text = text.split(/\s+/);
        for (i = 0; i < text.length; i++) {
            outp += parseInt(text[i]).toString(16) + " ";
        }
        $('#hex').val(outp);
    }
    return outp;
}    

function hexdecode(text) {
    var outp = "";
    var nums = [];
    text = text.trim().split(/\s+/);
    for (i = 0; i < text.length; i++) {
        var num = parseInt(text[i], 16)
        nums.push(num);
        outp += String.fromCharCode(num);
    }
    // hack to prevent trying to decode a null char whenever field is cleared
    if (outp == "\0") {
        outp = "";
    }
    $('#text').val(outp);
    outp = outp.trim();
    textencode(outp, nums, "#hex");
    return outp;
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


function letnumencode(text, nums) {
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
    return outp;
}

function letnumdecode(text) {
    var outp = "";
    text = text.trim().split(/\s+/);
    for (i = 0; i < text.length; i++) {
        var num = parseInt(text[i]);
        if (num < 1) {
            num = 26 - num;
        }
        outp += String.fromCharCode((num - 1) % 26 + 97);
    }
    $('#text').val(outp);
    outp = outp.trim();
    textencode(outp, [], "#letnum");
    return outp;
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


function rot13encode(text, nums) {
    outp = shift13(text);
    $('#rot13').val(outp);
    return outp;
}

function rot13decode(text) {
    outp = shift13(text);
    $('#text').val(outp);
    textencode(outp, [], "#rot13");
    return outp;
}
