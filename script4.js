let randomNumber = parseInt(Math.random() *100 +1);

const submit = document.querySelector('#submit');
const userInput = document.querySelector('#guessfield');
const guessSlot = document.querySelector('.guesses');
const remaining = document.querySelector('.lastresult');
const lowOrhigh = document.querySelector('.lowOrhi');
const startOver = document.querySelector('.resultparas');

const p = document.createElement('p');

let prevguess = []
let numGuess = 1
let playGame = true

if(playGame){
    submit.addEventListener('click' , function(e){
        e.preventDefault()
        const guessNumber = parseInt(userInput.value)
        validateGuess(guessNumber);
    })
}
function validateGuess(guess) {
    if(isNaN(guess)){
        alert("Please Enter a valid Number")
    }
    else if(guess<1){
        alert("Please enter number greater than 1")
    }
    else if(guess>100){
        alert("Please enter a number less than 100")
    }
    else{
        prevguess.push(guess)
        if(numGuess === 10){
            clearguess(guess)
            displayMessage(`Game Over . Random Number Was ${randomNumber}`)
            endGame();
        }
        else{
            clearguess(guess);
            checkGuess(guess);
        }
    }
}

function checkGuess(guess) {
    if(guess === randomNumber){
        displayMessage(`You guessed it right`)
        endGame();
    }
    else if(guess<randomNumber){
        displayMessage(`Number is too Low`)
    }
    else if(guess>randomNumber){
        displayMessage(`Number is too High`)
    }
}

function clearguess(guess){
    userInput.value =''
    guessSlot.innerHTML += `${guess} , `
    numGuess++;
    remaining.innerHTML = `${11-numGuess}`
}  

function displayMessage(message) {
    lowOrhigh.innerHTML = `<h2>${message}</h2>`;
}

function endGame() {
    userInput.value = ''
    userInput.setAttribute('disabled' , '')
    p.classList.add('button')
    p.innerHTML = `<h2 id="newgame"> Start New Game </h2>`
    startOver.appendChild(p)
    playGame = false
    startGame();
}

function startGame() {
    const newgamebutton = document.querySelector('#newgame')
    newgamebutton.addEventListener('click' , function(e){
        console.log(e);
        randomNumber = parseInt(Math.random() *100 +1);
        prevguess = []
        numGuess = 1
        guessSlot.innerHTML = ``
        remaining.innerHTML = `${11-numGuess}`
        userInput.removeAttribute('disabled')
        startOver.removeChild(p)
        displayMessage(``)
        playGame = true

    })
}