// Récupérer le formulaire et les champs de saisie dans le localStorage
const form = document.getElementById("login-form");
const pseudoInput = document.getElementById("pseudo");
const passwordInput = document.getElementById("password");
const errorMessage = document.getElementById("error-message");

// Fonction pour gérer la connexion
form.addEventListener("submit", function (event) {
  event.preventDefault(); // Empêcher le rechargement de la page lors de la soumission du formulaire

  // Récupérer les valeurs saisies
  const pseudo = pseudoInput.value;
  const password = passwordInput.value;

  // Récupérer les données utilisateur enregistrées
  const storedUser = JSON.parse(localStorage.getItem("userProfile"));

  // Vérifier les informations de connexion
  if (
    storedUser &&
    storedUser.pseudo === pseudo &&
    storedUser.password === password
  ) {
    // Si tout est OK
    errorMessage.textContent = "connection réussie ! Redirection...";
    errorMessage.style.color = "green";

    // Redirection ici, à l'intérieur du bloc
    alert("connexion réussie!");
    setTimeout(() => {
      window.location.href = "index.html";
    }, 2000);
  } else {
    // Si les informations sont incorrectes, afficher un message d'erreur
    errorMessage.textContent = "Pseudo ou mot de passe incorrect.";
  }
});
