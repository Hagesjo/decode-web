//This could be more generalized, but I doubt I'll add more layout than these three.

__qwerty_keys = "~!@#$%^&*()_+<`1234567890-=QWERTYUIOP{}|>qwertyuiop[]\\^ASDFGHJKL:\"asdfghjkl;'ZXCVBNM<>?zxcvbnm,./";
__dvorak_keys = "~!@#$%^&*(){}<`1234567890[]\"<>PYFGCRL?+|>',.pyfgcrl/=\\^AOEUIDHTNS_aoeuidhtns-:QJKXBMWVZ;qjkxbmwvz";
__colemk_keys = "~!@#$%^&*()_+<`1234567890-=QWFPGJLUY:[]\\>qwfpgjluy;{}|^ARSTDHNEIO\"arstdhneio'ZXCVBKM<>?zxcvbkm,./";
var q_d_dict = {};
var q_c_dict = {};
var d_q_dict = {};
var c_q_dict = {};
var c_d_dict = {};
var d_c_dict = {};
for (i = 0; i < __qwerty_keys.length; i++) {
    q_d_dict[__qwerty_keys[i]] = __dvorak_keys[i];
    q_c_dict[__qwerty_keys[i]] = __colemk_keys[i];
    d_q_dict[__dvorak_keys[i]] = __qwerty_keys[i];
    c_q_dict[__colemk_keys[i]] = __qwerty_keys[i];
    d_c_dict[__dvorak_keys[i]] = __colemk_keys[i];
    c_d_dict[__colemk_keys[i]] = __dvorak_keys[i];
}

//Listeners

$(document).ready(function() {
    new Clipboard('.copy');

    //input-fields
    $('#qwerty').bind('input propertychange', function() {
        translate(this.value, q_d_dict, '#dvorak');
        translate(this.value, q_c_dict, '#colemak');
    });
    $('#dvorak').bind('input propertychange', function() {
        translate(this.value, d_c_dict, '#colemak');
        translate(this.value, d_q_dict, '#qwerty');
    });
    $('#colemak').bind('input propertychange', function() {
        translate(this.value, c_d_dict, '#dvorak');
        translate(this.value, c_q_dict, '#qwerty');
    });
});

function translate(text, t_dict, elem) {
    var outp = "";
    for (i = 0; i < text.length; i++) {
        if (text[i] in t_dict) {
            outp += t_dict[text[i]];
        }
        else {
            outp += text[i]
        }
    }
    $(elem).val(outp);
    return outp;
}
