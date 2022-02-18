const { parseInput } = require('../src/index');
const { MINUTE, HOUR, DAYOFMONTH, MONTH, DAYOFWEEK } = require('../src/time');

describe("Parsing input with time unit", () => {
  // step intervals
  test('*/15 (minute) should return every 15 minute interval', () => {
    const input = "*/15";
    const output = parseInput(input, MINUTE);
    expect(output).toBe("0 15 30 45");
  });

  test('*/10 (hour) should return every 10 hour interval', () => {
    const input = "*/10";
    const output = parseInput(input, HOUR);
    expect(output).toBe("0 10 20");
  });

  test('*/10 (day of month) should return every 10 day of month interval', () => {
    const input = "*/10";
    const output = parseInput(input, DAYOFMONTH);
    expect(output).toBe("1 11 21 31");
  });

  // every interval
  test("* (day of week) should return every day of the week", () => {
    const input = "*";
    const output = parseInput(input, DAYOFWEEK);
    expect(output).toBe("0 1 2 3 4 5 6");
  });

  test("* (month) should return every month of the year", () => {
    const input = "*";
    const output = parseInput(input, MONTH);
    expect(output).toBe("1 2 3 4 5 6 7 8 9 10 11 12");
  });

 })