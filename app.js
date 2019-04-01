var firstTime = "";
var frequency = "";
var currentTime = moment();
var trainName = "";
var destination = "";

function convertTime(time) {
  var timeConverted = moment(time, "HH:mm").subtract(1, "year");
  //var timeConverted = moment(time, "HH:mm");
  //timeConverted.subtract(1,"year");
  console.log("In convertTime Func:", timeConverted);
  return timeConverted;
}
// moment("123", "hmm").format("HH:mm") === "01:23"

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

    console.log(snapshot.val().trainName);
    console.log(snapshot.val().destination);
    console.log(snapshot.val().firstTrainTime);
    console.log(snapshot.val().frequency);
    
    var tempTrainTime = snapshot.val().firstTrainTime;
    console.log("Temp Time: ",tempTrainTime);

    var convertedTime = convertTime(tempTrainTime);
    console.log(convertedTime);
    
 
    // Retrieve new posts as they are added to our database
    snapshot.forEach(function(childSnapshot) {
      var childfreq = childSnapshot.val().frequency;
      var childData = childSnapshot.val();
      console.log("frequency: ",childfreq, childData);
    

    //   if (childKey === 'firstTrainTime') {
    //       tempTime = childData;
    //       console.log("Time from loop", tempTime);
    //       convertedTime = convertTime(tempTime);
    //       console.log("Converted TIme:", convertedTime);
          
    //   } else if (childKey === 'frequency') {
    //     tempFreq = childData;
    //     console.log('Freq from loop', tempFreq);
    //   }
      
      


      
        

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
