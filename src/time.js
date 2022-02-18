const MINUTE = "minute";
const HOUR = "hour";
const DAYOFMONTH = "dayOfMonth";
const MONTH = "month";
const DAYOFWEEK = "dayOfWeek";

class TimeRange {
  from = 0;
  to = 0;

  constructor(from, to) {
    this.from = from;
    this.to = to;
  }

  /**
   * TODO: Error handling for inputs from the command line
   * @param {*} input 
   */
  checkRange(input) {

  }
  
}

// map of ranges for each unit
const ranges = {
  minute: new TimeRange(0, 59),
  hour: new TimeRange(0, 23),
  dayOfMonth: new TimeRange(1, 31),
  month: new TimeRange(1, 12),
  dayOfWeek: new TimeRange(0, 6)
}

module.exports = {
  MINUTE,
  HOUR,
  DAYOFMONTH,
  MONTH,
  DAYOFWEEK,
  ranges
}