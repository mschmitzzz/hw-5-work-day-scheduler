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

  function eventExists(scheduleItem, dayEvent) {
    for (var i = 0; i < scheduleItem.length; i++) {
      if (scheduleItem[i].hour === dayEvent.hour) {
        i = scheduleItem.length;
        return true;
      }
    }
    return false;
  }
  
  /* When the save button is clicked the item is saved to the local storage */
  $(".container").on("click", ".saveBtn", function (event) {
    var target = $(event.currentTarget);
    var rowItem = target.parent();
    var dayEvent = {
      hour: rowItem.children(".hour").text(),
      event: rowItem.children(".event").val(),
    };
  
    // Checks to make sure the event is not null
    if (dayEvent.event !== "") {
      // Checks to make sure that scheduleItem is not empty
      scheduleItem = JSON.parse(localStorage.getItem("scheduleItem"));
      if (scheduleItem) {
        if (scheduleItem.length !== 0) {
          if (eventExists(scheduleItem, dayEvent)) {
            for (var i = 0; i < scheduleItem.length; i++) {
              if (scheduleItem[i].hour === dayEvent.hour) {
                scheduleItem[i] = dayEvent;
                i = scheduleItem.length;
              }
            }
          } else {
            scheduleItem.push(dayEvent);
          }
        }
      } else {
        scheduleItem = [dayEvent];
      }
  
      localStorage.setItem("scheduleItem", JSON.stringify(scheduleItem));
    }
  });

  
  init();