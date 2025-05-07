// Un tableau qui contient les animaux, chacun avec un nom et une image.
// Les cartes que le joueur devra retrouver par paire.
const animaux = [
  { nom: "Chimpanzé", images: "1.webp" },
  { nom: "Nasique", images: "18.webp" },
  { nom: "Caméléon", images: "21.webp" },
  { nom: "Loup", images: "25.webp" },
  { nom: "Crocodile", images: "5.webp" },
  { nom: "Elephant", images: "6.webp" },
];

// C’est l’image qu’on verra au dos de chaque carte avant de la retourner.
const face = { nom: "FG", images: "FG.jpg" };

// Déclarer le tableau vide allCards.
let allCards = [];

// Pour chaque animal, on ajoute deux cartes identiques dans le tableau (une paire).
/* le spread Operator (ex: {...animal} permet de décomposer un objet ou un tableau en ses éléments individuels. 
Permet de les manipuler de manière plus concise et flexible)
(bonne pratique, à réutiliser).*/
animaux.forEach((animal) => {
  allCards.push({ ...animal }, { ...animal });
});

// Vérifier que les cartes sont bien en double en regardant la console.
console.log(allCards);

/* Cette fonction mélange un tableau donné (la ligne 30 c'est pour la position aléatoire en 0 et i; 
la ligne 31 permet l'échange les deux éléments (la carte à la position i et celle à j)).*/
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
/*Fonction qui génère les cartes dans la page HTML.
ligne 42 c'est le mélange des cartes.
ligne 44 à 58: Pour chaque carte, on ajoute le code HTML correspondant dans la grille.
*/
function generateCards() {
  const memoryGame = document.querySelector(".memory-game");
  memoryGame.innerHTML = "";
  shuffle(allCards);

  allCards.forEach((card) =>
    memoryGame.insertAdjacentHTML(
      "beforeend",
      `
    <div class="memory-card" data-framework="${card.nom}">
        <div class="back-face">
        <img src="Images/FG.jpg" alt="Dos de la carte" />
      </div>
      <div class="front-face">
        <img src="Images/animaux/${card.images}" alt="${card.nom}" />
      </div>
    </div>
    `
    )
  );

  // Une fois toutes les cartes ajoutées, on leur associe un événement "click"
  // pour qu’elles puissent se retourner quand on clique dessus.
  document.querySelectorAll(".memory-card").forEach((card) => {
    card.addEventListener("click", flipCard);
  });
}

// Variables pour la logique du jeu et gérer son déroulement.
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let matchedPairs = 0;
const totalPairs = animaux.length;

//Fonction permettant de verrouiller pendant l'animation des cartes.
function flipCard() {
  if (lockBoard || this === firstCard) return;

  //Permet de retourner la carte avec le CSS.
  this.classList.add("flip");

  /*Si c’est la première carte retournée, on la stocke et on attend la seconde
  ligne 86 stock la seconde carte et vérifie si c'est une paire*/
  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
  } else {
    hasFlippedCard = false;
    secondCard = this;
    checkForMatch();
  }
}
//comparaison des 2 cartes stocké par leur nom, et si c'est une paire on les désactive.
function checkForMatch() {
  const match = firstCard.dataset.framework === secondCard.dataset.framework;
  match ? disableCards() : unflipCards();
}
// On retire les écouteurs d'événements pour éviter de les retourner à nouveau.
function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
//On augmente le compteur de paires trouvées.
  matchedPairs++;
//Si toutes les paires sont trouvées, on déclenche le feu d'artifiche (vu avec le cours HTML).
  if (matchedPairs === totalPairs) showFireworks();
//réinitialisation des variables.
  resetBoard();
}
//Permet d'empecher de cliquer pendant le retournement des cartes.
function unflipCards() {
  lockBoard = true;
//Permet de faire retourner les cartes après 1 sec (en enlevant la classe "flip").  
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
//réinitialisation des variables.
    resetBoard();
  }, 1000);
}
// permet de remettre toutes les variables à zéro pour recommencer une sélection.
function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}
//Gestion du temps de jeu 
let timeLeft = 60;
let timer;
const timerElement = document.getElementById("timer");

function startTimer() {
  timerElement.textContent = timeLeft;
//Ces lignes permettent de retirer 1 seconde au compteur chaque seconde. 
  timer = setInterval(() => {
    timeLeft--;
    timerElement.textContent = timeLeft;
//Fin du compte à rebours.    
    if (timeLeft === 0) {
      clearInterval(timer);
      endGame();
    }
  }, 1000);
}
//Fonction d'animation quand on gagne (vu cours HTML).
function showFireworks() {
  confetti({ particleCount: 150, spread: 90, origin: { y: 0.6 } });
  winGame();
}
//Arrêt du chrono, création du message et son affichage, après 5 secs affichage du bouton rejouer.
function winGame() {
  clearInterval(timer);
  const winMessage = document.createElement("div");
  winMessage.id = "winMessage";
  winMessage.textContent = "Bravo ! Tu as gagné !";
  document.body.appendChild(winMessage);

  setTimeout(() => {
    document.getElementById("replayButton").style.display = "block";
  }, 5000);
}
//Empèche de cliquer sur les cartes et affiche le bouton rejouer.
function endGame() {
  alert("Temps écoulé !");
  document.querySelectorAll(".memory-card").forEach((card) => {
    card.removeEventListener("click", flipCard);
  });

  setTimeout(() => {
    document.getElementById("replayButton").style.display = "block";
  }, 5000);
}
//Gestion du reset du jeu.
function resetGame() {
  clearInterval(timer);
  timeLeft = 60;
  matchedPairs = 0;
  timerElement.textContent = timeLeft;
}
//fonction pour relancer une partie.
function replayGame() {
  resetGame();
  document.getElementById("winMessage")?.remove();
  document.getElementById("replayButton").style.display = "none";
  generateCards();
  startTimer();
}

// Initialisation du jeu à l'ouverture.
generateCards();
startTimer();
