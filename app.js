var firstTime = "";
var frequency = "";
var currentTime = moment();
var trainName = "";
var destination = "";

function convertTime(time) {
  var timeConverted = moment(time, "HH:mm").subtract(1, "year");
  //var timeConverted = moment(time, "HH:mm");
  //timeConverted.subtract(1,"year");
  //console.log("In convertTime Func:", timeConverted);
  return timeConverted;
}
// moment("123", "hmm").format("HH:mm") === "01:23"

function minToNext(time, freq) {
  let diffTime = moment().diff(moment(time), "minutes");
  console.log("time diff: ", diffTime);
  let remainder = diffTime % freq;
  console.log("Remainder: ", remainder);
  let minutes = freq - remainder;
  console.log("Remainder of diff & current: ", minutes);
  return minutes;
}

function timeToNext(minutes) {
  let nextTrain = moment().add(minutes, "minutes");
  let formatTime = nextTrain.format("hh:mm A");
  //console.log("Next T:",nextTrain);
  //console.log("Arrival Time: ", + moment(nextTrain).format("HH:mm"));
  return formatTime;
}

$(document).ready(function() {
  $("#submit").on("click", function() {
    event.preventDefault();

    firstTime = $("#first-train")
      .val()
      .trim();
    frequency = $("#frequency")
      .val()
      .trim();
    trainName = $("#train-name")
      .val()
      .trim();
    destination = $("#destination")
      .val()
      .trim();

    database.ref().push(
      {
        trainName: trainName,
        destination: destination,
        firstTrainTime: firstTime,
        frequency: frequency
      },
      function(error) {
        if (error) {
          console.log("The write failed...");
        } else {
          console.log("Data saved successfully!");
        }
      }
    );
  });

  // TODO: need help here trying to get on the child element the first time and the duration.
  database.ref().on("child_added", function(snapshot) {
    // console.log(snapshot.val().trainName);
    // console.log(snapshot.val().destination);
    // console.log(snapshot.val().firstTrainTime);
    // console.log(snapshot.val().frequency);
    var jsonObj = snapshot.exportVal();
    //console.log(jsonObj);

    var jsonTime = jsonObj.firstTrainTime;
    console.log(jsonTime);
    var c = convertTime(jsonTime);
    var b = parseInt(jsonTime);

    var jsonFreq = jsonObj.frequency;
    console.log(jsonFreq);
    var a = parseInt(jsonFreq);

    var minsToNext = minToNext(c, a);
    console.log(minsToNext);

    var nextTrain = timeToNext(minsToNext);
    console.log("Next Train Time:", nextTrain);

    var newTR = $("<tr>").append(
      $("<td>").text(snapshot.val().trainName),
      $("<td>").text(snapshot.val().destination),
      $("<td>").text(snapshot.val().frequency),
      $("<td>").text(nextTrain),
      $("<td>").text(minsToNext)
    );
    $("#train-table > tbody").append(newTR);
  });
});
