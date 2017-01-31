from decoders import *
class Api(object):
    methods = {
        'ascii' : ascii,
        'base64' : base64,
        'binary' : binary,
        'hex' : hextext, # Won't override python's 'hex'
        'letnum' : letnum,
        'morse' : morse,
        'reverse' : reverse,
        'rot13' : rot13,
        'caesar' : caesar,
        }

    def __init__(self, method, data):
        self.method = method
        self.data = data

    def parse(self, method, data):
        try:
            return Api.methods[method](data)
        except KeyError:
            return None
