//Listeners

$(document).ready(function() {
	$('#braille_indices').bind('input propertychange', function() {
		
	});
});
var buttonToIndices = {
	// Translates the image ids to indices
	"A" : [1],
	"B" : [1,2],
	"C" : [1,4],
	"D" : [1,4,5],
	"E" : [1,5],
	"F" : [1,2,4],
	"G" : [1,2,4,5],
	"H" : [1,2,5],
	"I" : [2,4],
	"J" : [2,4,5],
	"K" : [1,3],
	"L" : [1,2,3],
	"M" : [1,3,4],
	"N" : [1,3,4,5],
	"O" : [1,3,5],
	"P" : [1,2,3,4],
	"Q" : [1,2,3,4,5],
	"R" : [1,2,3,5],
	"S" : [2,3,4],
	"T" : [2,4,5],
	"U" : [1,3,6],
	"V" : [1,2,3,6],
	"W" : [2,4,5,6],
	"X" : [1,3,4,6],
	"Y" : [1,3,4,5,6],
	"Z" : [1,3,5,6],
	"_0" : [2,4,5],
	"_1" : [1],
	"_2" : [1,2],
	"_3" : [1,4],
	"_4" : [1,5,6],
	"_5" : [1,5],
	"_6" : [1,2,4],
	"_7" : [1,2,4,5],
	"_8" : [1,2,5],
	"_9" : [2,4],
	"appo" : [3],
	"capital" : [6],
	"comma" : [2],
	"dot" : [2,5,6],
	"exmark" : [2,3,5],
	"hash" : [3,4,5,6],
	"qmark" : [2,3,6],
	"uline" : [3,6]
}

var numbers = [
	 [1],
	 [1,2],
	 [1,4],
	 [1,4,5],
	 [1,5],
	 [1,2,4],
	 [1,2,4,5],
	 [1,2,5],
	 [2,4],
	 [2,4,5]]


function insertIndices(inp) {
	var indices = buttonToIndices[inp];
	var old_textarea = $('#braille_indices').val();
	var new_textarea = old_textarea + " " + indices.join("");
	$('#braille_indices').val($.trim(new_textarea));
	// Return false in order to prevent the browser from going to the top of page
	// when clicking on an image.
	return false;
}



































