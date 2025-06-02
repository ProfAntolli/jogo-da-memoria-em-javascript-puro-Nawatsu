const cards = document.querySelectorAll(".memory-card");

let matchedPairs = 0;
const totalPairs = cards.length / 2;

let hasFlippedCard = false
let lockBoard = false
let firstCard, secondCard;

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add("flip");

    if (!hasFlippedCard) {
        //primeiro click
        hasFlippedCard = true;
        firstCard = this;

        return;
    } 

    //segundo click
    secondCard = this;
    checkForMatch();    
}

function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
  
  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard); 

    matchedPairs++;
    if (matchedPairs === totalPairs) {
        showVictoryScreen();
    }

    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip"); 

    resetBoard();
    }, 1500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
})();

cards.forEach(card => card.addEventListener("click", flipCard));

function showVictoryScreen() {
    const screen = document.getElementById("victory-screen");
    const sound = document.getElementById("victory-sound");

    screen.style.display = "flex";
    sound.play("imagens\Victory Sound Effect.mp3"); // toca o som
}
function restartGame() {
    location.reload(); // ou reinicialize o jogo com sua própria lógica
}