//Listeners
$(document).ready(function() {
    new Clipboard('.copy');

    //input-fields
    $('#text').bind('input propertychange', function() {
        parsefrequency(this.value);
    });
});

function parsefrequency(text) {
    var alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var letters = Array.apply(null, Array(26)).map(Number.prototype.valueOf,0);
    for (i = 0; i < text.length; i++) {
        index = alpha.indexOf(text[i].toUpperCase());
        if (index != -1) {
            letters[index] += 1;
        }
    }
    createGraph(letters);
    return letters;
}
var frequencyChart = null;

function createGraph(letters) {
    if (frequencyChart != null) {
        frequencyChart.destroy();
    }
    var ctx = $('#frequencyChart');
    frequencyChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
            datasets: [{
                label: '# of Letters',
                data: letters,
                backgroundColor: [
                    'rgba(255, 59, 0, 0.4)',
                    'rgba(255, 119, 0, 0.4)',
                    'rgba(255, 179, 0, 0.4)',
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
                ],
                borderColor: [
                    'rgba(0,0,0,0.6)',
                    'rgba(0,0,0,0.6)',
                    'rgba(0,0,0,0.6)',
                    'rgba(0,0,0,0.6)',
                    'rgba(0,0,0,0.6)',
                    'rgba(0,0,0,0.6)',
                    'rgba(0,0,0,0.6)',
                    'rgba(0,0,0,0.6)',
                    'rgba(0,0,0,0.6)',
                    'rgba(0,0,0,0.6)',
                    'rgba(0,0,0,0.6)',
                    'rgba(0,0,0,0.6)',
                    'rgba(0,0,0,0.6)',
                    'rgba(0,0,0,0.6)',
                    'rgba(0,0,0,0.6)',
                    'rgba(0,0,0,0.6)',
                    'rgba(0,0,0,0.6)',
                    'rgba(0,0,0,0.6)',
                    'rgba(0,0,0,0.6)',
                    'rgba(0,0,0,0.6)',
                    'rgba(0,0,0,0.6)',
                    'rgba(0,0,0,0.6)',
                    'rgba(0,0,0,0.6)',
                    'rgba(0,0,0,0.6)',
                    'rgba(0,0,0,0.6)',
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
    });
}
