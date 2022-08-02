var now = moment().local();
var scheduleItem = [];
var startTime = 7;
var endTime = 22;

function init() {
    setToday();
    createSchedule();
  }
  
  /* Writes the html for the calendar to display on the page */
  function createSchedule() {
    for (var i = startTime; i <= endTime; i++) {
      var hour = moment(i, "H").format("hA");
  
      $(".container").append(`<div class="row">
          <div class="col-1 hour" id="hour${i}">${hour}</div>
          <input class="col-9 textArea event" id="time${i}"></input>
          <i class="fas fa-save col-1 saveBtn"></i>
          <i class="fa fa-trash col-1 deleteBtn"></i>
        </div>`);
    }
  }

  function setToday() {
    var todDate = now.format("dddd, MMMM Do");
    $("#currentDay").addClass("time-block");
    $("#currentDay").text(todDate);
  }  
  
  init();