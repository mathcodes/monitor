var fs = require('fs')

let wordsTXT = fs.readFileSync('words.txt', 'utf-8')
console.log('wordsTXT', wordsTXT)

let wordsArray = wordsTXT.split('\n')
console.log('wordsArray', wordsArray)

let json = JSON.stringify(wordsArray, null, 2)
fs.writeFileSync('wordsDB.json', json)
