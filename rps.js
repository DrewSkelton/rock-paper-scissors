// Button declarations
let cpu_choice = '';
let player_choice = '';
let wins = 0;
let losses = 0;
let win_percentage = 0;
let streak = 0;
let highest_winstreak = 0;
let highest_winstreak_odds = 1;

let user_rock = document.getElementById("user-rock");
let user_paper = document.getElementById("user-paper");
let user_scissors = document.getElementById("user-scissors");
const result_text = document.getElementById("result");
const wins_text = document.getElementById("wins");
const losses_text = document.getElementById("losses");
const win_percentage_text = document.getElementById("win-percentage");
const streak_text = document.getElementById("streak");
const highest_winstreak_text = document.getElementById("highest-streak");
const highest_winstreak_odds_text = document.getElementById("highest-streak-odds");

const choices = ["cpu-rock", "cpu-paper", "cpu-scissors"];

user_rock.addEventListener('click', () => {
    user_rock = removeAllListeners(user_rock);
    firstPress();
})

function firstPress() {
    result_text.innerHTML = "ROCK";
    cpuFlash("cpu-rock");
    user_rock = removeAllListeners(user_rock);
    user_rock.addEventListener('click', () => (secondPress()))
}
function secondPress(){
    result_text.innerHTML = "PAPER";
        cpuFlash("cpu-rock");
        user_rock = removeAllListeners(user_rock);
        user_rock.addEventListener('click', () => (thirdPress()))
}

function thirdPress(){
    result_text.innerHTML = "SCISSORS";
    cpuFlash("cpu-rock");
    user_rock = removeAllListeners(user_rock);

    user_rock.addEventListener('click', () => {
        cpuSelectRandom();
        result_text.innerHTML = "SHOOT!";
        clearListeners();
        console.log("player choice: " + player_choice);
        setTimeout(() => gameResult(), 300);
        return 0;
    })

    user_paper.addEventListener('click', () => {
        cpuSelectRandom();
        result_text.innerHTML = "SHOOT!";
        clearListeners();
        console.log("player choice: " + player_choice);
        setTimeout(() => gameResult(), 300);
        return 0;
    })
    
    user_scissors.addEventListener('click', () => {
        cpuSelectRandom();
        result_text.innerHTML = "SHOOT!";
        clearListeners();
        console.log("player choice: " + player_choice);
        setTimeout(() => gameResult(), 300);
        return 0;
    })
}


function userSelect (buttonName){
    player_choice = buttonName;
}

function cpuFlash (button){
    console.log("flashing " + button);
    let selectedButton = document.getElementById(button);
    selectedButton.classList.toggle('flashing');
    setTimeout(() => {selectedButton.classList.toggle('flashing')}, 100);
}

function cpuSelectRandom () {
    cpu_choice = choices[Math.floor((Math.random() * 3))];
    cpuFlash(cpu_choice);
    console.log("cpu choice: " + cpu_choice);
}


function gameResult () {
    if(player_choice === "user-rock"){
        
        switch (cpu_choice){
            case ("cpu-rock"):
                tie();
                break;
            case ("cpu-paper"):
                loss();
                break;
            case ("cpu-scissors"):
                win();
                break;
        }
    }

    if(player_choice === "user-paper"){
        switch (cpu_choice){
            case "cpu-rock":
                win();
                break;
            case "cpu-paper":
                tie();
                break;
            case "cpu-scissors":
                loss();
                break;
        }
    }

    if(player_choice === "user-scissors"){
        switch (cpu_choice){
            case "cpu-rock":
                loss();
                break;
            case "cpu-paper":
                win();
                break;
            case "cpu-scissors":
                tie();
                break;
        }
    }
}

function win () {
    result_text.innerHTML = "You win!!! Play again by pressing rock.";
    wins += 1;
    console.log(win_percentage);
    win_percentage = wins / (wins + losses) * 100;
    if(streak > 0){
        streak += 1;
    }
    else {
        streak = 1;
    }
    if(streak > highest_winstreak){
        highest_winstreak = streak;
        highest_winstreak_odds = (Math.pow(2, highest_winstreak));
    }

    wins_text.innerHTML = "Wins: " + wins;
    win_percentage_text.innerHTML = "Win Percentage: " + Math.floor(win_percentage) + "%";
    streak_text.innerHTML = "Win Streak: " + Math.abs(streak);
    highest_winstreak_text.innerHTML = "Highest Winstreak: " + highest_winstreak;
    highest_winstreak_odds_text.innerHTML = "(1 in " + highest_winstreak_odds + " chance)";

    determineColor();

    user_rock.addEventListener('click', () => {
        firstPress();
    })
}

function loss () {
    result_text.innerHTML = "You lose. Play again by pressing rock.";
    losses += 1;
    win_percentage = wins / (wins + losses) * 100;
    if(streak < 0){
        streak -= 1;
    }
    else {
        streak = -1;
    }
    losses_text.innerHTML = "Losses: " + losses;
    win_percentage_text.innerHTML = "Win Percentage: " + Math.floor(win_percentage) + "%";
    streak_text.innerHTML = "Loss Streak: " + Math.abs(streak);

    determineColor();

    user_rock.addEventListener('click', () => {
        firstPress();
    })
}
function tie () {
    result_text.innerHTML = "It's a tie! Play again by pressing rock.";
    user_rock.addEventListener('click', () => {
        firstPress();
    })
}

function removeAllListeners(element){
    let clone = element.cloneNode(true);
    element.parentNode.replaceChild(clone, element);
    return clone;
}
function clearListeners(){
    user_rock = removeAllListeners(user_rock);
    user_paper = removeAllListeners(user_paper);
    user_scissors = removeAllListeners(user_scissors);
}

function getCookie(wins, losses){
    
}
function setCookie(wins, losses) {
    
}

function determineColor() {
    if(streak <= -3 && streak > -5){
        document.body.style.backgroundColor = "rgb(161, 161, 255)";
    }
    if(streak <= -5){
        document.body.style.backgroundColor = "rgb(66, 66, 218)";
    }
    if(streak >= 3 && streak < 5){
        document.body.style.backgroundColor = "rgb(255, 255, 0)";
    }
    if(streak >= 5){
        document.body.style.backgroundColor = "rgb(251, 67, 0)";
    }
    if(streak >= 10){
        document.body.style.backgroundColor = "#940f00";
    }
    if(streak >= 15){
        document.body.style.backgroundColor = "#77029e";
    }
    if(streak >= 20){
        document.body.style.backgroundColor = "#21db72";
    }

    if (streak < 3 && streak > -3){
        document.body.style.backgroundColor = "#ffffff";
    }

}