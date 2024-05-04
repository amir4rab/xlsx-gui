const EnAlphabet = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

/** Converts the column index into a string representation similar to spreadsheet softwares */
const indexToColumn = (i: number): string => {
  const dividedValue = parseInt(i / 26 + "");
  const value = (dividedValue + "").split("");
  const reminder = i % 26;

  // Cumulating the results in the res variable
  let res = "";

  // Looping throw the values and appending them to the res
  for (let i = 0; i < value.length; i++) {
    const v = +value[i];
    if (v > 0) res = res + EnAlphabet[v - 1];
  }

  // Appending the reminder
  res = res + EnAlphabet[reminder];

  return res;
};

export default indexToColumn;
