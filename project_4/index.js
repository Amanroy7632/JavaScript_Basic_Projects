const submitBtn =document.querySelector('#btn');
let randomNum=parseInt(Math.random() *100 +1);
// console.log(randomNum);
// console.log(submitBtn);
const guessSlot=document.querySelector('.guesses');
const remainingSlot=document.querySelector('.lastResult');
const lowOrHi=document.querySelector('.lowOrHi');
const startAgain=document.querySelector('.results');
const num=document.querySelector('#inp-num');
const startAgainP=document.createElement('p');
let prevGuess=[];
let guessCount=1;
let playGame=true;
if(playGame){
    submitBtn.addEventListener('click',(event)=>{
        event.preventDefault()
        const guess=parseInt(num.value);
        if(validateGuess(guess)){

        }else{
            // alert("Please enter a Valid number")
            displayMessage("Invalid Input");
        }
        // console.log(guess);
        // console.log(event.target.id);
    })
}
function validateGuess(guess){
    if(guess===''||guess===undefined || isNaN(guess)){
        alert("Please enter a Valid number")
        return false
    }else if(guess<1){
        alert("Please enter a number greater than 0")
        return false 
    }
    else if(guess>100){
        alert("Please enter a number less than 100")
        return false 
    }else{
        prevGuess.push(guess);
        if(guessCount>10){
            alert("Oops you have reached the maximum attempts")
            displayMessage(`Game Over , Random number was ${randomNum}`)
            endGame();
        }else{
            dispGuess(guess);
            checkGuess(guess);
        }
    }
    return true;
}
function checkGuess(guess){
   if(guess===randomNum){
    displayMessage(`You gussed it right`)
    endGame()

   }else if(guess<randomNum){
    displayMessage(`Number is too LOW`)
   }else if(guess>randomNum){
    displayMessage(`Number is too HIGH`)
   }
}
function dispGuess(guess){
   num.value=''
   guessSlot.innerHTML+=`${guess} `
   guessCount++;
   remainingSlot.innerHTML=`${11-guessCount}`
}
function displayMessage(message){
  lowOrHi.innerHTML=`<h2>${message}</h2>`;
}
function newGame(){
    randomNum=parseInt(Math.random() *100 +1);
    num.value=''
    num.removeAttribute('disabled');
    submitBtn.removeAttribute('disabled');
    playGame=true
    guessCount=1
    prevGuess=[]
    remainingSlot.innerHTML=`10`
    guessSlot.innerHTML=``
    startAgain.removeChild(startAgainP);
    displayMessage("New Game Started..")
}
function endGame(){
    num.value=''
    num.setAttribute('disabled','')
    submitBtn.setAttribute('disabled','')
    playGame=false
    startAgainP.innerHTML=`<p id="st-again">Start Again</p>`
    startAgain.appendChild(startAgainP);
}
startAgainP.addEventListener('click',(e)=>{
    e.preventDefault();
    newGame();
})
