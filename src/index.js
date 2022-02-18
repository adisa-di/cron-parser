const { type } = require('express/lib/response');
const {
  Step,
  Any,
  Range,
  StepChar,
  AnyChar,
  RangeChar,
  ListChar
} = require('./characters');

const {
  MINUTE,
  HOUR,
  DAYOFMONTH,
  MONTH,
  DAYOFWEEK
} = require('./time');

const specialChars = [new ListChar(), new StepChar(), new AnyChar(), new RangeChar()];

// check if any special characters exists
function parseInput(input, unit) {
  let reg;
  for (let i = 0; i < specialChars.length; i++) {
    if (specialChars[i].contains(input)) {
      reg = specialChars[i];
      break;
    }
  }

  console.log(reg);

  switch(reg.constructor.name) {
    case "ListChar":
      return reg.process(input);
    case "StepChar":
      const value = reg.getValue(input);
      return reg.process(value, unit);
    case "AnyChar":
      return reg.process(unit);
    case "RangeChar":
      reg.getValue(input);
      return reg.process();
    default:
      break;
  }
}

// processes args and prints out answer
function getArgs() {
  return process.argv.slice(2)[0];
}

function main() {
  const args = getArgs().split(" ");
  const argsOrder = [MINUTE, HOUR, DAYOFMONTH, MONTH, DAYOFWEEK];
  const SPACES = 15;

  let output = "";

  for (let i = 0; i < argsOrder.length; i++) {
    const unit = argsOrder[i];
    const rowLabel = unit.padEnd(SPACES, " ");
    output += `${rowLabel}${parseInput(args[i], unit)}\n`;
  }
  output += `${"command".padEnd(SPACES, " ")}${args[5]}`

  return output;
}

if (!!getArgs()) {
  console.log(main());
}

module.exports = {
  parseInput,
  getArgs,
  main
}
