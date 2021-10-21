document.addEventListener("DOMContentLoaded", () => {
    const squares = document.querySelectorAll(".grid div")
    // console.log(squares.length)
    const resultDisplay = document.querySelector("#result")

    let width = 15
    let currentShooterIndex = 202
    let currentIndexInvader = 0
    let alienInvaderTakeDown = []
    let result = 0
    let direction = 1
    let invaderId

    //alien invaders defined
    const alienInvaders = [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
        30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
    ]
    //draw the alien invaders
    alienInvaders.forEach((invader) =>
        squares[currentIndexInvader + invader].classList.add("invader")
    )
    //draw shooter
    squares[currentShooterIndex].classList.add("shooter")
    //move shooter
    function moveShooter(e) {
        console.log("move-shooter")
        squares[currentShooterIndex].classList.remove("shooter")
        switch (e.keyCode) {
            case 37:
                console.log("move-left")
                if (currentShooterIndex % width != 0) currentShooterIndex -= 1 // allowed to move left
                break
            case 39:
                console.log("move-right")
                if (currentShooterIndex % width < width - 1)
                    currentShooterIndex += 1 // allowed to move right
                break
        }
        squares[currentShooterIndex].classList.add("shooter")
    }
    document.addEventListener("keydown", moveShooter)

    function moveInvaders() {
        const leftEdge = alienInvaders[0] % width === 0
        const rightEdge =
            alienInvaders[alienInvaders.length] % width === width - 1
        if ((leftEdge && direction === -1) || (rightEdge && direction === 1)) {
            direction = width
        } else if (direction === width) {
            if (leftEdge) direction = 1
            else direction = -1
        }
        for (let i = 0; i <= alienInvaders.length - 1; i++) {
            squares[alienInvaders[i]].classList.remove("invader")
        }
        for (let i = 0; i <= alienInvaders.length - 1; i++) {
            alienInvaders[i] += direction
        }
        for (let i = 0; i <= alienInvaders.length - 1; i++) {
            squares[alienInvaders[i]].classList.add("invader")
        }
        //decide a game is over
        if (
            squares[currentShooterIndex].classList.contains(
                "invader",
                "shooter"
            )
        ) {
            resultDisplay.textContent = "Game Over"
            clearInterval(invaderId)
        }
    }
    invaderId = setInterval(moveInvaders, 500)

    //function shoot
    function shoot(e) {
        let laserId
        let currLaserIndex = currentShooterIndex
        function moveLaser() {
            squares[currLaserIndex].classList.remove("laser")
        }
    }
})
