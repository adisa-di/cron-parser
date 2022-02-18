const { ranges, MINUTE } = require("./time");

// enums for special chars
const Step = Symbol("StepChar");
const Any = Symbol("AnyChar");
const Range = Symbol("RangeChar");

class SpecialChar {
  constructor(name, regex) {
    this.name = name;
    this.regex = regex;
  }

  parse(arg) {
    const re = new RegExp(this.regex);
    return re.exec(arg);
  }

  // parser doesn't return null
  contains(arg) {
    return !!this.parse(arg);
  }
}

// missing , operator 

class StepChar extends SpecialChar {
  constructor() {
    super(Step, "\\*/");
  }

  getValue(exp) {
    const reg = new RegExp("[0-9]+").exec(exp);
    return parseInt(reg[0]);
  }

  process(value, timeUnit) {
    const output = [];
    const range = ranges[timeUnit];
    let start = range.from;
    const stop = range.to;

    for (let i=start; i <= stop; i += value) {
      output.push(i);
    }

    return output.join(" ");
  }
}

class AnyChar extends SpecialChar {
  constructor() {
    super(Any, "\\*");
  }

  getValue() {
    return -1;
  }

  process(timeUnit) {
    const output = []; 

    const range = ranges[timeUnit];
    let start = range.from;
    const stop = range.to;

    for (let i=start; i <= stop; i+=1) {
      output.push(i);
    }

    return output.join(" ");
  }
}

class RangeChar extends SpecialChar {

  from = 0;
  to = 0;

  constructor() {
    super(Range, "\\-");
  }

  getValue(exp) {
    const range = exp.split("-");
    this.from = parseInt(range[0]);
    this.to = parseInt(range[1]);
  }

  process() {
    const output = []; 
    const start = this.from;
    const stop = this.to;

    for (let i = start; i <= stop; i += 1) {
      output.push(i);
    }
    
    return output.join(" ");
  }
}

module.exports = {
  // enums
  Step,
  Any,
  Range,

  // classes
  StepChar,
  AnyChar,
  RangeChar
}