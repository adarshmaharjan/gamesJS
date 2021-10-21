document.addEventListener("DOMContentLoaded", () => {
    const squares = document.querySelectorAll(".grid div")
    const scoreDisplay = document.querySelector("span")
    const startBtn = document.querySelector(".start")
    // console.log(startBtn)

    const width = 10
    let currentIndex = 0
    let appleIndex = 0
    let currentSnake = [2, 1, 0]
    let direction = 1
    let score = 0
    let speed = 0.9
    let intervalTime = 0
    let interval = 0

    //to start, and restart the game
    function startGame() {
        console.log("startGame")
        currentSnake.forEach((index) =>
            squares[index].classList.remove("snake")
        )
        squares[appleIndex].classList.remove("apple")
        clearInterval(interval)
        score = 0
        randomApple()
        direction = 1
        scoreDisplay.innerHTML = score
        intervalTime = 1000
        currentSnake = [2, 1, 0]
        currentIndex = 0
        currentSnake.forEach((index) => squares[index].classList.add("snake"))
        interval = setInterval(moveOutcomes, intervalTime)
    }

    // function that deals with all the outcomes of the snake
    function moveOutcomes() {
        // console.log("moveOutcomes")
        // console.log(squares[currentSnake[0] + direction])
        if (
            (currentSnake[0] + width >= width * width && direction === width) || //if snake hits bottom
            (currentSnake[0] % width === width - 1 && direction === 1) || //if snake hits right wall
            (currentSnake[0] % width === 0 && direction === -1) || //if snake hits left wall
            (currentSnake[0] - width < 0 && direction === -width) || //if snake hits top
            squares[currentSnake[0] + direction].classList.contains("snakes")

            //deals with snake getting apple....
        ) {
            return clearInterval(interval)
        }
        //this part animates
        const tail = currentSnake.pop()
        squares[tail].classList.remove("snake")
        currentSnake.unshift(currentSnake[0] + direction)
        squares[tail].classList.remove("snake")

        if (squares[currentSnake[0]].classList.contains("apple")) {
            squares[currentSnake[0]].classList.remove("apple")
            squares[tail].classList.add("snake")

            currentSnake.push(tail)

            randomApple()
            score++
            scoreDisplay.textContent = score
            clearInterval(interval)
            intervalTime = intervalTime * speed
            interval = setInterval(moveOutcomes, intervalTime)
        }
        squares[currentSnake[0]].classList.add("snake")
    }
    function randomApple() {
        do {
            appleIndex = Math.floor(Math.random() * squares.length)
        } while (squares[appleIndex].classList.contains("snake")) //making sure apples dont appear on the snake
        squares[appleIndex].classList.add("apple")
    }
    //assign a function to key code
    function control(e) {
        // console.log(e.keycode)
        squares[currentIndex].classList.remove("snake") // we are removing the class

        if (e.keyCode === 39) {
            console.log("right")
            direction = 1 //if we press the right arrow on our keyboard, the snake will go right one
        } else if (e.keyCode === 38) {
            console.log("up")
            direction = -width // press up arrow
        } else if (e.keyCode === 37) {
            console.log("left")
            direction = -1 // if we press left
        } else if (e.keyCode === 40) {
            console.log("down")
            direction = +width //down
        }
    }
    document.addEventListener("keyup", control)
    startBtn.addEventListener("click", startGame)
})
