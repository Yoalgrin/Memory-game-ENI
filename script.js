// Page d'accueil
const homePage = `
  <section>
    <h2 class="text-2xl font-semibold mb-4">Bienvenue sur le jeu de memory</h2>
    <p>Règle: Toutes les cartes sont faces cachées. Le joueur retourne deux cartes sur les douze. <br>Si les images sont identiques, il gagne la paire constituée et rejoue.</br> <br>Sinon les cartes se retournent et le joueur doit en chosir 2 autres. La partie se termine quand toutes les cartes sont retournées.</br></p>
  </section>
`;
// Page de jeu (avec message d'erreur)
const playPage = `
  <section>
    <h2 class="text-2xl font-semibold mb-4">Page de jeu</h2>
    <p>Commence à jouer au jeu de Memory.</p>
    <p id="message" style="color: red; font-weight: bold;"></p>
  </section>
`;
// Page d'inscription
const signUpPage = `
  <section>
    <h2 class="text-2xl font-semibold mb-4">Page d'inscription</h2>
    <p>Inscris-toi pour jouer.</p>
    <button onclick="handleSignUp()">S'inscrire</button>
  </section>
`;
// Page de connexion
const signInPage = `
  <section>
    <h2 class="text-2xl font-semibold mb-4">Page de connexion</h2>
    <p>Inscris-toi pour jouer.</p>
    <button onclick="handleSignIn()">Se connecter</button>
  </section>
`;

// Variables d'état pour l'inscription et la connexion
let isRegistered = false;
let isLoggedIn = false;

// Variables pour le contenu et le message d'erreur
const contentContainer = document.getElementById("content");
const playLink = document.getElementById("play-link");
const anchor = playLink.querySelector("a");
const messageZone = document.getElementById("message"); // Zone où le message d'erreur sera affiché

// Fonction qui affiche dynamiquement le contenu
function loadContent(contentHTML) {
  contentContainer.innerHTML = ""; // Efface le contenu précédent
  contentContainer.insertAdjacentHTML("beforeend", contentHTML); // Ajoute le nouveau contenu
}

// Fonction pour afficher le message d'erreur dans la page de jeu
function showErrorMessage(message) {
  messageZone.textContent = message; // Afficher le message d'erreur
}

// Fonction qui met à jour le lien "Jouer" selon les états d'inscription et de connexion
function updatePlayLink() {
  const playLink = document.getElementById("play-link");
  const anchor = playLink.querySelector("a");

  // Si l'utilisateur est inscrit et connecté
  if (isRegistered && isLoggedIn) {
    playLink.classList.remove("disabled"); // Activer le lien "Jouer"
    // Ajouter un gestionnaire d'événement pour commencer le jeu
    anchor.addEventListener("click", function (e) {
      e.preventDefault(); // Empêche la navigation par défaut
      loadContent(play); // Charger la page de jeu
    });
  } else {
    playLink.classList.add("disabled"); // Désactiver le lien "Jouer"
    // Ajouter un gestionnaire d'événement pour afficher un message d'erreur
    anchor.addEventListener("click", function (e) {
      e.preventDefault(); // Empêche le comportement par défaut
      showErrorMessage(
        "Pour pouvoir jouer, il faut s'inscrire et se connecter."
      ); // Afficher le message d'erreur
    });
  }
}
// Fonction qui se déclenche lorsque l'utilisateur clique sur "Jouer" sans être inscrit ou connecté
function onPlayClick(e) {
  e.preventDefault(); // Empêche l'action par défaut (la navigation)

  // Si l'utilisateur n'est pas inscrit ou connecté
  if (!isRegistered || !isLoggedIn) {
    loadContent(playPage); // Charger la page de jeu
    showErrorMessage("Pour pouvoir jouer, il faut s'inscrire et se connecter."); // Affiche le message d'erreur
    playLink.classList.add("disabled"); // Griser le lien "Jouer"
  }
}

// Fonction qui est appelée lorsque l'utilisateur clique sur "Jouer" et est inscrit et connecté
function onGameStartClick(e) {
  e.preventDefault(); // Empêche l'action par défaut
  loadContent(playPage); // Charger la page de jeu
}

// Affichage de la page d'accueil par défaut
loadContent(homePage);

// Initialiser le lien "Jouer" au chargement de la page
updatePlayLink();

// Fonction qui se déclenche lors de l'inscription
function handleSignUp() {
  isRegistered = true;
  updatePlayLink(); // Met à jour le lien "Jouer" après l'inscription
}

// Fonction qui se déclenche lors de la connexion
function handleSignIn() {
  isLoggedIn = true;
  updatePlayLink(); // Met à jour le lien "Jouer" après la connexion
}

// Ajouter les écouteurs d'événements pour les boutons "S'inscrire" et "Se connecter"
document.getElementById("signUp").addEventListener("click", handleSignUp);
document.getElementById("signIn").addEventListener("click", handleSignIn);

// Ajout de l'événement de clic pour le lien "Jouer"
anchor.addEventListener("click", function (e) {
  // Si l'utilisateur est inscrit et connecté, démarrer le jeu
  if (isRegistered && isLoggedIn) {
    onGameStartClick(e);
  } else {
    onPlayClick(e);
  }
});


