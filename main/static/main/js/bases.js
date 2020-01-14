$(document).ready(function() {
    new Clipboard('.copy');

    $('#text').bind('input propertychange', function() {
        baseConvert(this.value, $("#input-base").val());
    });
    $('#input-base').bind('input propertychange', function() {
        baseConvert($('#text').val(), $("#input-base").val());
    });
});

function baseConvert(text, inputBase) {
    if (text == "") {
        $("#converted").val("");
        return
    }
    nums = text.trim().split(/\s+/).map(function(elem) { return parseInt(elem, inputBase)});
    outp = [];
    for (base = 2; base < 37; base++) {
        var row = [];
        for (j = 0; j < nums.length; j++) {
            row.push(nums[j].toString(base));
        }
        outp.push(base + ": " + row.join(" "));
    }
    $("#converted").val(outp.join('\n'));
}
