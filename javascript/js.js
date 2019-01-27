var config = {
	apiKey: "AIzaSyA2V8cDUnQNnrQ_jZOhT0ua_7aNDE4XaAM",
	authDomain: "trains-cf96b.firebaseapp.com",
	databaseURL: "https://trains-cf96b.firebaseio.com",
	projectId: "trains-cf96b",
	storageBucket: "trains-cf96b.appspot.com",
	messagingSenderId: "214546262667"
};
firebase.initializeApp(config);

var database = firebase.database();

$(document).ready(function () {

	$("#submit").on("click", function () {

		var trainName = $("#name").val().trim();
		var trainDest = $("#destination").val().trim();
		var firstTrain = moment($("#first-train").val().trim(), "HH:mm").format("X");
		var frequency = $("#frequency").val().trim();

		var newTrain = {
			name: trainName,
			dest: trainDest,
			firstTrain: firstTrain,
			freq: frequency
		};

		database.ref().push(newTrain);

		$("#name").val("");
		$("#destination").val("");
		$("#time").val("");
		$("#frequency").val("");

		return false;
	});

	database.ref().on("child_added", function (childSnapshot, prevChildKey) {

		var dataName = childSnapshot.val().name;
		var dataDest = childSnapshot.val().dest;
		var dataFreq = childSnapshot.val().freq;
		var dataFirst = childSnapshot.val().firstTrain;

		var minLeft = moment().diff(moment.unix(dataFirst), "minutes") % dataFreq;
		var minutes = dataFreq - minLeft;
		var arrivalTime = moment().add(minutes, "m").format("hh:mm A");

		var newRow = $("<tr>").append(
			$("<td>").text(dataName),
			$("<td>").text(dataDest),
			$("<td>").text(dataFreq),
			$("<td>").text(arrivalTime),
			$("<td>").text(minutes),
		);
		$("#train-table").append(newRow);
	})

});