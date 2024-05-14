import clock from "clock";
import * as document from "document";
import { preferences } from "user-settings";
import { today as activity } from "user-activity";
import { me as appbit } from "appbit";
import { battery } from "power";

function zeroPad(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

// Update the clock every minute
clock.granularity = "minutes";

// Get a handle on the <text> element
const stepCountLabel = document.getElementById("stepCountLabel");
const batteryLabel = document.getElementById("batteryLabel");
const clockLabel = document.getElementById("clockLabel");
const amPmLabel = document.getElementById("amPmLabel");
const hungarianHourLabel = document.getElementById("hungarianHourLabel");
const hungarianMinuteLabel = document.getElementById("hungarianMinuteLabel");

battery.onchange = (charger, evt) => {
  batteryLabel.text = battery.chargeLevel;
}

// Update the <text> element every tick with the current time
clock.ontick = (evt) => {

  // handle case of user permission for step counts is not there
  if (appbit.permissions.granted("access_activity")) {
    stepCountLabel.text = getSteps().pretty;
  } else {
    stepCountLabel.text = "-----";
  }

  let todayDate = evt.date;
  let rawHours = todayDate.getHours();
  
  // 12h format
  let hours = rawHours % 12 || 12;

  let mins = todayDate.getMinutes();
  let displayMins = zeroPad(mins);

  clockLabel.text = `${hours}:${displayMins}`

  amPmLabel.text = (rawHours >= 12) ? "PM" : "AM";

  hungarianHourLabel.text = hungarianNums[hours] + " :";
  hungarianMinuteLabel.text = hungarianNums[mins];
}

function getSteps() {
  let val = (activity.adjusted.steps || 0);
  return {
    raw: val,
    pretty: val > 999 ? Math.floor(val/1000) + "," + ("00"+(val%1000)).slice(-3) : val
  }
}

const englishNums = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen", "Twenty", "Twenty-one", "Twenty-two", "Twenty-three", "Twenty-four", "Twenty-five", "Twenty-six", "Twenty-seven", "Twenty-eight", "Twenty-nine", "Thirty", "Thirty-one", "Thirty-two", "Thirty-three", "Thirty-four", "Thirty-five", "Thirty-six", "Thirty-seven", "Thirty-eight", "Thirty-nine", "Forty", "Forty-one", "Forty-two", "Forty-three", "Forty-four", "Forty-five", "Forty-six", "Forty-seven", "Forty-eight", "Forty-nine", "Fifty", "Fifty-one", "Fifty-two", "Fifty-three", "Fifty-four", "Fifty-five", "Fifty-six", "Fifty-seven", "Fifty-eight", "Fifty-nine", "Sixty"];

const hungarianNums = ["Nulla", "Egy", "Kettő", "Három", "Négy", "Öt", "Hat", "Hét", "Nyolc", "Kilenc", "Tíz", "Tizenegy", "Tizenkét", "Tizenhárom", "Tizennégy", "Tizenöt", "Tizenhat", "Tizenhét", "Tizennyolc", "Tizenkilenc", "Húsz", "Huszonegy", "Húszonkettő", "Huszonhárom", "Huszonnégy", "Huszonöt", "Huszonhat", "Huszonhét", "Huszonnyolc", "Huszonkilenc", "Harminc", "Harmincegy", "Harminckettő", "Harminchárom", "Harmincnégy", "Harmincöt", "Harminchat", "Harminchét", "Harmincnyolc", "Harminckilenc", "Negyven", "Negyvenegy", "Negyvenkét", "Negyvenhárom", "Negyvennégy", "Negyvenöt", "Negyvenhat", "Negyvenhét", "Negyvennyolc", "Negyvenkilenc", "Ötven", "Ötvenegy", "Ötvenkét", "Ötvenhárom", "Ötvennégy", "Ötvenöt", "Ötvenhat", "Ötvenhét", "Ötvennyolc", "Ötvenkilenc", "Hatvan"];
