var now = moment().local();
var scheduleItem = [];
var startTime = 7;
var endTime = 22;

function init() {
    setDate();
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
    fillScheduleEvents();
  }

// sets date at top of page to the current date
  function setDate() {
    var todDate = now.format("dddd, MMMM Do");
    $("#currentDay").addClass("time-block");
    $("#currentDay").text(todDate);
  }  

  /* Fills the calendar with the applicable events that have been saved for that time span */
function fillScheduleEvents() {
    scheduleItem = JSON.parse(localStorage.getItem("scheduleItem"));
    if (scheduleItem) {
      scheduleItem.forEach(function (item) {
        var time = moment(item.hour, "hA").format("H");
        var idName = "#time" + time;
        $(idName).val(item.event);
      });
    }
  }

  
  init();