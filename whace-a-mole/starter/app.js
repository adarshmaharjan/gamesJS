const square = document.querySelectorAll(".square")
const mole = document.querySelectorAll(".mole")

const timeLeft = document.getElementById("time-left")
let score = document.getElementById("score")

let result = 0
// let currentTime = timeLeft.textContent
currentTime = 10
let hitPosition
let timerId = null
let countTimerId = null

//remove any mole from grid
function randomSquare() {
    square.forEach((className) => {
        className.classList.remove("mole")
    })
    let randomPosition = square[Math.floor(Math.random() * 9)]
    randomPosition.classList.add("mole")

    //assign the id of the randomPosition to hit position for us to use later
    hitPosition = randomPosition.id
    // console.log(hitPosition)
}
// randomSquare()

square.forEach((id) => {
    id.addEventListener("mouseup", () => {
        if (id.id == hitPosition) {
            result = result + 1
            score.textContent = result
        }
    })
})

function moveMole() {
    timerId = setInterval(randomSquare, 1000)
}
moveMole()

function countDown() {
    currentTime--
    timeLeft.textContent = currentTime
    if (currentTime === 0) {
        clearInterval(countTimerId)
        clearInterval(timerId)

        // clearInterval(timeId)
        alert("The Game is Over and Your Score is " + result)
    }
}
countTimerId = setInterval(countDown, 1000)
