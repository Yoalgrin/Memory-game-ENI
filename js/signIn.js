// Récupérer le formulaire et les champs de saisie dans le localStorage
const form = document.getElementById("login-form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const errorMessage = document.getElementById("error-message");

// Fonction pour gérer la connexion
form.addEventListener("submit", function (event) {
  event.preventDefault(); // Empêcher le rechargement de la page lors de la soumission du formulaire

  // Récupérer les données utilisateur enregistrées
  const storedUser = JSON.parse(localStorage.getItem("userProfile"));

  // Récupérer les valeurs saisies
  const email = emailInput.value;
  const password = passwordInput.value;

  // Vérifier les informations de connexion
  if (
    storedUser &&
    storedUser.email === email &&
    storedUser.password === password
  ) {
    // Si l'utilisateur est trouvé et les informations sont correctes, affichage d'un message de succès
    alert("Connexion réussie !");
    window.location.href = "index.html"; // Redirection vers la page d'accueil
  } else {
    // Si les informations sont incorrectes, afficher un message d'erreur
    errorMessage.textContent = "Email ou mot de passe incorrect.";
  }
});
