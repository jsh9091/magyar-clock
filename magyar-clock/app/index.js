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
  let rawHours = today.getHours();
  
  // 12h format
  let hours = rawHours % 12 || 12;

  // if the current time is in the PM show a dot after the clock
  let showPmDot = (rawHours >= 12)

  let mins = today.getMinutes()
  let displayMins = zeroPad(mins);
  
  clockLabel.text = `${hours}:${displayMins}` + (showPmDot ? "." : "");

  hungarianHourLabel.text = hungarianNums[hours] + " :"
  hungarianMinuteLabel.text = hungarianNums[mins]
}

const englishNums = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen", "Twenty", "Twenty-one", "Twenty-two", "Twenty-three", "Twenty-four", "Twenty-five", "Twenty-six", "Twenty-seven", "Twenty-eight", "Twenty-nine", "Thirty", "Thirty-one", "Thirty-two", "Thirty-three", "Thirty-four", "Thirty-five", "Thirty-six", "Thirty-seven", "Thirty-eight", "Thirty-nine", "Forty", "Forty-one", "Forty-two", "Forty-three", "Forty-four", "Forty-five", "Forty-six", "Forty-seven", "Forty-eight", "Forty-nine", "Fifty", "Fifty-one", "Fifty-two", "Fifty-three", "Fifty-four", "Fifty-five", "Fifty-six", "Fifty-seven", "Fifty-eight", "Fifty-nine", "Sixty"];

const hungarianNums = ["Nulla", "Egy", "Kettő", "Három", "Négy", "Öt", "Hat", "Hét", "Nyolc", "Kilenc", "Tíz", "Tizenegy", "Tizenkét", "Tizenhárom", "Tizennégy", "Tizenöt", "Tizenhat", "Tizenhét", "Tizennyolc", "Tizenkilenc", "Húsz", "Huszonegy", "Húszonkettő", "Huszonhárom", "Huszonnégy", "Huszonöt", "Huszonhat", "Huszonhét", "Huszonnyolc", "Huszonkilenc", "Harminc", "Harmincegy", "Harminckettő", "Harminchárom", "Harmincnégy", "Harmincöt", "Harminchat", "Harminchét", "Harmincnyolc", "Harminckilenc", "Negyven", "Negyvenegy", "Negyvenkét", "Negyvenhárom", "Negyvennégy", "Negyvenöt", "Negyvenhat", "Negyvenhét", "Negyvennyolc", "Negyvenkilenc", "Ötven", "Ötvenegy", "Ötvenkét", "Ötvenhárom", "Ötvennégy", "Ötvenöt", "Ötvenhat", "Ötvenhét", "Ötvennyolc", "Ötvenkilenc", "Hatvan"];
