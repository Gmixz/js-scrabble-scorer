// inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85

const input = require("readline-sync");

// OLd Scramble Score Mehtod
const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

/* const newPointStructure = {
  'a': 1,
  'b': 3,
  'c': 3,
  'd': 2,
  'e': 1,
  'f': 4,
  'g': 2,
  'h': 4,
  'i': 1,
  'j': 8,
  'k': 5,
  'l': 1,
  'm': 3,
  'n': 1,
  'o': 1,
  'p': 3,
  'q': 10,
  'r': 1,
  's': 1,
  't': 1,
  'u': 1,
  'v': 4,
  'w': 4,
  'x': 8,
  'y': 4,
  'z': 10,
}; */

const newPointStructure = transform(oldPointStructure); // easier method

function oldScrabbleScorer(word) {
  word = word.toUpperCase();
  let letterPoints = "";

  for (let i = 0; i < word.length; i++) {

    for (const pointValue in oldPointStructure) {

      if (oldPointStructure[pointValue].includes(word[i])) {
        letterPoints += `Points for '${word[i]}':           
        ${pointValue}\n`
      }
    }
  }
  return letterPoints;
}

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

let userWord, userChoice;

function initialPrompt() {
  console.log("Let's play some Scrabble!");
  console.log();
  console.log();
  userWord = input.question('Enter a word to score: '); //user Input
  console.log('Which scoring algorithm would you like to use?');
  console.log();
  console.log();
  console.log('0 - Simple: One point per character')
  console.log('1 - Vowel Bonus: Vowels are worth 3 points')
  console.log('2 - Scrabble: Uses scrabble point system')

  userChoice = input.question('Enter 0, 1, or 2: '); // user Input
  
  let reg = new RegExp('^[0-2]*$'); // Only allows valid value

    while (reg.test(userChoice) == false) { // checks user input for valid values

      let userChoiceBonus = input.question("You must enter a valid number 0, 1, or 2 : ");

      userChoice = userChoiceBonus;
  }
    return userChoice;
}

let simpleScore = {
  name: 'Simple Score',
  description: 'Each letter is worth 1 point.',
  scoreFunction: function simpleScore(word) {
    word = word.toUpperCase(); // case insensitive
    let score = 0;

    for (let i = 0; i < word.length; i++) {
      score++;
    }
    return score
  }
}

let vowelBonusScore = {
  name: 'Bonus Vowels',
  description: 'Vowels are 3 pts, consonants are 1 pt.',
  scoreFunction: function vowelBonusScore(word) {
    word = word.toLowerCase(); // case insensitive
    let score = 0;
    let vowels = ['a', 'e', 'i', 'o', 'u'];

    for (let i = 0; i < word.length; i++) {
      
      if (vowels.includes(word[i])) { // checks for vowels
        score += 3;
      }

      else {

        score++;
      }
    }
    return score;
  }
}

let scrabbleScore = {
  name: 'Scrabble',
  description: 'The traditional scoring algorithm.',
  scoreFunction: function oldScrabbleScorer(word) {
    word = word.toUpperCase(); // case insensitive
    let score = 0;

    for (let i = 0; i < word.length; i++) {

      for (const pointValue in newPointStructure) {

        if (pointValue.toString() === word[i]) {
          score += Number(newPointStructure[pointValue]);
        }
      }
    }
    return score;
  }
}

const scoringAlgorithms = [simpleScore, vowelBonusScore, scrabbleScore];

function scorerPrompt(scoreSelection, word) {

  return scoringAlgorithms[scoreSelection].scoreFunction(word);
}

function transform(oldPointStructure) { //rotates my element on OldPointStructure to match what newPointStructure wants
  let newObject = {};

    for (key = 0; key < 11; key++) {

      for (item in oldPointStructure) {
      newObject[oldPointStructure[item][key]] = item;
    }
  }
  // deleting empty space 
  delete newObject.undefined;
  return newObject;
}

function runProgram() {
  initialPrompt();
  let score = scorerPrompt(userChoice, userWord);
  console.log(`Score for '${userWord}': ${score}`);
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
  initialPrompt: initialPrompt,
  transform: transform,
  oldPointStructure: oldPointStructure,
  simpleScore: simpleScore,
  vowelBonusScore: vowelBonusScore,
  scrabbleScore: scrabbleScore,
  scoringAlgorithms: scoringAlgorithms,
  newPointStructure: newPointStructure,
  runProgram: runProgram,
  scorerPrompt: scorerPrompt
};