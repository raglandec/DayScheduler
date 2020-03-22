$(function() {});

// today is the current day
var today = moment().format("dddd, MMMM Do");

// now is the current hour
var now = moment().format("H A");

// planWorkday entries for each hour of the workday
var planWorkday = [
	{ time: "9 AM", event: "" },
	{ time: "10 AM", event: "" },
	{ time: "11 AM", event: "" },
	{ time: "12 PM", event: "" },
	{ time: "1 PM", event: "" },
	{ time: "2 PM", event: "" },
	{ time: "3 PM", event: "" },
	{ time: "4 PM", event: "" },
	{ time: "5 PM", event: "" }
];

// adds local storage to checkPrevious var, and if needed updates planWorkday
var checkPrevious = JSON.parse(localStorage.getItem("dayPlanner"));
	if (checkPrevious !== null) {
	planWorkday = checkPrevious;
}
// displays the current day
$("#currentDay").text(today);

// creates the color for the row
planWorkday.forEach(function(timeBlock, index) {
	var timeLabel = timeBlock.time;
	var blockColor = colorMe(timeLabel);

	// variable containing the entire row, including the button
	var row =
		'<div class="time-block" id="' +
		index +
		'"><div class="row no-gutters input-group"><div class="col-sm col-lg-1 input-group-prepend hour justify-content-sm-end pr-3 pt-3">' +
		timeLabel +
		'</div><textarea class="form-control ' +
		blockColor +
		'">' +
		timeBlock.event +
		'</textarea><div class="col-sm col-lg-1 input-group-append"><button class="saveBtn btn-block" type="submit"><i class="fas fa-plus"></i></button></div></div></div>';

	// show entry rows
	$(".container-fluid").append(row);
});

// function for past, present, next color
function colorMe(time) {
	var planNow = moment(now, "H A");
	var planEntry = moment(time, "H A");
	if (planNow.isBefore(planEntry) === true) {
		return "future";
	} else if (planNow.isAfter(planEntry) === true) {
		return "past";
	} else {
		return "present";
	}
}

// save button
$(".saveBtn").on("click", function(event) {
	var blockID = parseInt(
		$(this)
			.closest(".time-block")
			.attr("id")
	);
	
	var userEntry = $.trim(
		$(this)
			.parent()
			.siblings("textarea")
			.val()
	);

	// saves the entry
	planWorkday[blockID].event = userEntry;

	// updates planWorkday local storage
	localStorage.setItem("dayPlanner", JSON.stringify(planWorkday));
});