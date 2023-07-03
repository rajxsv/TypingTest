// English word list
const wordList = [
    'apple', 'banana', 'cat', 'dog', 'elephant', 'flower', 'guitar', 'house', 'ice cream', 'jungle',
    'kangaroo', 'lamp', 'mountain', 'night', 'ocean', 'piano', 'queen', 'rainbow', 'sun', 'tree',
    'umbrella', 'violet', 'water', 'xylophone', 'yoga', 'zebra'
    // Add more words as needed
];

function getRandomWord() {
    const randomIndex = Math.floor(Math.random() * wordList.length);
    return wordList[randomIndex];
}

function generateRandomString(minLength, maxLength) {
    let result = '';

    while (result.length < maxLength) {
        const word = getRandomWord();
        const wordLength = word.length;
        const randomIndex = Math.floor(Math.random() * wordLength);
        result += word.substring(0, randomIndex + 1) + ' ' + word.substring(randomIndex + 1);
        if (result.length > maxLength) {
            result = result.substring(0, maxLength); // Trim the string if it exceeds the maxLength
        }
    }

    if (result.length < minLength) {
        return generateRandomString(minLength, maxLength); // Retry if the generated string is too short
    }

    return result.trim(); // Trim any leading or trailing spaces
}

function generateRandomArray() {
    const array = [];
    const minStringLength = 60;
    const maxStringLength = 90;
    const arrayLength = 40;

    for (let i = 0; i < arrayLength; i++) {
        const randomStringLength = Math.floor(Math.random() * (maxStringLength - minStringLength + 1)) + minStringLength;
        const randomString = generateRandomString(minStringLength, randomStringLength);
        array.push(randomString);
    }

    return array;
}

const setOfWords = generateRandomArray();
const msg = document.getElementById('heading1');
const typedwords = document.getElementById('typedwords')
const btn = document.getElementById('btn')
let startTime, endTime;

const playGame = () => {
    let randomNum = Math.floor(Math.random() * setOfWords.length);
    msg.innerText = setOfWords[randomNum]

    let date = new Date();
    startTime = date.getTime()
    
}

const endPlay = () => {
    let date = new Date();
    endTime = date.getTime()
    let totalTime = ((endTime - startTime) / 1000)
    console.log(totalTime)
    
    let totalStr = typedwords.value;
    let wordCount = wordCounter(totalStr);
    let speed = Math.round((wordCount/totalTime)*60)

    let finalMsg =  `You typed at ${speed} words per minute`
    finalMsg+=compareWords(msg.innerText,totalStr)
    msg.innerText = finalMsg
}

const compareWords = (str1,str2) => {
    let words1 = str1.split(" ")
    let words2 = str2.split(" ")
    let cnt  = 0

    words1.forEach(function(item,index){
        if(item == words2[index]){
            cnt++;
        }
    })

    let errorWords = ` ${cnt} correct out of ${words2.length} words`
    return errorWords
}
const wordCounter = (str) => {
    let response = str.split(" ").length
    console.log(response)
    return response
}

btn.addEventListener('click', function () {
    // console.log(this)
    if (this.innerText == 'Start') {
        typedwords.disabled = false;
        playGame()
        this.innerText = "Done"
    } else {
        endPlay()
        this.innerText = "Start"
    }
})
