const lowerCaseLetters = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];
const upperCaseLetters = [
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
const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

const getSesionId = (length) => {
  let result = "";
  for (let i = 0; i < length / 3; i++) {
    result +=
      lowerCaseLetters[
        Math.floor(
          Math.random(lowerCaseLetters.length) * lowerCaseLetters.length
        )
      ] +
      upperCaseLetters[
        Math.floor(
          Math.random(upperCaseLetters.length) * upperCaseLetters.length
        )
      ] +
      digits[Math.floor(Math.random(digits.length) * digits.length)];
  }
  return result;
};
