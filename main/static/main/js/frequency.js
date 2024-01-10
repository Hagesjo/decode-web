
//Listeners
$(document).ready(function() {
    new Clipboard('.copy');

    //input-fields
    $('#symbols').bind('input propertychange', function() {
        parsefrequency($("#text").val());
    });
    $('#text').bind('input propertychange', function() {
        parsefrequency(this.value);
    });
    $('#case-sens').bind('input propertychange', function() {
        parsefrequency($("#text").val());
    });
    $('#lowercase').bind('input click', function() {
        parsefrequency($("#text").val());
    });
    $('#uppercase').bind('input click', function() {
        parsefrequency($("#text").val());
    });
    $('#alphanumeric').bind('input click', function() {
        parsefrequency($("#text").val());
    });
    $('#numeric').bind('input click', function() {
        parsefrequency($("#text").val());
    });
});

function sumObjectValues(obj) {
  return Object.values(obj).reduce(function (accumulator, currentValue) {
    return accumulator + currentValue;
  }, 0);
}

function parsefrequency(text) {
    var symbols = $('#symbols').val();
    var caseSens = document.querySelector("#case-sens").checked;
    if (caseSens) {
        symbols = symbols.toUpperCase();
        text = text.toUpperCase();
    }
    symbols = Array.from(symbols);
    var letters = Array.apply(null, Array(symbols.length)).map(Number.prototype.valueOf, 0);
    for (i = 0; i < text.length; i++) {
        index = symbols.indexOf(text[i]);
        if (index != -1) {
            letters[index] += 1;
        }
    }
    createGraph(symbols, letters);
    return letters;
}
var frequencyChart = null;

function createGraph(symbols, symbolsCount) {
    if (frequencyChart != null) {
        frequencyChart.destroy();
    }
    var colors = [];
    var borders = [];
    // TODO: use Math.max. 
    var highestCount = 0;
    for (i = 0; i < symbolsCount.length; i++) {
        highestCount = Math.max(highestCount, symbolsCount[i]);
    }
    for (i = 0; i < symbols.length; i++) {
        colors.push(getColorByValue(symbolsCount[i], highestCount));
        borders.push('rgba(0,0,0,0.6)');
    }
    if (symbols.length > 0) {
        let stats = $('#stats');
        stats.removeClass('hide');
        let d = {}
        for (var i = 0; i < symbols.length; i++) {
            d[symbols[i]] = symbolsCount[i];
        }

        $('#totalcount').text("Total count: " + sumObjectValues(symbolsCount));
        $('#lettercounts').text(JSON.stringify(d, null, 4));
    } else {
        stats.addClass('hide');
    }

    var ctx = $('#frequencyChart');
    frequencyChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: symbols,
            datasets: [{
                label: '# of Letters',
                data: symbolsCount,
                backgroundColor: colors,
                borderColor: borders,
                borderWidth: 1
            }]
        },
        options: {
            animation: false,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true,
                        stepSize: 1
                    }
                }]
            }
        }
    });
}
var colors = [
    'rgba(255, 255, 255, 0.9)',
    'rgba(255, 243, 243, 0.9)',
    'rgba(255, 234, 234, 0.9)',
    'rgba(255, 225, 225, 0.9)',
    'rgba(255, 216, 216, 0.9)',
    'rgba(255, 207, 207, 0.9)',
    'rgba(255, 198, 198, 0.9)',
    'rgba(255, 189, 189, 0.9)',
    'rgba(255, 180, 180, 0.9)',
    'rgba(255, 171, 171, 0.9)',
    'rgba(255, 162, 162, 0.9)',
    'rgba(255, 153, 153, 0.9)',
    'rgba(255, 144, 144, 0.9)',
    'rgba(255, 135, 135, 0.9)',
    'rgba(255, 126, 126, 0.9)',
    'rgba(255, 117, 117, 0.9)',
    'rgba(255, 108, 108, 0.9)',
    'rgba(255, 99, 99, 0.9)',
    'rgba(255, 90, 90, 0.9)',
    'rgba(255, 81, 81, 0.9)',
    'rgba(255, 72, 72, 0.9)',
    'rgba(255, 63, 63, 0.9)',
    'rgba(255, 54, 54, 0.9)',
    'rgba(255, 45, 45, 0.9)',
    'rgba(255, 36, 36, 0.9)',
    'rgba(255, 27, 27, 0.9)',
    'rgba(255, 18, 18, 0.9)',
    'rgba(255, 9, 9, 0.9)',
]

var rainbow = [
    'rgba(255, 0, 0, 0.4)',
    'rgba(255, 0, 0, 0.4)',
    'rgba(255, , 0, 0.4)',
    'rgba(255, 239, 0, 0.4)',
    'rgba(212, 255, 0, 0.4)',
    'rgba(152, 255, 0, 0.4)',
    'rgba(92, 255, 0, 0.4)',
    'rgba(32, 255, 0, 0.4)',
    'rgba(0, 255, 27, 0.4)',
    'rgba(0, 255, 87, 0.4)',
    'rgba(0, 255, 147, 0.4)',
    'rgba(0, 255, 207, 0.4)',
    'rgba(0, 244, 255, 0.4)',
    'rgba(0, 184, 255, 0.4)',
    'rgba(0, 124, 255, 0.4)',
    'rgba(0, 64, 255, 0.4)',
    'rgba(0, 4, 255, 0.4)',
    'rgba(55, 0, 255, 0.4)',
    'rgba(115, 0, 255, 0.4)',
    'rgba(175, 0, 255, 0.4)',
    'rgba(235, 0, 255, 0.4)',
    'rgba(255, 0, 216, 0.4)',
    'rgba(255, 0, 156, 0.4)',
    'rgba(255, 0, 96, 0.4)',
    'rgba(255, 0, 36, 0.4)',
];

function getColorByIndex(index) {
    return colors[index % colors.length]
}

function getColorByValue(value, highestValue) {
    var frac = value / highestValue;
    index = Math.round((colors.length - 1) * frac);
    return colors[index];
}
