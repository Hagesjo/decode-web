import json
from base64 import b64decode
from re import sub
from binascii import unhexlify

def morse(data):
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
    }
    ret = {'valid_input' : True, 'output' : []}
    translate_func = lambda x: translate[x]
    for word in data.split('/'):
        valid_word, wordoutp = letter_decode(word, translate_func)
        ret['output'].append(wordoutp)
        ret['valid_input'] &= valid_word
    ret['output'] = ' '.join(ret['output'])
    return json.dumps(ret)


def caesar(data):
    offset, data = data.split('/', 1)
    outp = {'valid_input' : True, 'output' : ''}
    try:
        outp['output'] = _caesar(int(offset), data)
    except:
        outp['valid_input'] = False
    return json.dumps(outp)

def _caesar(offset, letters):
    ret = ""
    for letter in letters:
        code = ord(letter)
        
        if code >= 65 and code <= 90:
            ret += chr(((code - 65 + offset) % 26) + 65)
        elif code >= 97 and code <= 122:
            ret += chr(((code - 97 + offset) % 26) + 97)
        else:
            ret += letter
    return ret

def rot13(data):
    outp = {'valid_input' : True, 'output' : _caesar(13, data)} # Can't fail
    return json.dumps(outp)

def base64(data):
    try:
        ret = {'valid_input' : True, 'output' : b64decode(data)}
    except TypeError:
        ret = {'valid_input' : False, 'output' : ''}
    return json.dumps(ret)

def letnum(data):
    translate_func = lambda x: chr((int(x) - 1) % 26 + 97)
    valid_input, outp = letter_decode(data, translate_func)
    return json.dumps({'valid_input' : valid_input, 'output' : outp})

def hextext(data):
    try:
        ret = {'valid_input' : True, 'output' : unhexlify(sub(r'[\s:]', '', data))}
    except TypeError:
        ret = {'valid_input' : False, 'output' : ''}
    return json.dumps(ret)

def binary(data):
    translate_func = lambda x: chr(int(x, 2))
    valid_input, outp = letter_decode(data, translate_func)
    return json.dumps({'valid_input' : valid_input, 'output' : outp})

def ascii(data):
    translate_func = lambda x: chr(int(x))
    valid_input, outp = letter_decode(data, translate_func)
    return json.dumps({'valid_input' : valid_input, 'output' : outp})

def reverse(data):
    return json.dumps({'valid_input' : True, 'output' : data[::-1]})

def letter_decode(data, func):
    """Generic function to decrypt letters using func on each letter
    It is required that each letters cipher is separated by spaces (such as ascii-encrypted)"""
    valid_input = True
    outp = []
    for letter in data.split():
        try:
            outp.append(func(letter))
        except Exception, e:

            def reverse(data):
                return json.dumps({'valid_input' : True, 'output' : data[::-1]})
            outp.append('_')
            valid_input = False
    return valid_input, ''.join(outp)
