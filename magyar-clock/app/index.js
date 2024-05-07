import clock from "clock";
import * as document from "document";
import { preferences } from "user-settings";

function zeroPad(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

// Update the clock every minute
clock.granularity = "minutes";

// Get a handle on the <text> element
const clockLabel = document.getElementById("clockLabel");
const hungarianHourLabel = document.getElementById("hungarianHourLabel");
const hungarianMinuteLabel = document.getElementById("hungarianMinuteLabel");

// Update the <text> element every tick with the current time
clock.ontick = (evt) => {
  let today = evt.date;
  let hours = today.getHours();
  // 12h format
  hours = hours % 12 || 12;
  let mins = zeroPad(today.getMinutes());
  clockLabel.text = `${hours}:${mins}`;

  hungarianHourLabel.text = "Négy"
  hungarianMinuteLabel.text = "Negyvenkét"
}