document.addEventListener("DOMContentLoaded", function () {
  const formulaire = document.getElementById("formulaire");
  const message = document.getElementById("message");

  formulaire.addEventListener("submit", function (event) {
    event.preventDefault(); // Empêche l'envoi du formulaire

    const nom = document.getElementById("nom").value.trim();
    const prenom = document.getElementById("prenom").value.trim();
    const pseudo = document.getElementById("pseudo").value.trim();
    const email = document.getElementById("email").value.trim();
    const motdepasse = document.getElementById("motdepasse").value;
    const confirmer = document.getElementById("confirmer").value;

    if (!nom || !prenom || !pseudo || !email || !motdepasse || !confirmer) {
      message.textContent = "Veuillez remplir tous les champs.";
      message.style.color = "red";
      return;
    }

    if (motdepasse !== confirmer) {
      message.textContent = "Les mots de passe ne correspondent pas.";
      message.style.color = "red";
      return;
    }

    if (motdepasse.length < 6) {
      message.textContent =
        "Le mot de passe doit contenir au moins 6 caractères.";
      message.style.color = "red";
      return;
    }

    // Si tout est OK
    message.textContent = "Inscription réussie ! Redirection...";
    message.style.color = "green";

    // Redirection ici, à l'intérieur du bloc
    setTimeout(() => {
      window.location.href = "index.html";
    }, 2000);
  });
});
