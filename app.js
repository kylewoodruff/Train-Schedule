var firstTime = "";
var frequency = "";
var currentTime = moment();
var trainName = "";
var destination = "";

function convertTime(time) {
  var timeConverted = moment(time, "HH:mm").subtract(1, "day");
  console.log(timeConverted);
  return timeConverted;
}

function getTimeToNext(time, freq) {
  let diffTime = moment().diff(moment(time), "minutes");
  console.log("time diff: ", diffTime);
  let remainder = diffTime % freq;
  console.log("Remainder: ", remainder);
  let minutes = freq - remainder;
  console.log("Remainder of diff & current: ", minutes);
  let nextTrain = moment().add(minutes, "minutes");
  console.log("Arrival Time: ", +moment(nextTrain).format("hh:mm"));
  return minutes, nextTrain;
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
    

    snapshot.forEach(function(childSnapshot) {
      var childKey = childSnapshot.key;
      var childData = childSnapshot.val();
      console.log(childKey, childData);
      let tempTime = childKey.equalTo('firstTrainTime').val();
      console.log("Specific Time: ",tempTime);
      


      
        

      // let startTime = snapshot.firstTime;
      // let storedFreq = snapshot.frequency;
      // let convtTime = convertTime(startTime);
      // getTimeToNext(convtTime, storedFreq);
      // console.log(getTimeToNext);
    });



    var newTR = $("<tr>").append(
      $("<td>").text(snapshot.val().trainName),
      $("<td>").text(snapshot.val().destination),
      $("<td>").text(snapshot.val().frequency),
      $("<td>").text("Empty Next Arr"),
      $("<td>").text("empty Minuets Away")
    );
    $("#train-table > tbody").append(newTR);
  });
});
