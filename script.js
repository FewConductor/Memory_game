// localStorage.clear();

let covers;
let first;
let second;
let guess1;
let guess2;
let firstGuessIndex;
let secondGuessIndex;
let highScoreDisplay = document.querySelector(".highScoreDisplay");
let highScoreCongrats = document.querySelector(".highScoreCongrats");
let tileHighScore;
let sec = 0;
let min = 0;
let seconds;
let minutes;
let timeTaken = document.querySelector(".time");
let clock;
let clockRunning;
let winningTime = document.querySelector(".winningTime");
let tileFastestTime;
let fastestTimeCongrats = document.querySelector(".fastestTimeCongrats");

let restart = document.querySelectorAll(".restart");

let count = 0;
let moves = document.querySelector(".moves");
let winningMoves = document.querySelector(".winningMoves");
let tileDisplay = document.querySelector(".tileNo");

let array1 = [];
let array2 = [];

let score = 0;
let congratulations = document.querySelector(".congratulations");

let container = document.querySelector(".container");
let pregame = document.querySelector(".pregame");
let tileNo;
let tiles = document.querySelectorAll(".tiles");
tiles.forEach((t) => {
    t.addEventListener("click", (g) => {

        // ! Set the number of tiles

        tileNo = g.currentTarget.textContent;
        pregame.classList.add("hidden");
        console.log(tileNo);
        for (let z = 0; z < tileNo; z++) {
            container.innerHTML += `<div class="square">
                                <p>A</p>
                                <div class="cover"></div>
                            </div>`
        };
        tileDisplay.innerHTML = tileNo;

        // ! Set the high score display

        tileHighScore = 'HighScore' + tileNo;
        let currentHighScore = localStorage.getItem(tileHighScore);
        if (currentHighScore > 0) {
            highScoreDisplay.innerHTML = currentHighScore;
        };

        // ! Set the timer going

        tileFastestTime = 'FastestTime' + tileNo;
        let currentFastestTime = localStorage.getItem(tileFastestTime);

        clock = function () {
            if (sec < 59) {
                sec++;
            } else {
                min++;
                sec = 0;
            }
            seconds = ('0' + sec).slice(-2);
            minutes = ('0' + min).slice(-2);
            timeTaken.innerHTML = `${minutes}:${seconds}`;
        }
        clockRunning = setInterval(clock, 1000);

        // ! Set the initial letters randomly

        let figures = document.querySelectorAll("p");
        console.log(figures);
        let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let characters = alphabet.slice(0, figures.length / 2);
        console.log(characters);

        figures.forEach((item) => {
            let figure = characters.charAt(Math.floor(Math.random() * characters.length));
            if (!array1.includes(figure)) {
                array1.push(figure);
            } else if (!array2.includes(figure)) {
                array2.push(figure);
                characters = characters.replace(figure, '');
            };
            item.innerHTML = figure;
        });
        covers = document.querySelectorAll(".cover");
        first = array1.sort();
        second = array2.sort();

        // ! Deal with the guesses being made

        let x = 0;

        covers.forEach((i) => {
            i.addEventListener("click", (e) => {
                // ! Add or remove covers
                if (x < 2) {
                    e.currentTarget.classList.add("hidden");
                    x++;
                }
                // ! Identify the guesses
                if (x == 1) {
                    guess1 = e.currentTarget;
                    let firstGuess = e.currentTarget.previousElementSibling.textContent;
                    firstGuessIndex = first.indexOf(firstGuess);
                } else if (x == 2) {
                    guess2 = e.currentTarget;
                    let secondGuess = e.currentTarget.previousElementSibling.textContent;
                    secondGuessIndex = second.indexOf(secondGuess);
                }
                // ! Check if the guesses match: remove covers permanently, reveal congratulations message, store high score to local storage
                if (x == 2) {
                    x++;
                    count++;
                    moves.innerHTML = count;
                    // ? If the guess is correct
                    if (firstGuessIndex == secondGuessIndex) {
                        guess1.classList.add("show");
                        guess2.classList.add("show");
                        x = 0;
                        score++;
                        // ? If the game is won
                        if (score >= figures.length / 2) {
                            // ? Update and reveal congratulations message
                            congratulations.classList.remove("hidden");
                            if (count == 1) {
                                winningMoves.innerHTML = count + ' move';
                            } else {
                                winningMoves.innerHTML = count + ' moves';
                            };
                            seconds = ('0' + sec).slice(-2);
                            minutes = ('0' + min).slice(-2);
                            winningTime.innerHTML = `${minutes}:${seconds}`
                            // ? Store high score
                            if (currentHighScore == undefined || count < currentHighScore) {
                                localStorage.removeItem(tileHighScore);
                                localStorage.setItem(tileHighScore, count);
                            }
                            // ? Update high score in congratulations message
                            currentHighScore = localStorage.getItem(tileHighScore);
                            if (currentHighScore > 0) {
                                highScoreCongrats.innerHTML = currentHighScore;
                            };
                            // ? Store the fastest speed and stop clock running
                            winningTime = sec + (min * 60);
                            if (currentFastestTime == undefined || winningTime < currentFastestTime) {
                                localStorage.removeItem(tileFastestTime);
                                localStorage.setItem(tileFastestTime, winningTime);
                            }
                            clearInterval(clockRunning);
                            // ? Update fastest speed in congratulations message
                            currentFastestTime = localStorage.getItem(tileFastestTime);
                            if (currentFastestTime != undefined) {
                                let currentFastestTimeMin = Math.floor(currentFastestTime / 60);
                                let currentFastestTimeSec = currentFastestTime - (currentFastestTimeMin * 60);
                                let currentFastestTimeMinutes = ('0' + currentFastestTimeMin).slice(-2);
                                let currentFastestTimeSeconds = ('0' + currentFastestTimeSec).slice(-2);
                                fastestTimeCongrats.innerHTML = `${currentFastestTimeMinutes}:${currentFastestTimeSeconds}`;
                            }
                        };
                        // ? If the guess is incorrect
                    } else {
                        setTimeout(() => {
                            covers.forEach((k) => { k.classList.remove("hidden") });
                            x = 0;
                        }, 1250)
                    }
                    guess1 = "";
                    guess2 = "";
                };
            });
        });
    });
});

// ! Restart buttons

restart.forEach((f) => {
    f.addEventListener("click", () => {
        location.reload();
    });
});